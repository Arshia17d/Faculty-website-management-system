import React from "react";
import { malfunctionReports } from "../data/mockData";

const statusLabels = {
  pending: "در انتظار",
  "in-progress": "در حال بررسی",
  resolved: "حل شده",
  closed: "بسته شده",
};

const statusClass = {
  pending: "status-pending",
  "in-progress": "status-warning",
  resolved: "status-approved",
  closed: "status-rejected",
};

const priorityLabels = {
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
};

export default function AdminReports() {
  const totalReports = 12;
  const pendingReports = 3;
  const inProgressReports = 2;
  const resolvedReports = 7;

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-exclamation-triangle" /> مدیریت گزارشات خرابی
        </h2>
        <a href="/admin/dashboard" className="btn btn-outline">
          <i className="fas fa-arrow-right" /> بازگشت به داشبورد
        </a>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="stat-info">
            <h3>{totalReports}</h3>
            <p>کل گزارشات</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="stat-info">
            <h3>{pendingReports}</h3>
            <p>در انتظار بررسی</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-tools" />
          </div>
          <div className="stat-info">
            <h3>{inProgressReports}</h3>
            <p>در حال تعمیر</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle" />
          </div>
          <div className="stat-info">
            <h3>{resolvedReports}</h3>
            <p>حل شده</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-filter" /> فیلتر گزارشات
          </h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="filterReportSite">سایت</label>
              <select id="filterReportSite" className="form-control">
                <option value="">همه سایت‌ها</option>
                <option value="1">سایت کامپیوتر دانشکده فنی</option>
                <option value="2">آزمایشگاه مهندسی نرم‌افزار</option>
                <option value="3">مرکز کامپیوتر کتابخانه مرکزی</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterReportStatus">وضعیت</label>
              <select id="filterReportStatus" className="form-control">
                <option value="">همه وضعیت‌ها</option>
                <option value="pending">در انتظار</option>
                <option value="in-progress">در حال بررسی</option>
                <option value="resolved">حل شده</option>
                <option value="closed">بسته شده</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterReportPriority">اولویت</label>
              <select id="filterReportPriority" className="form-control">
                <option value="">همه اولویت‌ها</option>
                <option value="high">بالا</option>
                <option value="medium">متوسط</option>
                <option value="low">پایین</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterReportDate">تاریخ از</label>
              <input type="date" id="filterReportDate" className="form-control" />
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
            <i className="fas fa-list" /> لیست گزارشات خرابی
          </h3>
          <div>
            <button className="btn btn-primary">
              <i className="fas fa-file-export" /> خروجی Excel
            </button>
            <button className="btn btn-outline" style={{ marginRight: "10px" }}>
              <i className="fas fa-print" /> چاپ
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>گزارش‌دهنده</th>
              <th>سایت</th>
              <th>میز</th>
              <th>شرح مشکل</th>
              <th>اولویت</th>
              <th>تاریخ</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {malfunctionReports.map((report) => (
              <tr key={report.id}>
                <td>#REP-{200 + report.id}</td>
                <td>{report.userName}</td>
                <td>{report.siteName}</td>
                <td>{report.deskId}</td>
                <td>{report.description}</td>
                <td>
                  <span className="status-badge status-rejected">
                    {priorityLabels[report.priority] ?? "-"}
                  </span>
                </td>
                <td>{report.date}</td>
                <td>
                  <span className={`status-badge ${statusClass[report.status] ?? "status-pending"}`}>
                    {statusLabels[report.status] ?? report.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">جزئیات</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-chart-pie" /> آمار و تجزیه و تحلیل
          </h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="form-row">
            <div className="form-group">
              <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px" }}>
                  شایع‌ترین مشکلات
                </div>
                <ul style={{ textAlign: "right", paddingRight: "20px" }}>
                  <li>مشکل مانیتور (۴ مورد)</li>
                  <li>سیستم هنگ می‌کند (۳ مورد)</li>
                  <li>مشکل شبکه (۲ مورد)</li>
                  <li>نرم‌افزار اجرا نمی‌شود (۲ مورد)</li>
                  <li>صدا ندارد (۱ مورد)</li>
                </ul>
              </div>
            </div>

            <div className="form-group">
              <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px" }}>
                  میانگین زمان حل مشکل
                </div>
                <div style={{ fontSize: "2.5rem", color: "#3498db", margin: "20px 0" }}>۲.۵</div>
                <div style={{ color: "#666" }}>روز</div>
              </div>
            </div>

            <div className="form-group">
              <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px" }}>
                  سایت با بیشترین مشکل
                </div>
                <div style={{ fontSize: "1.5rem", color: "#e74c3c", margin: "15px 0" }}>سایت دانشکده فنی</div>
                <div style={{ color: "#666" }}>۶ گزارش در ماه جاری</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
