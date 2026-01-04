import React from "react";
import Header from "../components/Header";

export default function AdminReports() {
  return (
    <div className="main-content">
      <Header title="گزارشات خرابی" />
      <div className="table-container">
        <div className="table-header">
          <h3>گزارشات ثبت شده</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>کاربر</th>
              <th>سایت</th>
              <th>شماره میز</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>علی محمدی</td>
              <td>سایت کامپیوتر دانشکده فنی</td>
              <td>A-08</td>
              <td>در حال بررسی</td>
            </tr>
            <tr>
              <td>دکتر رضایی</td>
              <td>آزمایشگاه مهندسی نرم‌افزار</td>
              <td>B-12</td>
              <td>در انتظار</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
