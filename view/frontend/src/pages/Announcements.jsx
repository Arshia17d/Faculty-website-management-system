import React, { useMemo } from "react";
import { announcements } from "../data/mockData";

const priorityLabels = {
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
};

const priorityClass = {
  high: "status-rejected",
  medium: "status-pending",
  low: "status-approved",
};

export default function Announcements() {
  const currentDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  }, []);

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-bell" /> اعلان‌ها و اطلاعیه‌ها
        </h2>
        <div className="date-display">{currentDate}</div>
      </div>

      <div className="announcements-list">
        {announcements.map((item) => (
          <div key={item.id} className="announcement-card fade-in">
            <div className="announcement-header">
              <h4>{item.title}</h4>
              <span className={`status-badge ${priorityClass[item.priority]}`}>
                {priorityLabels[item.priority]}
              </span>
            </div>
            <div className="announcement-body">
              <p>{item.content}</p>
            </div>
            <div className="announcement-footer">
              <span>
                <i className="fas fa-user" /> {item.createdBy}
              </span>
              <span>
                <i className="fas fa-calendar" /> {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-filter" /> فیلتر اعلان‌ها
          </h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="announcementPriority">اولویت</label>
              <select id="announcementPriority" className="form-control">
                <option value="">همه اولویت‌ها</option>
                <option value="high">بالا</option>
                <option value="medium">متوسط</option>
                <option value="low">پایین</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="announcementDate">تاریخ از</label>
              <input type="date" id="announcementDate" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="announcementCategory">دسته‌بندی</label>
              <select id="announcementCategory" className="form-control">
                <option value="">همه دسته‌بندی‌ها</option>
                <option value="maintenance">تعمیرات</option>
                <option value="software">نرم‌افزار</option>
                <option value="schedule">زمان‌بندی</option>
                <option value="event">رویداد</option>
                <option value="general">عمومی</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="announcementSearch">جست‌وجو در متن</label>
              <input type="text" id="announcementSearch" className="form-control" placeholder="کلیدواژه" />
            </div>
          </div>

          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <button className="btn btn-primary">
              <i className="fas fa-search" /> اعمال فیلتر
            </button>
            <button className="btn btn-outline" style={{ marginRight: "10px" }}>
              <i className="fas fa-redo" /> بازنشانی
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-info-circle" /> راهنمای اولویت اعلان‌ها
          </h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="form-row">
            <div className="form-group">
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#fdedec", borderRadius: "8px" }}>
                <i className="fas fa-exclamation-circle fa-2x" style={{ color: "#c0392b", marginBottom: "10px" }} />
                <h4>اولویت بالا</h4>
                <p style={{ fontSize: "0.9rem" }}>تعطیلی سایت، مشکلات جدی، تغییرات فوری</p>
              </div>
            </div>

            <div className="form-group">
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#fef9e7", borderRadius: "8px" }}>
                <i
                  className="fas fa-exclamation-triangle fa-2x"
                  style={{ color: "#f39c12", marginBottom: "10px" }}
                />
                <h4>اولویت متوسط</h4>
                <p style={{ fontSize: "0.9rem" }}>نصب نرم‌افزار، تغییرات برنامه، اطلاعیه‌های مهم</p>
              </div>
            </div>

            <div className="form-group">
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#d5f4e6", borderRadius: "8px" }}>
                <i className="fas fa-info-circle fa-2x" style={{ color: "#27ae60", marginBottom: "10px" }} />
                <h4>اولویت پایین</h4>
                <p style={{ fontSize: "0.9rem" }}>اطلاعیه‌های عمومی، اخبار، رویدادهای آینده</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
