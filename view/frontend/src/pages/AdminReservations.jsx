import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { mockData } from "../data/mockData";

const extraReservations = [
  {
    id: "RES-1003",
    userName: "فاطمه کریمی (98234567)",
    siteName: "آزمایشگاه نرم‌افزار",
    date: "1403/01/20",
    time: "10:00 - 12:00",
    type: "رزرو میز",
    status: "approved",
  },
  {
    id: "RES-1004",
    userName: "دکتر حسینی (emp-5678)",
    siteName: "مرکز کتابخانه",
    date: "1403/01/18",
    time: "14:00 - 16:00",
    type: "رزرو سایت",
    status: "rejected",
  },
  {
    id: "RES-1005",
    userName: "محمد احمدی (98345678)",
    siteName: "سایت دانشکده فنی",
    date: "1403/01/19",
    time: "16:00 - 18:00",
    type: "رزرو میز",
    status: "approved",
  },
];

export default function AdminReservations() {
  const { notify } = useNotification();

  const pendingReservations = mockData.reservations.map((item, index) => ({
    id: `RES-100${index + 1}`,
    userName: `${item.userName} (${item.userId})`,
    siteName: item.siteName,
    date: item.date,
    time: `${item.startTime} - ${item.endTime}`,
    type: item.type === "student" ? "رزرو میز" : "رزرو سایت",
    status: item.status,
  }));

  const allReservations = [...pendingReservations, ...extraReservations];

  return (
    <>
      <Header
        title="مدیریت رزروها"
        icon="fa-calendar-check"
        action={
          <Link to="/admin/dashboard" className="btn btn-outline">
            <i className="fas fa-arrow-right" /> بازگشت به داشبورد
          </Link>
        }
        showDate={false}
      />

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-filter" /> فیلتر رزروها
          </h3>
        </div>
        <div className="content-padding">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="filterSite">سایت</label>
              <select id="filterSite" className="form-control">
                <option value="">همه سایت‌ها</option>
                {mockData.sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
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

          <div className="filter-actions">
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search" /> اعمال فیلتر
            </button>
            <button type="button" className="btn btn-outline" style={{ marginRight: "10px" }}>
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
            <button type="button" className="btn btn-primary">
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
            {allReservations.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.userName}</td>
                <td>{item.siteName}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.type}</td>
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
                <td>
                  {item.status === "pending" && (
                    <>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => notify("رزرو با موفقیت تایید شد")}
                      >
                        تایید
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => notify("رزرو رد شد", "warning")}
                      >
                        رد
                      </button>
                    </>
                  )}
                  {item.status === "approved" && (
                    <button type="button" className="btn btn-warning btn-sm">
                      لغو
                    </button>
                  )}
                  <button type="button" className="btn btn-outline btn-sm">
                    جزئیات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <nav>
            <ul>
              <li>
                <a href="#" className="active">
                  ۱
                </a>
              </li>
              <li>
                <a href="#">۲</a>
              </li>
              <li>
                <a href="#">۳</a>
              </li>
              <li>
                <a href="#">بعدی</a>
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
        <div className="content-padding">
          <div className="form-row">
            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#3498db" }}>
                ۱۵
              </div>
              <div className="stat-label">رزرو امروز</div>
            </div>

            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#27ae60" }}>
                ۴۲
              </div>
              <div className="stat-label">رزرو این هفته</div>
            </div>

            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#f39c12" }}>
                ۱۲۳
              </div>
              <div className="stat-label">رزرو این ماه</div>
            </div>

            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#e74c3c" }}>
                ۵
              </div>
              <div className="stat-label">در انتظار تایید</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
