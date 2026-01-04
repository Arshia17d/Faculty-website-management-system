import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchReservations } from "../services/reservationService";
import { fetchSoftware } from "../services/softwareService";

export default function AdminDashboard({ user }) {
  const [stats, setStats] = useState({ pending: 0, software: 0 });

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchReservations(), fetchSoftware()])
      .then(([reservations, software]) => {
        if (!mounted) return;
        setStats({
          pending: reservations.filter((item) => item.status === "pending").length,
          software: software.length,
        });
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="main-content">
      <Header title="داشبورد ادمین" />
      <div className="info-box">
        <h3>خوش آمدید، {user?.name}</h3>
        <p>سطح دسترسی: کامل</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-hourglass-half" />
          </div>
          <div>
            <h3>{stats.pending}</h3>
            <p>رزروهای در انتظار</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-cogs" />
          </div>
          <div>
            <h3>{stats.software}</h3>
            <p>نرم‌افزارهای موجود</p>
          </div>
        </div>
      </div>
    </div>
  );
}
