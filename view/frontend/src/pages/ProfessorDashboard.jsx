import React, { useEffect, useMemo, useState } from "react";
import { fetchReservations } from "../services/reservationService";
import { sites } from "../data/mockData";

export default function ProfessorDashboard({ user }) {
  const [stats, setStats] = useState({ approved: 0, pending: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchReservations()
      .then((data) => {
        if (!mounted) return;
        const userReservations = data.filter((item) => item.userId === user?.id);
        const approved = userReservations.filter((item) => item.status === "approved").length;
        const pending = userReservations.filter((item) => item.status === "pending").length;
        setStats({ approved, pending });
        setRecent(userReservations.slice(0, 5));
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [user]);

  const currentDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  }, []);

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-home" /> داشبورد استاد
        </h2>
        <div className="date-display">{currentDate}</div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-check" />
          </div>
          <div className="stat-info">
            <h3>{stats.approved}</h3>
            <p>رزروهای تایید شده</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>رزروهای در انتظار</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users" />
          </div>
          <div className="stat-info">
            <h3>۱۲۷</h3>
            <p>تعداد دانشجویان</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="stat-info">
            <h3>۳</h3>
            <p>گزارش خرابی</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-history" /> رزروهای اخیر
          </h3>
          <a href="/professor/reservation" className="btn btn-primary">
            رزرو سایت جدید
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <th>سایت</th>
              <th>تاریخ</th>
              <th>زمان</th>
              <th>هدف</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan={5}>رزروی ثبت نشده است.</td>
              </tr>
            ) : (
              recent.map((item) => (
                <tr key={item.id}>
                  <td>{item.siteName}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.startTime} - {item.endTime}
                  </td>
                  <td>{item.purpose ?? "-"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "approved" ? "status-approved" : "status-pending"
                      }`}
                    >
                      {item.status === "approved" ? "تایید شده" : "در انتظار"}
                    </span>
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
            <i className="fas fa-desktop" /> سایت‌های کامپیوتری
          </h3>
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
    </>
  );
}
