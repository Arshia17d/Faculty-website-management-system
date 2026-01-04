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

export default function Sidebar({ user, onLogout }) {
  const role = user?.role || "student";
  const items = navConfig[role] ?? [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <i className={`fas ${role === "admin" ? "fa-user-cog" : "fa-user"} fa-2x`} />
          <div className="user-details">
            <h3>{user?.name ?? "کاربر"}</h3>
            <p>{role === "student" ? "دانشجو" : role === "professor" ? "استاد" : "ادمین"}</p>
          </div>
        </div>
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
            <button type="button" className="btn btn-outline btn-sm" onClick={onLogout}>
              <i className="fas fa-sign-out-alt" /> خروج
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
