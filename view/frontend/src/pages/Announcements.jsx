import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { createAnnouncement, fetchAnnouncements } from "../services/announcementService";

const priorityLabels = {
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
};

export default function Announcements({ user }) {
  const { notify } = useNotification();
  const [form, setForm] = useState({ title: "", content: "", priority: "medium" });
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    let mounted = true;
    fetchAnnouncements()
      .then((data) => {
        if (!mounted) return;
        setAnnouncements(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch(() => {
        if (mounted) setError("دریافت اعلان‌ها ناموفق بود.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        title: form.title,
        content: form.content,
        priority: form.priority,
        createdBy: user?.name ?? "ادمین",
        date: new Date().toLocaleDateString("fa-IR"),
      };
      const created = await createAnnouncement(payload);
      setAnnouncements((prev) => [created, ...prev]);
      notify("اعلان با موفقیت ایجاد شد");
      setForm({ title: "", content: "", priority: "medium" });
    } catch (error) {
      notify(error?.message || "ثبت اعلان ناموفق بود.", "error");
    }
  };

  return (
    <>
      <Header title="اعلان‌ها و اطلاعیه‌ها" icon="fa-bell" />

      {isAdmin && (
        <div className="form-container mb-4">
          <h3>ایجاد اعلان جدید</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">عنوان اعلان</label>
              <input
                id="title"
                className="form-control"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">محتوا</label>
              <textarea
                id="content"
                className="form-control"
                rows={4}
                value={form.content}
                onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">اولویت</label>
              <select
                id="priority"
                className="form-control"
                value={form.priority}
                onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
              >
                <option value="high">بالا</option>
                <option value="medium">متوسط</option>
                <option value="low">پایین</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              ایجاد اعلان
            </button>
          </form>
        </div>
      )}

      <div className="announcements-list">
        {loading && <div className="alert alert-info">در حال بارگذاری اعلان‌ها...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-card fade-in">
            <div className="announcement-header">
              <h4>{announcement.title}</h4>
              <span
                className={`status-badge ${
                  announcement.priority === "high"
                    ? "status-rejected"
                    : announcement.priority === "medium"
                    ? "status-pending"
                    : "status-approved"
                }`}
              >
                {priorityLabels[announcement.priority]}
              </span>
            </div>
            <div className="announcement-body">
              <p>{announcement.content}</p>
            </div>
            <div className="announcement-footer">
              <span>
                <i className="fas fa-user" /> {announcement.createdBy}
              </span>
              <span>
                <i className="fas fa-calendar" /> {announcement.date}
              </span>
              {isAdmin && <button className="btn btn-danger btn-sm">حذف</button>}
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
        <div className="content-padding">
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

          <div className="filter-actions">
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search" /> اعمال فیلتر
            </button>
            <button type="button" className="btn btn-outline" style={{ marginRight: "10px" }}>
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
        <div className="content-padding">
          <div className="form-row">
            <div className="form-group">
              <div className="priority-card priority-high">
                <i className="fas fa-exclamation-circle fa-2x" />
                <h4>اولویت بالا</h4>
                <p>تعطیلی سایت، مشکلات جدی، تغییرات فوری</p>
              </div>
            </div>

            <div className="form-group">
              <div className="priority-card priority-medium">
                <i className="fas fa-exclamation-triangle fa-2x" />
                <h4>اولویت متوسط</h4>
                <p>نصب نرم‌افزار، تغییرات برنامه، اطلاعیه‌های مهم</p>
              </div>
            </div>

            <div className="form-group">
              <div className="priority-card priority-low">
                <i className="fas fa-info-circle fa-2x" />
                <h4>اولویت پایین</h4>
                <p>اطلاعیه‌های عمومی، اخبار، رویدادهای آینده</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
