import React, { useEffect, useState } from "react";
import { createReservation, fetchReservations } from "../services/reservationService";
import { fetchSoftware } from "../services/softwareService";
import { sites } from "../data/mockData";

const startTimes = [
  { value: "08:00", label: "۸:۰۰ صبح" },
  { value: "10:00", label: "۱۰:۰۰ صبح" },
  { value: "12:00", label: "۱۲:۰۰ ظهر" },
  { value: "14:00", label: "۲:۰۰ بعدازظهر" },
  { value: "16:00", label: "۴:۰۰ بعدازظهر" },
  { value: "18:00", label: "۶:۰۰ عصر" },
];
const endTimes = [
  { value: "10:00", label: "۱۰:۰۰ صبح" },
  { value: "12:00", label: "۱۲:۰۰ ظهر" },
  { value: "14:00", label: "۲:۰۰ بعدازظهر" },
  { value: "16:00", label: "۴:۰۰ بعدازظهر" },
  { value: "18:00", label: "۶:۰۰ عصر" },
  { value: "20:00", label: "۸:۰۰ شب" },
];

export default function ProfessorReservation({ user }) {
  const [form, setForm] = useState({
    siteId: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    studentsCount: "25",
    notes: "",
    software: [],
  });
  const [softwareOptions, setSoftwareOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [previousReservations, setPreviousReservations] = useState([]);

  useEffect(() => {
    fetchSoftware()
      .then(setSoftwareOptions)
      .catch(() => {});

    fetchReservations()
      .then((data) => {
        setPreviousReservations(data.filter((item) => item.userId === user?.id));
      })
      .catch(() => {});
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const site = sites.find((item) => item.id === Number(form.siteId));
    if (!site) return;

    try {
      await createReservation({
        userId: user.id,
        userName: user.name,
        siteId: site.id,
        siteName: site.name,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        software: form.software,
        type: "professor",
        purpose: form.purpose,
        studentsCount: Number(form.studentsCount),
      });
      setMessage("رزرو سایت ثبت شد و در انتظار تایید است.");
      setForm({
        siteId: "",
        date: "",
        startTime: "",
        endTime: "",
        purpose: "",
        studentsCount: "25",
        notes: "",
        software: [],
      });
    } catch (error) {
      setMessage("ثبت رزرو ناموفق بود.");
    }
  };

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-calendar-plus" /> رزرو سایت برای کلاس
        </h2>
        <a href="/professor/dashboard" className="btn btn-outline">
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
              <label htmlFor="endTime">زمان پایان</label>
              <select
                id="endTime"
                className="form-control"
                value={form.endTime}
                onChange={(event) => setForm((prev) => ({ ...prev, endTime: event.target.value }))}
                required
              >
                <option value="">انتخاب کنید</option>
                {endTimes.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
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
              value={form.purpose}
              onChange={(event) => setForm((prev) => ({ ...prev, purpose: event.target.value }))}
              required
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
              value={form.studentsCount}
              onChange={(event) => setForm((prev) => ({ ...prev, studentsCount: event.target.value }))}
              required
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
              {softwareOptions.map((software) => (
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
              rows="3"
              placeholder="توضیحات اضافی درباره نیازمندی‌های کلاس..."
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
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
            {previousReservations.length === 0 ? (
              <tr>
                <td colSpan={5}>رزروی ثبت نشده است.</td>
              </tr>
            ) : (
              previousReservations.map((item) => (
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
                        item.status === "approved" ? "status-approved" : "status-pending"
                      }`}
                    >
                      {item.status === "approved" ? "تایید شده" : "در انتظار"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
