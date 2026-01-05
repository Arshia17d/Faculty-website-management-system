import React from "react";
import { NavLink } from "react-router-dom";

const navConfig = {
  student: [
    { to: "/student/dashboard", icon: "fa-home", label: "داشبورد" },
    { to: "/student/reservation", icon: "fa-calendar-plus", label: "رزرو میز" },
    { to: "/malfunction-report", icon: "fa-exclamation-triangle", label: "گزارش خرابی" },
    { to: "/announcements", icon: "fa-bell", label: "اعلان‌ها" },
  ],
  professor: [
    { to: "/professor/dashboard", icon: "fa-home", label: "داشبورد" },
    { to: "/professor/reservation", icon: "fa-calendar-plus", label: "رزرو سایت" },
    { to: "/malfunction-report", icon: "fa-exclamation-triangle", label: "گزارش خرابی" },
    { to: "/announcements", icon: "fa-bell", label: "اعلان‌ها" },
  ],
  admin: [
    { to: "/admin/dashboard", icon: "fa-home", label: "داشبورد" },
    { to: "/admin/reservations", icon: "fa-calendar-check", label: "مدیریت رزروها" },
    { to: "/admin/reports", icon: "fa-exclamation-triangle", label: "گزارشات خرابی" },
    { to: "/admin/software", icon: "fa-cogs", label: "مدیریت نرم‌افزار" },
    { to: "/admin/users", icon: "fa-users", label: "مدیریت کاربران" },
    { to: "/announcements", icon: "fa-bell", label: "اعلان‌ها" },
  ],
};

const roleLabels = {
  student: "دانشجو",
  professor: "استاد",
  admin: "ادمین",
};

const roleIcons = {
  student: "fa-user-graduate",
  professor: "fa-chalkboard-teacher",
  admin: "fa-user-cog",
};

export default function Sidebar({ user, onLogout }) {
  const role = user?.role ?? "student";
  const items = navConfig[role] ?? [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <i className={`fas ${roleIcons[role] ?? "fa-user"} fa-2x`} />
          <div className="user-details">
            <h3 id="userName">{user?.name ?? "کاربر"}</h3>
            <p id="userRole">{roleLabels[role] ?? role}</p>
          </div>
        </div>
        {(user?.faculty || user?.department || role === "admin") && (
          <div id="userInfo" style={{ marginTop: "15px", fontSize: "0.9rem" }}>
            {role === "student" && (
              <>
                <p>
                  <strong>شماره دانشجویی:</strong> {user?.id}
                </p>
                <p>
                  <strong>دانشکده:</strong> {user?.faculty ?? "مهندسی کامپیوتر"}
                </p>
              </>
            )}
            {role === "professor" && (
              <>
                <p>
                  <strong>شناسه کارمندی:</strong> {user?.id}
                </p>
                <p>
                  <strong>دپارتمان:</strong> {user?.department ?? "علوم کامپیوتر"}
                </p>
              </>
            )}
            {role === "admin" && (
              <>
                <p>
                  <strong>سطح دسترسی:</strong> کامل
                </p>
                <p>
                  <strong>آخرین ورود:</strong> امروز ۱۰:۳۰
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <nav>
        <ul className="sidebar-nav">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className={`fas ${item.icon}`} /> {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onLogout();
              }}
            >
              <i className="fas fa-sign-out-alt" /> خروج
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
