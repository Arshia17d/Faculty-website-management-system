import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { endTimeSlots, mockData, professorTimeSlots } from "../data/mockData";
import { createReservation } from "../services/reservationService";

export default function ProfessorReservation({ user }) {
  const [form, setForm] = useState({
    siteId: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    studentsCount: "25",
    software: [],
    notes: "",
  });
  const { notify } = useNotification();

  const selectedSite = useMemo(
    () => mockData.sites.find((site) => site.id === Number(form.siteId)),
    [form.siteId]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createReservation({
        userId: user.id,
        userName: user.name,
        siteId: selectedSite?.id,
        siteName: selectedSite?.name,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        software: form.software,
        type: "professor",
        purpose: form.purpose,
        studentsCount: Number(form.studentsCount),
        notes: form.notes,
      });
      notify("رزرو سایت ثبت شد و در انتظار تایید است.");
      setForm({
        siteId: "",
        date: "",
        startTime: "",
        endTime: "",
        purpose: "",
        studentsCount: "25",
        software: [],
        notes: "",
      });
    } catch (error) {
      notify("ثبت رزرو ناموفق بود.", "error");
    }
  };

  const previousReservations = mockData.reservations.filter((item) => item.type === "professor");

  return (
    <>
      <Header
        title="رزرو سایت برای کلاس"
        icon="fa-calendar-plus"
        action={
          <Link to="/professor/dashboard" className="btn btn-outline">
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
                {professorTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="endTime">زمان پایان</label>
              <select
                id="endTime"
                className="form-control"
                required
                value={form.endTime}
                onChange={(event) => setForm((prev) => ({ ...prev, endTime: event.target.value }))}
              >
                <option value="">انتخاب کنید</option>
                {endTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="purpose">هدف از رزرو (نام درس)</label>
            <input
              type="text"
              id="purpose"
              className="form-control"
              placeholder="مثال: مبانی برنامه‌نویسی"
              required
              value={form.purpose}
              onChange={(event) => setForm((prev) => ({ ...prev, purpose: event.target.value }))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentsCount">تعداد دانشجویان</label>
            <input
              type="number"
              id="studentsCount"
              className="form-control"
              min="1"
              max="50"
              required
              value={form.studentsCount}
              onChange={(event) => setForm((prev) => ({ ...prev, studentsCount: event.target.value }))}
            />
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
            <label htmlFor="notes">توضیحات اضافی (اختیاری)</label>
            <textarea
              id="notes"
              className="form-control"
              rows={3}
              placeholder="توضیحات اضافی درباره نیازمندی‌های کلاس..."
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            />
          </div>

          <div className="form-group" style={{ marginTop: "30px" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              <i className="fas fa-paper-plane" /> ثبت درخواست رزرو
            </button>
          </div>

          <div className="alert alert-info">
            <i className="fas fa-info-circle" />
            <strong>توجه:</strong> رزرو سایت پس از ثبت، نیاز به تایید ادمین سیستم دارد. پس از تایید، از طریق اعلان‌ها
            مطلع خواهید شد.
          </div>
        </form>
      </div>

      <div className="table-container" style={{ marginTop: "40px" }}>
        <div className="table-header">
          <h3>
            <i className="fas fa-history" /> رزروهای قبلی شما
          </h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>سایت</th>
              <th>تاریخ</th>
              <th>زمان</th>
              <th>هدف</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {previousReservations.map((item) => (
              <tr key={item.id}>
                <td>{item.siteName}</td>
                <td>{item.date}</td>
                <td>
                  {item.startTime} - {item.endTime}
                </td>
                <td>{item.purpose ?? "-"}</td>
                <td>
                  <span
                    className={`status-badge ${
                      item.status === "approved"
                        ? "status-approved"
                        : item.status === "pending"
                        ? "status-pending"
                        : "status-rejected"
                    }`}
                  >
                    {item.status === "approved" ? "تایید شده" : item.status === "pending" ? "در انتظار" : "رد شده"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
