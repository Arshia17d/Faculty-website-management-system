import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { mockData } from "../data/mockData";
import { fetchReservations } from "../services/reservationService";

const formatNumber = (value) => Number(value).toLocaleString("fa-IR");

export default function StudentDashboard({ user }) {
  const [reservations, setReservations] = useState(mockData.reservations);

  useEffect(() => {
    let mounted = true;
    fetchReservations()
      .then((data) => {
        if (!mounted || !Array.isArray(data)) return;
        setReservations(data);
      })
      .catch(() => {
        if (mounted) {
          setReservations(mockData.reservations);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const userReservations = useMemo(
    () => reservations.filter((item) => item.userId === user?.id),
    [reservations, user]
  );

  const stats = useMemo(() => {
    const active = userReservations.filter((item) => item.status === "approved").length;
    const pending = userReservations.filter((item) => item.status === "pending").length;
    return { active, pending };
  }, [userReservations]);

  const recent = userReservations.slice(0, 5);
  const reportsCount = mockData.malfunctionReports.filter((report) => report.userId === user?.id).length;

  return (
    <>
      <Header title="داشبورد دانشجو" icon="fa-home" />

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-check" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(stats.active)}</h3>
            <p>رزروهای فعال</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(stats.pending)}</h3>
            <p>رزروهای در انتظار</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-history" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(42)}</h3>
            <p>ساعت استفاده شده</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="stat-info">
            <h3>{formatNumber(reportsCount || 2)}</h3>
            <p>گزارش خرابی</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-history" /> رزروهای اخیر
          </h3>
          <Link to="/student/reservation" className="btn btn-primary">
            رزرو جدید
          </Link>
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
            <i className="fas fa-info-circle" /> راهنمای استفاده
          </h3>
        </div>
        <div className="content-padding">
          <ol className="guidelines-list">
            <li>برای رزرو میز کامپیوتر، از منوی کناری گزینه "رزرو میز" را انتخاب کنید.</li>
            <li>می‌توانید سایت، تاریخ، زمان و نرم‌افزارهای مورد نیاز خود را انتخاب کنید.</li>
            <li>در صورت بروز مشکل در سیستم‌ها، از طریق "گزارش خرابی" مشکل را اطلاع دهید.</li>
            <li>اعلان‌های مهم سیستم را از بخش "اعلان‌ها" مشاهده کنید.</li>
            <li>رزروها پس از تایید ادمین فعال می‌شوند.</li>
          </ol>
        </div>
      </div>
    </>
  );
}
