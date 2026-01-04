import React from "react";
import Header from "../components/Header";

const announcements = [
  {
    id: 1,
    title: "تعمیرات سایت دانشکده فنی",
    content:
      "به اطلاع می‌رساند سایت کامپیوتر دانشکده فنی در تاریخ 1403/01/25 جهت تعمیرات سیستم‌های خنک‌کننده تعطیل خواهد بود.",
    date: "1403/01/20",
  },
  {
    id: 2,
    title: "نصب نرم‌افزارهای جدید",
    content: "نرم‌افزارهای Python 3.11 و VS Code نسخه 1.78 روی تمام سیستم‌ها نصب شد.",
    date: "1403/01/18",
  },
];

export default function Announcements() {
  return (
    <div className="main-content">
      <Header title="اعلان‌ها" />
      <div className="table-container">
        <div className="table-header">
          <h3>اعلان‌های سیستم</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>عنوان</th>
              <th>توضیحات</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
