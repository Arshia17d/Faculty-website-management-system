import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { fetchSites } from "../services/siteService";
import { fetchSoftware } from "../services/softwareService";

const tabs = [
  { id: "software-list", label: "لیست نرم‌افزارها" },
  { id: "assign-software", label: "تخصیص به میزها" },
  { id: "site-software", label: "نرم‌افزارهای سایت" },
];

export default function AdminSoftware() {
  const [activeTab, setActiveTab] = useState("software-list");
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [softwareList, setSoftwareList] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { notify } = useNotification();

  const currentSoftwareTags = useMemo(
    () => selectedSoftware.filter(Boolean),
    [selectedSoftware]
  );

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchSoftware(), fetchSites()])
      .then(([softwareData, sitesData]) => {
        if (!mounted) return;
        setSoftwareList(Array.isArray(softwareData) ? softwareData : []);
        setSites(Array.isArray(sitesData) ? sitesData : []);
        setError("");
      })
      .catch(() => {
        if (mounted) setError("دریافت اطلاعات نرم افزارها ناموفق بود.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Header
        title="مدیریت نرم‌افزارها"
        icon="fa-cogs"
        action={
          <Link to="/admin/dashboard" className="btn btn-outline">
            <i className="fas fa-arrow-right" /> بازگشت به داشبورد
          </Link>
        }
        showDate={false}
      />

      <div style={{ marginBottom: "30px" }}>
        <div style={{ borderBottom: "1px solid #ddd" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "software-list" && (
        <div className="table-container">
          {loading && <div className="alert alert-info">در حال بارگذاری اطلاعات...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="table-header">
            <h3>
              <i className="fas fa-boxes" /> نرم‌افزارهای موجود
            </h3>
            <button type="button" className="btn btn-primary">
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
              {softwareList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.version}</td>
                  <td>{item.licenseKey}</td>
                  <td>{item.installedAt}</td>
                  <td>{item.desksCount}</td>
                  <td>
                    <button type="button" className="btn btn-warning btn-sm">
                      ویرایش
                    </button>
                    <button type="button" className="btn btn-danger btn-sm">
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "assign-software" && (
        <>
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
                <select id="selectDesk" className="form-control" defaultValue="" disabled>
                  <option value="">ابتدا سایت را انتخاب کنید</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>نرم‌افزارهای نصب شده روی این میز</label>
              <div className="software-tags software-picker">
                {currentSoftwareTags.map((software) => (
                  <span key={software.id} className="software-tag">
                    {software.name} {software.version}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSoftware((prev) => prev.filter((item) => item.id !== software.id))
                      }
                    >
                      <i className="fas fa-times" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addSoftwareToDesk">افزودن نرم‌افزار جدید</label>
              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <select
                    id="addSoftwareToDesk"
                    className="form-control"
                    defaultValue=""
                    onChange={(event) => {
                      const id = Number(event.target.value);
                      const software = softwareList.find((item) => item.id === id);
                      if (software && !selectedSoftware.some((item) => item.id === id)) {
                        setSelectedSoftware((prev) => [...prev, software]);
                      }
                      event.target.value = "";
                    }}
                  >
                    <option value="">نرم‌افزار را انتخاب کنید</option>
                    {softwareList.map((software) => (
                      <option key={software.id} value={software.id}>
                        {software.name} {software.version}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => notify("نرم‌افزار با موفقیت اضافه شد")}
                  >
                    <i className="fas fa-plus" /> افزودن
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "30px" }}>
              <button type="button" className="btn btn-success" style={{ width: "100%", padding: "12px" }}>
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
                  <td colSpan={5}>اطلاعات میزها هنوز ثبت نشده است.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "site-software" && (
        <div className="table-container">
          <div className="table-header">
            <h3>
              <i className="fas fa-sitemap" /> نرم‌افزارهای هر سایت
            </h3>
          </div>
          <div className="content-padding">
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
                      {site.software.map((software) => (
                        <span key={software} className="software-tag">
                          {software}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <button type="button" className="btn btn-outline btn-sm">
                        <i className="fas fa-edit" /> ویرایش نرم‌افزارها
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
