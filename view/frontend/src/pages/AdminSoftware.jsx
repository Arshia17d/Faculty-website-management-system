import React, { useEffect, useState } from "react";
import { fetchSoftware } from "../services/softwareService";
import { sites } from "../data/mockData";

export default function AdminSoftware() {
  const [software, setSoftware] = useState([]);
  const [activeTab, setActiveTab] = useState("software-list");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSoftware()
      .then(setSoftware)
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-cogs" /> مدیریت نرم‌افزارها
        </h2>
        <a href="/admin/dashboard" className="btn btn-outline">
          <i className="fas fa-arrow-right" /> بازگشت به داشبورد
        </a>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <div style={{ borderBottom: "1px solid #ddd" }}>
          <button
            className={`tab-btn ${activeTab === "software-list" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("software-list")}
          >
            لیست نرم‌افزارها
          </button>
          <button
            className={`tab-btn ${activeTab === "assign-software" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("assign-software")}
          >
            تخصیص به میزها
          </button>
          <button
            className={`tab-btn ${activeTab === "site-software" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("site-software")}
          >
            نرم‌افزارهای سایت
          </button>
        </div>
      </div>

      {activeTab === "software-list" && (
        <div className="table-container">
          <div className="table-header">
            <h3>
              <i className="fas fa-boxes" /> نرم‌افزارهای موجود
            </h3>
            <button className="btn btn-primary" type="button" onClick={() => setShowModal(true)}>
              <i className="fas fa-plus" /> افزودن نرم‌افزار جدید
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>نام نرم‌افزار</th>
                <th>نسخه</th>
                <th>کلید لایسنس</th>
                <th>تاریخ نصب</th>
                <th>تعداد میزهای نصب شده</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {software.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.version}</td>
                  <td>{item.licenseKey}</td>
                  <td>1403/01/10</td>
                  <td>12</td>
                  <td>
                    <button className="btn btn-outline btn-sm">ویرایش</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "assign-software" && (
        <div className="tab-content active">
          <div className="form-container">
            <h3>
              <i className="fas fa-desktop" /> تخصیص نرم‌افزار به میز
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="selectSiteForDesk">انتخاب سایت</label>
                <select id="selectSiteForDesk" className="form-control">
                  <option value="">لطفاً سایت را انتخاب کنید</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="selectDesk">انتخاب میز</label>
                <select id="selectDesk" className="form-control">
                  <option value="">میز را انتخاب کنید</option>
                  <option value="A-01">A-01</option>
                  <option value="A-02">A-02</option>
                  <option value="A-03">A-03</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>نرم‌افزارهای نصب شده روی این میز</label>
              <div className="software-tags software-picker">
                <span className="software-tag">
                  Python 3.11 <button type="button"><i className="fas fa-times" /></button>
                </span>
                <span className="software-tag">
                  VS Code 1.78 <button type="button"><i className="fas fa-times" /></button>
                </span>
                <span className="software-tag">
                  Office 2021 <button type="button"><i className="fas fa-times" /></button>
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addSoftwareToDesk">افزودن نرم‌افزار جدید</label>
              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <select id="addSoftwareToDesk" className="form-control">
                    <option value="">نرم‌افزار را انتخاب کنید</option>
                    {software.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} {item.version}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <button className="btn btn-primary" type="button" style={{ width: "100%" }}>
                    <i className="fas fa-plus" /> افزودن
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "30px" }}>
              <button className="btn btn-success" type="button" style={{ width: "100%", padding: "12px" }}>
                <i className="fas fa-save" /> ذخیره تغییرات
              </button>
            </div>
          </div>

          <div className="table-container" style={{ marginTop: "40px" }}>
            <div className="table-header">
              <h3>
                <i className="fas fa-list" /> میزها و نرم‌افزارهای نصب شده
              </h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>سایت</th>
                  <th>شماره میز</th>
                  <th>وضعیت</th>
                  <th>نرم‌افزارهای نصب شده</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>سایت دانشکده فنی</td>
                  <td>A-12</td>
                  <td>
                    <span className="status-badge status-free">آزاد</span>
                  </td>
                  <td>
                    <span className="software-tag">Python</span>
                    <span className="software-tag">MATLAB</span>
                    <span className="software-tag">VS Code</span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm">ویرایش</button>
                  </td>
                </tr>
                <tr>
                  <td>آزمایشگاه نرم‌افزار</td>
                  <td>B-05</td>
                  <td>
                    <span className="status-badge status-occupied">اشغال</span>
                  </td>
                  <td>
                    <span className="software-tag">Java</span>
                    <span className="software-tag">IntelliJ</span>
                    <span className="software-tag">Docker</span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm">ویرایش</button>
                  </td>
                </tr>
                <tr>
                  <td>مرکز کتابخانه</td>
                  <td>C-08</td>
                  <td>
                    <span className="status-badge status-under-repair">تعمیر</span>
                  </td>
                  <td>
                    <span className="software-tag">Office</span>
                    <span className="software-tag">Python</span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm">ویرایش</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "site-software" && (
        <div className="tab-content active">
          <div className="table-container">
            <div className="table-header">
              <h3>
                <i className="fas fa-sitemap" /> نرم‌افزارهای هر سایت
              </h3>
            </div>
            <div style={{ padding: "20px" }}>
              <div className="sites-grid">
                {sites.map((site) => (
                  <div key={site.id} className="site-card">
                    <div className="site-header">
                      <h3>{site.name}</h3>
                    </div>
                    <div className="site-body">
                      <p>
                        <strong>نرم‌افزارهای پیش‌فرض:</strong>
                      </p>
                      <div className="software-tags">
                        {site.software.map((softwareItem) => (
                          <span key={softwareItem} className="software-tag">
                            {softwareItem}
                          </span>
                        ))}
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <button className="btn btn-outline btn-sm">
                          <i className="fas fa-edit" /> ویرایش نرم‌افزارها
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-plus" /> افزودن نرم‌افزار جدید
              </h3>
              <button type="button" className="close-modal" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="softwareName">نام نرم‌افزار</label>
                  <input type="text" id="softwareName" className="form-control" required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="softwareVersion">نسخه</label>
                    <input type="text" id="softwareVersion" className="form-control" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="softwareLicense">کلید لایسنس</label>
                    <input type="text" id="softwareLicense" className="form-control" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="softwareDescription">توضیحات (اختیاری)</label>
                  <textarea id="softwareDescription" className="form-control" rows="3" />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-success" style={{ width: "100%" }}>
                    <i className="fas fa-save" /> ذخیره نرم‌افزار
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
