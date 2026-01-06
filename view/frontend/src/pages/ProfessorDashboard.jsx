import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { fetchReports } from "../services/malfunctionService";
import { fetchReservations } from "../services/reservationService";
import { fetchSites } from "../services/siteService";

const formatNumber = (value) => Number(value).toLocaleString("fa-IR");

export default function ProfessorDashboard({ user }) {
  const [reservations, setReservations] = useState([]);
  const [sites, setSites] = useState([]);
  const [reportsCount, setReportsCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadData = () =>
      Promise.all([fetchReservations(user?.id), fetchSites(), fetchReports(user?.id)])
        .then(([reservationsData, sitesData, reportsData]) => {
          if (!mounted) return;
          setReservations(Array.isArray(reservationsData) ? reservationsData : []);
          setSites(Array.isArray(sitesData) ? sitesData : []);
          setReportsCount(Array.isArray(reportsData) ? reportsData.length : 0);
          setError("");
        })
        .catch(() => {
          if (mounted) setError("دریافت اطلاعات داشبورد ناموفق بود.");
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });

    loadData();
    const intervalId = setInterval(loadData, 15000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [user?.id]);

  const userReservations = useMemo(
    () => reservations.filter((item) => item.userId === user?.id),
    [reservations, user]
  );
  const approved = userReservations.filter((item) => item.status === "approved").length;
  const pending = userReservations.filter((item) => item.status === "pending").length;
  const totalStudents = userReservations.reduce((sum, item) => sum + (item.studentsCount ?? 0), 0);
  const recent = userReservations.slice(0, 5);

  return (
    <>
      <Header title="داشبورد استاد" icon="fa-home" />
      {loading && <div className="alert alert-info">در حال بارگذاری اطلاعات...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-check" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(approved)}</h3>
            <p>رزروهای تایید شده</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(pending)}</h3>
            <p>رزروهای در انتظار</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(totalStudents)}</h3>
            <p>تعداد دانشجویان</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(reportsCount)}</h3>
            <p>گزارش خرابی</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-history" /> رزروهای اخیر
          </h3>
          <Link to="/professor/reservation" className="btn btn-primary">
            رزرو سایت جدید
          </Link>
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
        <div className="content-padding">
          <div className="sites-grid">
            {sites.map((site) => (
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
                    <h4>نرم‌افزارهای موجود:</h4>
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
