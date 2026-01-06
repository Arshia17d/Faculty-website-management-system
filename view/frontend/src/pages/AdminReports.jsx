import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { mockData } from "../data/mockData";

export default function AdminReports() {
  const { notify } = useNotification();

  const handleStart = () => {
    notify("وضعیت گزارش به روز شد");
  };

  return (
    <>
      <Header
        title="گزارشات خرابی"
        icon="fa-exclamation-triangle"
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
            <i className="fas fa-filter" /> فیلتر گزارش‌ها
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
              <label htmlFor="filterPriority">اولویت</label>
              <select id="filterPriority" className="form-control">
                <option value="">همه اولویت‌ها</option>
                <option value="high">بالا</option>
                <option value="medium">متوسط</option>
                <option value="low">پایین</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterStatus">وضعیت</label>
              <select id="filterStatus" className="form-control">
                <option value="">همه وضعیت‌ها</option>
                <option value="pending">در انتظار</option>
                <option value="in-progress">در حال بررسی</option>
                <option value="resolved">حل شده</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterDate">تاریخ</label>
              <input type="date" id="filterDate" className="form-control" />
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
            <i className="fas fa-list" /> گزارشات ثبت شده
          </h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>کاربر</th>
              <th>سایت</th>
              <th>شماره میز</th>
              <th>شرح مشکل</th>
              <th>اولویت</th>
              <th>تاریخ</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {mockData.malfunctionReports.map((report) => (
              <tr key={report.id}>
                <td>{report.userName}</td>
                <td>{report.siteName}</td>
                <td>{report.deskId ?? "--"}</td>
                <td>{report.description}</td>
                <td>
                  <span
                    className={`status-badge ${
                      report.priority === "high"
                        ? "status-rejected"
                        : report.priority === "medium"
                        ? "status-pending"
                        : "status-approved"
                    }`}
                  >
                    {report.priority === "high" ? "بالا" : report.priority === "medium" ? "متوسط" : "پایین"}
                  </span>
                </td>
                <td>{report.date}</td>
                <td>
                  <span
                    className={`status-badge ${
                      report.status === "pending"
                        ? "status-pending"
                        : report.status === "in-progress"
                        ? "status-warning"
                        : "status-approved"
                    }`}
                  >
                    {report.status === "pending"
                      ? "در انتظار"
                      : report.status === "in-progress"
                      ? "در حال بررسی"
                      : "حل شده"}
                  </span>
                </td>
                <td>
                  <button type="button" className="btn btn-success btn-sm" onClick={handleStart}>
                    شروع بررسی
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
