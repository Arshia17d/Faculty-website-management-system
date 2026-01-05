import React, { useEffect, useState } from "react";
import { fetchReservations } from "../services/reservationService";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations()
      .then(setReservations)
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-calendar-check" /> مدیریت رزروها
        </h2>
        <a href="/admin/dashboard" className="btn btn-outline">
          <i className="fas fa-arrow-right" /> بازگشت به داشبورد
        </a>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-filter" /> فیلتر رزروها
          </h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="filterSite">سایت</label>
              <select id="filterSite" className="form-control">
                <option value="">همه سایت‌ها</option>
                <option value="1">سایت کامپیوتر دانشکده فنی</option>
                <option value="2">آزمایشگاه مهندسی نرم‌افزار</option>
                <option value="3">مرکز کامپیوتر کتابخانه مرکزی</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterDate">تاریخ</label>
              <input type="date" id="filterDate" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="filterStatus">وضعیت</label>
              <select id="filterStatus" className="form-control">
                <option value="">همه وضعیت‌ها</option>
                <option value="pending">در انتظار</option>
                <option value="approved">تایید شده</option>
                <option value="rejected">رد شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterType">نوع رزرو</label>
              <select id="filterType" className="form-control">
                <option value="">همه انواع</option>
                <option value="student">رزرو میز (دانشجو)</option>
                <option value="professor">رزرو سایت (استاد)</option>
              </select>
            </div>
          </div>

          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <button className="btn btn-primary">
              <i className="fas fa-search" /> اعمال فیلتر
            </button>
            <button className="btn btn-outline" style={{ marginRight: "10px" }}>
              <i className="fas fa-redo" /> بازنشانی
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-list" /> لیست رزروها
          </h3>
          <div>
            <button className="btn btn-primary">
              <i className="fas fa-file-export" /> خروجی Excel
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>سایت</th>
              <th>تاریخ</th>
              <th>زمان</th>
              <th>نوع</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={8}>اطلاعاتی برای نمایش وجود ندارد.</td>
              </tr>
            ) : (
              reservations.map((item) => (
                <tr key={item.id}>
                  <td>#RES-{1000 + item.id}</td>
                  <td>
                    {item.userName} ({item.userId})
                  </td>
                  <td>{item.siteName}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.startTime} - {item.endTime}
                  </td>
                  <td>{item.type === "professor" ? "رزرو سایت" : "رزرو میز"}</td>
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
                      {item.status === "approved"
                        ? "تایید شده"
                        : item.status === "pending"
                        ? "در انتظار"
                        : "رد شده"}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm">تایید</button>
                    <button className="btn btn-danger btn-sm">رد</button>
                    <button className="btn btn-outline btn-sm">جزئیات</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div
          style={{
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            borderTop: "1px solid #eee",
          }}
        >
          <nav>
            <ul style={{ listStyle: "none", display: "flex", gap: "5px" }}>
              <li>
                <a
                  href="#"
                  style={{ padding: "8px 12px", backgroundColor: "#3498db", color: "white", borderRadius: "4px" }}
                >
                  ۱
                </a>
              </li>
              <li>
                <a href="#" style={{ padding: "8px 12px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                  ۲
                </a>
              </li>
              <li>
                <a href="#" style={{ padding: "8px 12px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                  ۳
                </a>
              </li>
              <li>
                <a href="#" style={{ padding: "8px 12px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                  بعدی
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-chart-bar" /> آمار رزروها
          </h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="form-row">
            <div className="form-group" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3498db" }}>۱۵</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>رزرو امروز</div>
            </div>

            <div className="form-group" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#27ae60" }}>۴۲</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>رزرو این هفته</div>
            </div>

            <div className="form-group" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f39c12" }}>۱۲۳</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>رزرو این ماه</div>
            </div>

            <div className="form-group" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#e74c3c" }}>۵</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>در انتظار تایید</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
