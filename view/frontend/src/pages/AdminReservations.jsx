import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchReservations } from "../services/reservationService";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations()
      .then(setReservations)
      .catch(() => {});
  }, []);

  return (
    <div className="main-content">
      <Header title="مدیریت رزروها" />
      <div className="table-container">
        <div className="table-header">
          <h3>رزروهای ثبت شده</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>کاربر</th>
              <th>سایت</th>
              <th>تاریخ</th>
              <th>زمان</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={5}>اطلاعاتی برای نمایش وجود ندارد.</td>
              </tr>
            ) : (
              reservations.map((item) => (
                <tr key={item.id}>
                  <td>{item.userName}</td>
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
