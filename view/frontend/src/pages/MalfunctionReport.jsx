import React, { useState } from "react";
import { sites } from "../data/mockData";

export default function MalfunctionReport({ user }) {
  const [form, setForm] = useState({
    siteId: "",
    desk: "",
    problemType: "",
    priority: "medium",
    description: "",
    recurring: "no",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("گزارش خرابی با موفقیت ثبت شد.");
    setForm({
      siteId: "",
      desk: "",
      problemType: "",
      priority: "medium",
      description: "",
      recurring: "no",
      contact: "",
    });
  };

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-exclamation-triangle" /> ثبت گزارش خرابی
        </h2>
        <a
          href={user?.role === "professor" ? "/professor/dashboard" : "/student/dashboard"}
          className="btn btn-outline"
        >
          <i className="fas fa-arrow-right" /> بازگشت به داشبورد
        </a>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="site">سایت کامپیوتری</label>
            <select
              id="site"
              className="form-control"
              value={form.siteId}
              onChange={(event) => setForm((prev) => ({ ...prev, siteId: event.target.value }))}
              required
            >
              <option value="">لطفاً سایت را انتخاب کنید</option>
              {sites.map((site) => (
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
              value={form.desk}
              onChange={(event) => setForm((prev) => ({ ...prev, desk: event.target.value }))}
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
              value={form.problemType}
              onChange={(event) => setForm((prev) => ({ ...prev, problemType: event.target.value }))}
              required
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
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
              required
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
              rows="5"
              placeholder="مشکل را به طور دقیق شرح دهید. لطفاً مراحلی که منجر به بروز مشکل شده و پیام خطا (در صورت وجود) را بنویسید."
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              required
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
                />{" "}
                بله
              </label>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  name="recurring"
                  value="no"
                  checked={form.recurring === "no"}
                  onChange={(event) => setForm((prev) => ({ ...prev, recurring: event.target.value }))}
                />{" "}
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
            <small className="form-text text-muted">
              در صورت نیاز به اطلاعات بیشتر با شما تماس گرفته می‌شود
            </small>
          </div>

          {message && <p style={{ color: "#2c3e50" }}>{message}</p>}

          <div className="form-group" style={{ marginTop: "30px" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
              <i className="fas fa-paper-plane" /> ارسال گزارش خرابی
            </button>
          </div>

          <div
            className="alert alert-info"
            style={{ backgroundColor: "#e8f4fc", padding: "15px", borderRadius: "5px", marginTop: "20px" }}
          >
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
        <div style={{ padding: "20px" }}>
          <div className="form-row">
            <div className="form-group">
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <i className="fas fa-desktop fa-2x" style={{ color: "#3498db", marginBottom: "10px" }} />
                <h4>مشکلات سخت‌افزاری</h4>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  مانیتور روشن نمی‌شود، صدا ندارد، سیستم هنگ می‌کند، موس یا کیبورد کار نمی‌کند
                </p>
              </div>
            </div>

            <div className="form-group">
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <i className="fas fa-cogs fa-2x" style={{ color: "#27ae60", marginBottom: "10px" }} />
                <h4>مشکلات نرم‌افزاری</h4>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  برنامه اجرا نمی‌شود، خطا می‌دهد، به روزرسانی نیاز دارد، حذف شده است
                </p>
              </div>
            </div>

            <div className="form-group">
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <i className="fas fa-wifi fa-2x" style={{ color: "#f39c12", marginBottom: "10px" }} />
                <h4>مشکلات شبکه</h4>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  اینترنت وصل نیست، سرعت پایین است، سایت‌های خاصی باز نمی‌شوند
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#fef9e7",
              borderRight: "4px solid #f39c12",
              borderRadius: "5px",
            }}
          >
            <h5>
              <i className="fas fa-lightbulb" /> نکات مهم:
            </h5>
            <ul style={{ paddingRight: "20px", marginTop: "10px" }}>
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
