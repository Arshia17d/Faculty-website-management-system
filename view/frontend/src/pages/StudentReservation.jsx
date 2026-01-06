import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { mockData, timeSlots } from "../data/mockData";
import { createReservation } from "../services/reservationService";

const durationOptions = [1, 2, 3, 4];

export default function StudentReservation({ user }) {
  const [form, setForm] = useState({
    siteId: "",
    date: "",
    startTime: "",
    duration: "2",
    software: [],
    purpose: "",
  });
  const { notify } = useNotification();

  const selectedSite = useMemo(
    () => mockData.sites.find((site) => site.id === Number(form.siteId)),
    [form.siteId]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const duration = Number(form.duration);
    const startIndex = timeSlots.indexOf(form.startTime);
    const endTime = startIndex >= 0 ? timeSlots[startIndex + duration] ?? form.startTime : form.startTime;

    try {
      await createReservation({
        userId: user.id,
        userName: user.name,
        siteId: selectedSite?.id,
        siteName: selectedSite?.name,
        date: form.date,
        startTime: form.startTime,
        endTime,
        software: form.software,
        type: "student",
        purpose: form.purpose,
      });
      notify("رزرو با موفقیت ثبت شد و در انتظار تایید است.");
      setForm({ siteId: "", date: "", startTime: "", duration: "2", software: [], purpose: "" });
    } catch (error) {
      notify("ثبت رزرو ناموفق بود.", "error");
    }
  };

  return (
    <>
      <Header
        title="رزرو میز کامپیوتر"
        icon="fa-calendar-plus"
        action={
          <Link to="/student/dashboard" className="btn btn-outline">
            <i className="fas fa-arrow-right" /> بازگشت به داشبورد
          </Link>
        }
        showDate={false}
      />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="site">انتخاب سایت کامپیوتری</label>
            <select
              id="site"
              className="form-control"
              required
              value={form.siteId}
              onChange={(event) => setForm((prev) => ({ ...prev, siteId: event.target.value }))}
            >
              <option value="">لطفاً یک سایت انتخاب کنید</option>
              {mockData.sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">تاریخ</label>
              <input
                type="date"
                id="date"
                className="form-control"
                required
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">زمان شروع</label>
              <select
                id="startTime"
                className="form-control"
                required
                value={form.startTime}
                onChange={(event) => setForm((prev) => ({ ...prev, startTime: event.target.value }))}
              >
                <option value="">انتخاب کنید</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">مدت زمان (ساعت)</label>
              <select
                id="duration"
                className="form-control"
                required
                value={form.duration}
                onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
              >
                {durationOptions.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration} ساعت
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="software">نرم‌افزارهای مورد نیاز</label>
            <select
              id="software"
              className="form-control"
              multiple
              style={{ height: "120px" }}
              value={form.software}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  software: Array.from(event.target.selectedOptions, (option) => option.value),
                }))
              }
            >
              {mockData.softwareList.map((software) => (
                <option key={software.id} value={software.name}>
                  {software.name}
                </option>
              ))}
            </select>
            <small className="form-text text-muted">برای انتخاب چندگانه کلید Ctrl را نگه دارید</small>
          </div>

          <div className="form-group">
            <label htmlFor="purpose">هدف از رزرو (اختیاری)</label>
            <input
              type="text"
              id="purpose"
              className="form-control"
              placeholder="مثال: انجام پروژه، مطالعه و ..."
              value={form.purpose}
              onChange={(event) => setForm((prev) => ({ ...prev, purpose: event.target.value }))}
            />
          </div>

          <div className="form-group" style={{ marginTop: "30px" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              <i className="fas fa-paper-plane" /> ثبت درخواست رزرو
            </button>
          </div>

          <div className="alert alert-info">
            <i className="fas fa-info-circle" />
            <strong>توجه:</strong>
            <ul>
              <li>رزرو میز پس از ثبت، نیاز به تایید ادمین سیستم دارد.</li>
              <li>حداکثر مدت زمان رزرو برای دانشجویان ۴ ساعت است.</li>
              <li>در صورت عدم حضور در زمان رزرو شده، امکان رزرو برای شما محدود خواهد شد.</li>
            </ul>
          </div>
        </form>
      </div>

      <div className="table-container" style={{ marginTop: "40px" }}>
        <div className="table-header">
          <h3>
            <i className="fas fa-desktop" /> وضعیت کنونی سایت‌ها
          </h3>
        </div>
        <div className="content-padding">
          <div className="sites-grid">
            {mockData.sites.map((site) => (
              <div key={site.id} className="site-card fade-in">
                <div className="site-header">
                  <h3>{site.name}</h3>
                  <span className={`status-badge ${site.freeDesks > 5 ? "status-free" : "status-occupied"}`}>
                    {site.freeDesks > 5 ? "دارای ظرفیت" : "ظرفیت محدود"}
                  </span>
                </div>
                <div className="site-body">
                  <p>
                    <i className="fas fa-map-marker-alt" /> {site.location}
                  </p>
                  <div className="desks-status">
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.totalDesks}</div>
                      <div className="desk-status-label">کل میزها</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count" style={{ color: "#27ae60" }}>
                        {site.freeDesks}
                      </div>
                      <div className="desk-status-label">آزاد</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count" style={{ color: "#f39c12" }}>
                        {site.occupiedDesks}
                      </div>
                      <div className="desk-status-label">اشغال</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count" style={{ color: "#c0392b" }}>
                        {site.underRepairDesks}
                      </div>
                      <div className="desk-status-label">تعمیر</div>
                    </div>
                  </div>
                  <div className="software-list">
                    <h4>نرم‌افزارهای موجود:</h4>
                    <div className="software-tags">
                      {site.software.map((software) => (
                        <span key={software} className="software-tag">
                          {software}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
