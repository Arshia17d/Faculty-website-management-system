import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchReservations } from "../services/reservationService";

export default function StudentDashboard({ user }) {
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

  return (
    <div className="main-content">
      <Header title="داشبورد دانشجو" />
      <div className="info-box">
        <h3>خوش آمدید، {user?.name}</h3>
        <p>شماره دانشجویی: {user?.id}</p>
        {user?.faculty && <p>دانشکده: {user.faculty}</p>}
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-check-circle" />
          </div>
          <div>
            <h3>{stats.approved}</h3>
            <p>رزروهای تایید شده</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-hourglass-half" />
          </div>
          <div>
            <h3>{stats.pending}</h3>
            <p>رزروهای در انتظار</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>رزروهای اخیر</h3>
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
    </div>
  );
}
