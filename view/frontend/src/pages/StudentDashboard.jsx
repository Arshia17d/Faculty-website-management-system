import React, { useEffect, useMemo, useState } from "react";
import { fetchReservations } from "../services/reservationService";

const usageStats = {
  hours: 42,
  reports: 2,
};

export default function StudentDashboard({ user }) {
  const [stats, setStats] = useState({ active: 0, pending: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchReservations()
      .then((data) => {
        if (!mounted) return;
        const userReservations = data.filter((item) => item.userId === user?.id);
        const active = userReservations.filter((item) => item.status === "approved").length;
        const pending = userReservations.filter((item) => item.status === "pending").length;
        setStats({ active, pending });
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
          <i className="fas fa-home" /> داشبورد دانشجو
        </h2>
        <div className="date-display">{currentDate}</div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-check" />
          </div>
          <div className="stat-info">
            <h3>{stats.active}</h3>
            <p>رزروهای فعال</p>
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
            <i className="fas fa-history" />
          </div>
          <div className="stat-info">
            <h3>۴۲</h3>
            <p>ساعت استفاده شده</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="stat-info">
            <h3>{usageStats.reports}</h3>
            <p>گزارش خرابی</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-history" /> رزروهای اخیر
          </h3>
          <a href="/student/reservation" className="btn btn-primary">
            رزرو جدید
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <th>سایت</th>
              <th>تاریخ</th>
              <th>زمان</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan={4}>رزروی ثبت نشده است.</td>
              </tr>
            ) : (
              recent.map((item) => (
                <tr key={item.id}>
                  <td>{item.siteName}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.startTime} - {item.endTime}
                  </td>
                  <td>{item.status === "approved" ? "تایید شده" : "در انتظار"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-info-circle" /> راهنمای استفاده
          </h3>
        </div>
        <div style={{ padding: "20px" }}>
          <ol style={{ paddingRight: "20px" }}>
            <li style={{ marginBottom: "10px" }}>
              برای رزرو میز کامپیوتر، از منوی کناری گزینه "رزرو میز" را انتخاب کنید.
            </li>
            <li style={{ marginBottom: "10px" }}>
              می‌توانید سایت، تاریخ، زمان و نرم‌افزارهای مورد نیاز خود را انتخاب کنید.
            </li>
            <li style={{ marginBottom: "10px" }}>
              در صورت بروز مشکل در سیستم‌ها، از طریق "گزارش خرابی" مشکل را اطلاع دهید.
            </li>
            <li style={{ marginBottom: "10px" }}>
              اعلان‌های مهم سیستم را از بخش "اعلان‌ها" مشاهده کنید.
            </li>
            <li>رزروها پس از تایید ادمین فعال می‌شوند.</li>
          </ol>
        </div>
      </div>
    </>
  );
}
