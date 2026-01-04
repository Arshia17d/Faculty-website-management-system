import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SoftwarePicker from "../components/SoftwarePicker";
import { createReservation } from "../services/reservationService";
import { fetchSoftware } from "../services/softwareService";

const sites = [
  { id: 1, name: "سایت کامپیوتر دانشکده فنی" },
  { id: 2, name: "آزمایشگاه مهندسی نرم‌افزار" },
  { id: 3, name: "مرکز کامپیوتر کتابخانه مرکزی" },
];

export default function StudentReservation({ user }) {
  const [form, setForm] = useState({
    siteId: "",
    deskId: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [softwareOptions, setSoftwareOptions] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState([]);
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
    if (!site) return;

    try {
      await createReservation({
        userId: user.id,
        userName: user.name,
        siteId: site.id,
        siteName: site.name,
        deskId: form.deskId,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        software: selectedSoftware.map((item) => item.name),
        type: "student",
      });
      setMessage("رزرو با موفقیت ثبت شد و در انتظار تایید است.");
      setForm({ siteId: "", deskId: "", date: "", startTime: "", endTime: "" });
      setSelectedSoftware([]);
    } catch (error) {
      setMessage("ثبت رزرو ناموفق بود.");
    }
  };

  return (
    <div className="main-content">
      <Header title="رزرو میز" />
      <div className="form-container">
        <h3>فرم رزرو میز</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="site">انتخاب سایت</label>
              <select
                id="site"
                className="form-control"
                value={form.siteId}
                onChange={(event) => setForm((prev) => ({ ...prev, siteId: event.target.value }))}
                required
              >
                <option value="">لطفاً سایت را انتخاب کنید</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="deskId">شماره میز</label>
              <input
                id="deskId"
                className="form-control"
                value={form.deskId}
                onChange={(event) => setForm((prev) => ({ ...prev, deskId: event.target.value }))}
                placeholder="مثال: A-12"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">تاریخ</label>
              <input
                id="date"
                className="form-control"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                placeholder="1403/01/20"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">زمان شروع</label>
              <input
                id="startTime"
                className="form-control"
                value={form.startTime}
                onChange={(event) => setForm((prev) => ({ ...prev, startTime: event.target.value }))}
                placeholder="10:00"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endTime">زمان پایان</label>
              <input
                id="endTime"
                className="form-control"
                value={form.endTime}
                onChange={(event) => setForm((prev) => ({ ...prev, endTime: event.target.value }))}
                placeholder="12:00"
                required
              />
            </div>
          </div>

          <SoftwarePicker
            options={softwareOptions}
            selected={selectedSoftware}
            onAdd={(item) =>
              setSelectedSoftware((prev) =>
                prev.find((existing) => existing.id === item.id) ? prev : [...prev, item]
              )
            }
            onRemove={(id) => setSelectedSoftware((prev) => prev.filter((item) => item.id !== id))}
            label="نرم‌افزارهای مورد نیاز"
          />

          {message && <p style={{ color: "#2c3e50", marginTop: "10px" }}>{message}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
            ثبت رزرو
          </button>
        </form>
      </div>
    </div>
  );
}
