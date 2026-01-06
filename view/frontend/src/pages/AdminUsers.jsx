import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { fetchUsers } from "../services/userService";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    fetchUsers()
      .then((data) => {
        if (!mounted) return;
        setUsers(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch(() => {
        if (mounted) setError("دریافت کاربران ناموفق بود.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Header
        title="مدیریت کاربران"
        icon="fa-users"
        action={
          <Link to="/admin/dashboard" className="btn btn-outline">
            <i className="fas fa-arrow-right" /> بازگشت به داشبورد
          </Link>
        }
        showDate={false}
      />

      <div className="table-container">
        {loading && <div className="alert alert-info">در حال بارگذاری اطلاعات...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-header">
          <h3>
            <i className="fas fa-users" /> لیست کاربران
          </h3>
          <button type="button" className="btn btn-primary">
            <i className="fas fa-user-plus" /> افزودن کاربر
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>نقش</th>
              <th>اطلاعات تکمیلی</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const roleBadge =
                user.role === "admin"
                  ? { label: "ادمین", className: "status-admin" }
                  : user.role === "professor"
                  ? { label: "استاد", className: "status-professor" }
                  : { label: "دانشجو", className: "status-student" };

              const extraInfo =
                user.role === "student"
                  ? user.faculty
                  : user.role === "professor"
                  ? user.department
                  : user.accessLevel === "full"
                  ? "دسترسی کامل"
                  : "دسترسی محدود";

              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <span className={`status-badge ${roleBadge.className}`}>{roleBadge.label}</span>
                  </td>
                  <td>{extraInfo}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        user.status === "active" ? "status-approved" : "status-rejected"
                      }`}
                    >
                      {user.status === "active" ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="btn btn-warning btn-sm">
                      ویرایش
                    </button>
                    <button type="button" className="btn btn-danger btn-sm">
                      غیرفعال
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
