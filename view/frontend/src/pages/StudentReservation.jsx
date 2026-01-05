import React, { useEffect, useMemo, useState } from "react";
import { createReservation } from "../services/reservationService";
import { fetchSoftware } from "../services/softwareService";
import { sites } from "../data/mockData";

const startTimes = [
  { value: "08:00", label: "۸:۰۰ صبح" },
  { value: "09:00", label: "۹:۰۰ صبح" },
  { value: "10:00", label: "۱۰:۰۰ صبح" },
  { value: "11:00", label: "۱۱:۰۰ صبح" },
  { value: "12:00", label: "۱۲:۰۰ ظهر" },
  { value: "13:00", label: "۱:۰۰ بعدازظهر" },
  { value: "14:00", label: "۲:۰۰ بعدازظهر" },
  { value: "15:00", label: "۳:۰۰ بعدازظهر" },
  { value: "16:00", label: "۴:۰۰ بعدازظهر" },
  { value: "17:00", label: "۵:۰۰ بعدازظهر" },
  { value: "18:00", label: "۶:۰۰ عصر" },
];

const durations = [1, 2, 3, 4];

function addHours(time, hours) {
  const [h, m] = time.split(":").map(Number);
  const result = new Date(2024, 0, 1, h + hours, m);
  return result.toTimeString().slice(0, 5);
}

export default function StudentReservation({ user }) {
  const [form, setForm] = useState({
    siteId: "",
    date: "",
    startTime: "",
    duration: "2",
    purpose: "",
    software: [],
  });
  const [softwareOptions, setSoftwareOptions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSoftware()
      .then(setSoftwareOptions)
      .catch(() => {});
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const site = sites.find((item) => item.id === Number(form.siteId));
    if (!site || !form.startTime) return;

    const endTime = addHours(form.startTime, Number(form.duration));

    try {
      await createReservation({
        userId: user.id,
        userName: user.name,
        siteId: site.id,
        siteName: site.name,
        date: form.date,
        startTime: form.startTime,
        endTime,
        software: form.software,
        type: "student",
        purpose: form.purpose || undefined,
      });
      setMessage("رزرو با موفقیت ثبت شد و در انتظار تایید است.");
      setForm({ siteId: "", date: "", startTime: "", duration: "2", purpose: "", software: [] });
    } catch (error) {
      setMessage("ثبت رزرو ناموفق بود.");
    }
  };

  const softwareOptionsMemo = useMemo(
    () =>
      softwareOptions.map((software) => ({
        value: software.name,
        label: software.name,
      })),
    [softwareOptions]
  );

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-calendar-plus" /> رزرو میز کامپیوتر
        </h2>
        <a href="/student/dashboard" className="btn btn-outline">
          <i className="fas fa-arrow-right" /> بازگشت به داشبورد
        </a>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="site">انتخاب سایت کامپیوتری</label>
            <select
              id="site"
              className="form-control"
              value={form.siteId}
              onChange={(event) => setForm((prev) => ({ ...prev, siteId: event.target.value }))}
              required
            >
              <option value="">لطفاً یک سایت انتخاب کنید</option>
              {sites.map((site) => (
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
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">زمان شروع</label>
              <select
                id="startTime"
                className="form-control"
                value={form.startTime}
                onChange={(event) => setForm((prev) => ({ ...prev, startTime: event.target.value }))}
                required
              >
                <option value="">انتخاب کنید</option>
                {startTimes.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">مدت زمان (ساعت)</label>
              <select
                id="duration"
                className="form-control"
                value={form.duration}
                onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
                required
              >
                {durations.map((duration) => (
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
              {softwareOptionsMemo.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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

          {message && <p style={{ color: "#2c3e50" }}>{message}</p>}

          <div className="form-group" style={{ marginTop: "30px" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              <i className="fas fa-paper-plane" /> ثبت درخواست رزرو
            </button>
          </div>

          <div
            className="alert alert-info"
            style={{ backgroundColor: "#e8f4fc", padding: "15px", borderRadius: "5px", marginTop: "20px" }}
          >
            <i className="fas fa-info-circle" />
            <strong>توجه:</strong>
            <ul style={{ marginTop: "10px", paddingRight: "20px" }}>
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
        <div style={{ padding: "20px" }}>
          <div className="sites-grid">
            {sites.map((site) => (
              <div key={site.id} className="site-card">
                <div className="site-header">
                  <h3>{site.name}</h3>
                </div>
                <div className="site-body">
                  <div className="desks-status">
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.freeDesks}</div>
                      <div className="desk-status-label">آزاد</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.occupiedDesks}</div>
                      <div className="desk-status-label">اشغال</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.reservedDesks}</div>
                      <div className="desk-status-label">رزرو</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.underRepairDesks}</div>
                      <div className="desk-status-label">تعمیر</div>
                    </div>
                  </div>
                  <div className="software-list">
                    <h4>نرم‌افزارهای اصلی</h4>
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
