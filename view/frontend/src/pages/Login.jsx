import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext.jsx";
import { login } from "../services/authService";

const roleOptions = [
  { value: "student", label: "دانشجو", icon: "fa-user-graduate" },
  { value: "professor", label: "استاد", icon: "fa-chalkboard-teacher" },
  { value: "admin", label: "ادمین", icon: "fa-user-cog" },
];

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({
    userId: "98123456",
    password: "123456",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await login({
        user_id: form.userId,
        password: form.password,
        role: form.role,
      });
      notify("ورود با موفقیت انجام شد");
      onSuccess(user);
    } catch (err) {
      notify("ورود انجام نشد. اطلاعات را بررسی کنید.", "error");
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
          <input type="hidden" value={form.role} readOnly />

          <div className="role-selector">
            {roleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`role-option ${form.role === option.value ? "selected" : ""}`}
                onClick={() => handleChange("role")(option.value)}
              >
                <i className={`fas ${option.icon}`} />
                <p>{option.label}</p>
              </button>
            ))}
          </div>

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
              onChange={(event) => handleChange("userId")(event.target.value)}
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
              onChange={(event) => handleChange("password")(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
            {loading ? "در حال ورود..." : "ورود به سیستم"}
          </button>

          <div className="login-sample">
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
