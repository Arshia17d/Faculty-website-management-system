import React, { useEffect, useMemo, useState } from "react";
import { fetchReservations } from "../services/reservationService";
import { malfunctionReports, sites } from "../data/mockData";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDesks: 0,
    freeDesks: 0,
    pendingReservations: 0,
    openReports: 0,
  });
  const [pendingReservations, setPendingReservations] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchReservations()
      .then((data) => {
        if (!mounted) return;
        const pending = data.filter((item) => item.status === "pending");
        setPendingReservations(pending.slice(0, 5));
        setStats((prev) => ({
          ...prev,
          pendingReservations: pending.length,
        }));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const totalDesks = sites.reduce((sum, site) => sum + site.totalDesks, 0);
    const freeDesks = sites.reduce((sum, site) => sum + site.freeDesks, 0);
    const openReports = malfunctionReports.filter((item) => item.status === "pending").length;
    setStats((prev) => ({ ...prev, totalDesks, freeDesks, openReports }));
  }, []);

  const currentDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  }, []);

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-home" /> داشبورد مدیریت سیستم
        </h2>
        <div className="date-display">{currentDate}</div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-desktop" />
          </div>
          <div className="stat-info">
            <h3>{stats.totalDesks}</h3>
            <p>کل میزها</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle" />
          </div>
          <div className="stat-info">
            <h3>{stats.freeDesks}</h3>
            <p>میزهای آزاد</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="stat-info">
            <h3>{stats.pendingReservations}</h3>
            <p>رزروهای در انتظار</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="stat-info">
            <h3>{stats.openReports}</h3>
            <p>گزارشات باز</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-sitemap" /> سایت‌های کامپیوتری
          </h3>
          <div>
            <a href="/admin/software" className="btn btn-primary">
              <i className="fas fa-cogs" /> مدیریت نرم‌افزارها
            </a>
            <button type="button" className="btn btn-outline" style={{ marginRight: "10px" }}>
              <i className="fas fa-plus" /> افزودن سایت
            </button>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="sites-grid">
            {sites.map((site) => (
              <div key={site.id} className="site-card">
                <div className="site-header">
                  <h3>{site.name}</h3>
                </div>
                <div className="site-body">
                  <p>{site.location}</p>
                  <div className="desks-status">
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.freeDesks}</div>
                      <div className="desk-status-label">آزاد</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.occupiedDesks}</div>
                      <div className="desk-status-label">اشغال</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.reservedDesks}</div>
                      <div className="desk-status-label">رزرو</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.underRepairDesks}</div>
                      <div className="desk-status-label">تعمیر</div>
                    </div>
                  </div>
                  <div className="software-list">
                    <h4>نرم‌افزارهای اصلی</h4>
                    <div className="software-tags">
                      {site.software.map((software) => (
                        <span key={software} className="software-tag">
                          {software}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-clock" /> رزروهای در انتظار تایید
          </h3>
          <a href="/admin/reservations" className="btn btn-primary">
            مشاهده همه
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <th>کاربر</th>
              <th>سایت</th>
              <th>تاریخ</th>
              <th>زمان</th>
              <th>نوع</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {pendingReservations.length === 0 ? (
              <tr>
                <td colSpan={6}>درخواستی ثبت نشده است.</td>
              </tr>
            ) : (
              pendingReservations.map((item) => (
                <tr key={item.id}>
                  <td>{item.userName}</td>
                  <td>{item.siteName}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.startTime} - {item.endTime}
                  </td>
                  <td>{item.type === "professor" ? "رزرو سایت" : "رزرو میز"}</td>
                  <td>
                    <button className="btn btn-success btn-sm">تایید</button>
                    <button className="btn btn-danger btn-sm">رد</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-exclamation-triangle" /> گزارشات خرابی اخیر
          </h3>
          <a href="/admin/reports" className="btn btn-primary">
            مشاهده همه
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <th>کاربر</th>
              <th>سایت</th>
              <th>میز</th>
              <th>شرح مشکل</th>
              <th>اولویت</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {malfunctionReports.map((report) => (
              <tr key={report.id}>
                <td>{report.userName}</td>
                <td>{report.siteName}</td>
                <td>{report.deskId}</td>
                <td>{report.description}</td>
                <td>
                  <span className="status-badge status-rejected">
                    {report.priority === "high" ? "بالا" : report.priority === "medium" ? "متوسط" : "پایین"}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      report.status === "pending" ? "status-pending" : "status-warning"
                    }`}
                  >
                    {report.status === "pending" ? "در انتظار" : "در حال بررسی"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
