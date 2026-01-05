import React, { useState } from "react";
import { login } from "../services/authService";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ userId: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login({
        user_id: form.userId,
        password: form.password,
        role: "student",
      });
      onSuccess(user);
    } catch (err) {
      setError("ورود انجام نشد. اطلاعات را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box fade-in">
        <div className="login-header">
          <i className="fas fa-university fa-3x" style={{ color: "#2c3e50", marginBottom: "15px" }} />
          <h2>سیستم مدیریت سایت‌های کامپیوتری دانشگاه</h2>
          <p>لطفاً اطلاعات حساب کاربری خود را وارد کنید</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="hidden" name="role" value="student" />

          <div className="form-group">
            <label htmlFor="userId">
              <i className="fas fa-user" /> شناسه کاربری
            </label>
            <input
              type="text"
              id="userId"
              className="form-control"
              placeholder="شماره دانشجویی یا شناسه کارمندی"
              value={form.userId}
              onChange={(event) => setForm((prev) => ({ ...prev, userId: event.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock" /> رمز عبور
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="رمز عبور خود را وارد کنید"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
          </div>

          {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
            {loading ? "در حال ورود..." : "ورود به سیستم"}
          </button>

          <div style={{ textAlign: "center", marginTop: "20px", color: "#666", fontSize: "0.9rem" }}>
            <p>
              <strong>کاربران نمونه:</strong>
            </p>
            <p>دانشجو: 98123456 | استاد: emp-1234 | ادمین: admin-01</p>
            <p>رمز عبور: هر چیزی (در نسخه دمو مهم نیست)</p>
          </div>
        </form>
      </div>
    </div>
  );
}
