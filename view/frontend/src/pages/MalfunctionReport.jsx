import React, { useState } from "react";
import Header from "../components/Header";

export default function MalfunctionReport({ user }) {
  const [form, setForm] = useState({ site: "", deskId: "", description: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("گزارش خرابی با موفقیت ثبت شد.");
    setForm({ site: "", deskId: "", description: "" });
  };

  return (
    <div className="main-content">
      <Header title="گزارش خرابی" />
      <div className="form-container">
        <h3>فرم گزارش خرابی</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="site">انتخاب سایت</label>
            <select
              id="site"
              className="form-control"
              value={form.site}
              onChange={(event) => setForm((prev) => ({ ...prev, site: event.target.value }))}
              required
            >
              <option value="">سایت را انتخاب کنید</option>
              <option value="1">سایت کامپیوتر دانشکده فنی</option>
              <option value="2">آزمایشگاه مهندسی نرم‌افزار</option>
              <option value="3">مرکز کامپیوتر کتابخانه مرکزی</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="deskId">شماره میز</label>
            <input
              id="deskId"
              className="form-control"
              value={form.deskId}
              onChange={(event) => setForm((prev) => ({ ...prev, deskId: event.target.value }))}
              placeholder="مثال: A-08"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">توضیحات</label>
            <textarea
              id="description"
              className="form-control"
              rows={4}
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="توضیحات خرابی را وارد کنید"
              required
            />
          </div>

          {message && <p style={{ color: "#2c3e50" }}>{message}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
            ثبت گزارش
          </button>
        </form>
      </div>
    </div>
  );
}
