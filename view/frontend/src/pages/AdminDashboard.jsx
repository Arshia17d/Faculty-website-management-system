import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { mockData } from "../data/mockData";
import { fetchReservations } from "../services/reservationService";

const formatNumber = (value) => Number(value).toLocaleString("fa-IR");

export default function AdminDashboard() {
  const [reservations, setReservations] = useState(mockData.reservations);
  const { notify } = useNotification();

  useEffect(() => {
    let mounted = true;
    fetchReservations()
      .then((data) => {
        if (!mounted || !Array.isArray(data)) return;
        setReservations(data);
      })
      .catch(() => {
        if (mounted) setReservations(mockData.reservations);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const pendingReservations = reservations.filter((item) => item.status === "pending");

  const stats = useMemo(() => {
    const totalDesks = mockData.sites.reduce((sum, site) => sum + site.totalDesks, 0);
    const freeDesks = mockData.sites.reduce((sum, site) => sum + site.freeDesks, 0);
    const openReports = mockData.malfunctionReports.filter((report) => report.status === "pending").length;
    return { totalDesks, freeDesks, openReports };
  }, []);

  const handleReservationAction = (actionLabel) => {
    notify(actionLabel);
  };

  return (
    <>
      <Header title="داشبورد مدیریت سیستم" icon="fa-home" />

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-desktop" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(stats.totalDesks)}</h3>
            <p>کل میزها</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(stats.freeDesks)}</h3>
            <p>میزهای آزاد</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(pendingReservations.length)}</h3>
            <p>رزروهای در انتظار</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(stats.openReports)}</h3>
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
            <Link to="/admin/software" className="btn btn-primary">
              <i className="fas fa-cogs" /> مدیریت نرم‌افزارها
            </Link>
            <button type="button" className="btn btn-outline" style={{ marginRight: "10px" }}>
              <i className="fas fa-plus" /> افزودن سایت
            </button>
          </div>
        </div>
        <div className="content-padding">
          <div className="sites-grid">
            {mockData.sites.map((site) => (
              <div key={site.id} className="site-card fade-in">
                <div className="site-header">
                  <h3>{site.name}</h3>
                  <span className="status-badge status-free">{site.freeDesks} میز آزاد</span>
                </div>
                <div className="site-body">
                  <p>
                    <i className="fas fa-map-marker-alt" /> {site.location}
                  </p>
                  <div className="desks-status">
                    <div className="desk-status-item">
                      <div className="desk-status-count">{site.totalDesks}</div>
                      <div className="desk-status-label">کل میزها</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count" style={{ color: "#27ae60" }}>
                        {site.freeDesks}
                      </div>
                      <div className="desk-status-label">آزاد</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count" style={{ color: "#f39c12" }}>
                        {site.occupiedDesks}
                      </div>
                      <div className="desk-status-label">اشغال</div>
                    </div>
                    <div className="desk-status-item">
                      <div className="desk-status-count" style={{ color: "#c0392b" }}>
                        {site.underRepairDesks}
                      </div>
                      <div className="desk-status-label">تعمیر</div>
                    </div>
                  </div>
                  <div className="software-list">
                    <h4>نرم‌افزارهای نصب شده:</h4>
                    <div className="software-tags">
                      {site.software.map((software) => (
                        <span key={software} className="software-tag">
                          {software}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button type="button" className="btn btn-outline btn-sm mt-3">
                    مدیریت نرم‌افزارها
                  </button>
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
          <Link to="/admin/reservations" className="btn btn-primary">
            مشاهده همه
          </Link>
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
                <td colSpan={6}>رزروی در انتظار تایید وجود ندارد.</td>
              </tr>
            ) : (
              pendingReservations.slice(0, 4).map((item) => (
                <tr key={item.id}>
                  <td>{item.userName}</td>
                  <td>{item.siteName}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.startTime} - {item.endTime}
                  </td>
                  <td>{item.type === "student" ? "رزرو میز" : "رزرو سایت"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => handleReservationAction("رزرو با موفقیت تایید شد")}
                    >
                      تایید
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReservationAction("رزرو رد شد")}
                    >
                      رد
                    </button>
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
          <Link to="/admin/reports" className="btn btn-primary">
            مشاهده همه
          </Link>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
