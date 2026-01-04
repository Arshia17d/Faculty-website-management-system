import React from "react";
import Header from "../components/Header";

export default function AdminUsers() {
  return (
    <div className="main-content">
      <Header title="مدیریت کاربران" />
      <div className="table-container">
        <div className="table-header">
          <h3>لیست کاربران</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>نقش</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>98123456</td>
              <td>علی محمدی</td>
              <td>دانشجو</td>
              <td>فعال</td>
            </tr>
            <tr>
              <td>emp-1234</td>
              <td>دکتر رضایی</td>
              <td>استاد</td>
              <td>فعال</td>
            </tr>
            <tr>
              <td>admin-01</td>
              <td>مدیر سیستم</td>
              <td>ادمین</td>
              <td>فعال</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
