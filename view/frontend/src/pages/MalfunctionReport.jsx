import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { mockData } from "../data/mockData";

export default function MalfunctionReport({ user }) {
  const [form, setForm] = useState({
    siteId: "",
    deskId: "",
    problemType: "",
    priority: "medium",
    description: "",
    recurring: "no",
    contact: "",
  });
  const { notify } = useNotification();
  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "professor"
      ? "/professor/dashboard"
      : "/student/dashboard";

  const handleSubmit = (event) => {
    event.preventDefault();
    notify("گزارش خرابی با موفقیت ثبت شد.");
    setForm({
      siteId: "",
      deskId: "",
      problemType: "",
      priority: "medium",
      description: "",
      recurring: "no",
      contact: "",
    });
  };

  return (
    <>
      <Header
        title="ثبت گزارش خرابی"
        icon="fa-exclamation-triangle"
        action={
          <Link to={dashboardPath} className="btn btn-outline">
            <i className="fas fa-arrow-right" /> بازگشت به داشبورد
          </Link>
        }
        showDate={false}
      />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="site">سایت کامپیوتری</label>
            <select
              id="site"
              className="form-control"
              required
              value={form.siteId}
              onChange={(event) => setForm((prev) => ({ ...prev, siteId: event.target.value }))}
            >
              <option value="">لطفاً سایت را انتخاب کنید</option>
              {mockData.sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="desk">شماره میز (اختیاری)</label>
            <input
              type="text"
              id="desk"
              className="form-control"
              placeholder="مثال: A-12, B-05"
              value={form.deskId}
              onChange={(event) => setForm((prev) => ({ ...prev, deskId: event.target.value }))}
            />
            <small className="form-text text-muted">
              در صورتی که میز خاصی مشکل دارد، شماره آن را وارد کنید
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="problemType">نوع مشکل</label>
            <select
              id="problemType"
              className="form-control"
              required
              value={form.problemType}
              onChange={(event) => setForm((prev) => ({ ...prev, problemType: event.target.value }))}
            >
              <option value="">انتخاب کنید</option>
              <option value="hardware">سخت‌افزاری (مانیتور، کیس، موس و ...)</option>
              <option value="software">نرم‌افزاری (برنامه اجرا نمی‌شود، خطا می‌دهد)</option>
              <option value="network">مشکل شبکه (اینترنت، اتصال شبکه)</option>
              <option value="power">مشکل برق (سیستم روشن نمی‌شود)</option>
              <option value="other">سایر مشکلات</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">اولویت</label>
            <select
              id="priority"
              className="form-control"
              required
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
            >
              <option value="low">پایین (مشکل جزئی)</option>
              <option value="medium">متوسط (مشکل قابل تحمل)</option>
              <option value="high">بالا (سیستم غیرقابل استفاده)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">شرح دقیق مشکل</label>
            <textarea
              id="description"
              className="form-control"
              rows={5}
              placeholder="مشکل را به طور دقیق شرح دهید. لطفاً مراحلی که منجر به بروز مشکل شده و پیام خطا (در صورت وجود) را بنویسید."
              required
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>آیا این مشکل قبلاً هم اتفاق افتاده؟</label>
            <div style={{ marginTop: "10px" }}>
              <label style={{ marginLeft: "20px" }}>
                <input
                  type="radio"
                  name="recurring"
                  value="yes"
                  checked={form.recurring === "yes"}
                  onChange={(event) => setForm((prev) => ({ ...prev, recurring: event.target.value }))}
                />
                بله
              </label>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  name="recurring"
                  value="no"
                  checked={form.recurring === "no"}
                  onChange={(event) => setForm((prev) => ({ ...prev, recurring: event.target.value }))}
                />
                خیر
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact">راه تماس با شما (اختیاری)</label>
            <input
              type="text"
              id="contact"
              className="form-control"
              placeholder="ایمیل یا شماره تماس"
              value={form.contact}
              onChange={(event) => setForm((prev) => ({ ...prev, contact: event.target.value }))}
            />
            <small className="form-text text-muted">در صورت نیاز به اطلاعات بیشتر با شما تماس گرفته می‌شود</small>
          </div>

          <div className="form-group" style={{ marginTop: "30px" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              <i className="fas fa-paper-plane" /> ارسال گزارش خرابی
            </button>
          </div>

          <div className="alert alert-info">
            <i className="fas fa-info-circle" />
            <strong>توجه:</strong> گزارش خرابی شما پس از ثبت، توسط تیم پشتیبانی بررسی خواهد شد. شما می‌توانید وضعیت گزارش
            خود را در داشبورد پیگیری کنید.
          </div>
        </form>
      </div>

      <div className="table-container" style={{ marginTop: "40px" }}>
        <div className="table-header">
          <h3>
            <i className="fas fa-question-circle" /> راهنمای ثبت گزارش خرابی
          </h3>
        </div>
        <div className="content-padding">
          <div className="form-row">
            <div className="form-group">
              <div className="guide-card">
                <i className="fas fa-desktop fa-2x" style={{ color: "#3498db" }} />
                <h4>مشکلات سخت‌افزاری</h4>
                <p>مانیتور روشن نمی‌شود، صدا ندارد، سیستم هنگ می‌کند، موس یا کیبورد کار نمی‌کند</p>
              </div>
            </div>

            <div className="form-group">
              <div className="guide-card">
                <i className="fas fa-cogs fa-2x" style={{ color: "#27ae60" }} />
                <h4>مشکلات نرم‌افزاری</h4>
                <p>برنامه اجرا نمی‌شود، خطا می‌دهد، به روزرسانی نیاز دارد، حذف شده است</p>
              </div>
            </div>

            <div className="form-group">
              <div className="guide-card">
                <i className="fas fa-wifi fa-2x" style={{ color: "#f39c12" }} />
                <h4>مشکلات شبکه</h4>
                <p>اینترنت وصل نیست، سرعت پایین است، سایت‌های خاصی باز نمی‌شوند</p>
              </div>
            </div>
          </div>

          <div className="notice-card">
            <h5>
              <i className="fas fa-lightbulb" /> نکات مهم:
            </h5>
            <ul>
              <li>لطفاً مشکل را به طور دقیق و واضح شرح دهید.</li>
              <li>در صورت وجود پیام خطا، آن را عیناً در گزارش ذکر کنید.</li>
              <li>اگر میز خاصی مشکل دارد، حتماً شماره آن را بنویسید.</li>
              <li>گزارشات با اولویت بالا برای مشکلات جدی است (سیستم کاملاً غیرقابل استفاده).</li>
              <li>پس از ثبت گزارش، می‌توانید وضعیت آن را در داشبورد پیگیری کنید.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
