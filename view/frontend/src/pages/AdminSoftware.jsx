import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SoftwarePicker from "../components/SoftwarePicker";
import { fetchSoftware } from "../services/softwareService";

export default function AdminSoftware() {
  const [software, setSoftware] = useState([]);
  const [activeTab, setActiveTab] = useState("software-list");
  const [selectedSoftware, setSelectedSoftware] = useState([]);

  useEffect(() => {
    fetchSoftware()
      .then(setSoftware)
      .catch(() => {});
  }, []);

  return (
    <div className="main-content">
      <Header title="مدیریت نرم‌افزارها" />

      <div style={{ marginBottom: "30px" }}>
        <div style={{ borderBottom: "1px solid #ddd" }}>
          <button
            className={`tab-btn ${activeTab === "software-list" ? "active" : ""}`}
            onClick={() => setActiveTab("software-list")}
            type="button"
          >
            لیست نرم‌افزارها
          </button>
          <button
            className={`tab-btn ${activeTab === "assign-software" ? "active" : ""}`}
            onClick={() => setActiveTab("assign-software")}
            type="button"
          >
            تخصیص به میزها
          </button>
        </div>
      </div>

      {activeTab === "software-list" && (
        <div className="table-container">
          <div className="table-header">
            <h3>نرم‌افزارهای موجود</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>نام نرم‌افزار</th>
                <th>نسخه</th>
                <th>کلید لایسنس</th>
              </tr>
            </thead>
            <tbody>
              {software.length === 0 ? (
                <tr>
                  <td colSpan={3}>اطلاعاتی در دسترس نیست.</td>
                </tr>
              ) : (
                software.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.version}</td>
                    <td>{item.licenseKey}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "assign-software" && (
        <div className="form-container">
          <h3>تخصیص نرم‌افزار به میز</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="selectSite">انتخاب سایت</label>
              <select id="selectSite" className="form-control">
                <option value="">سایت را انتخاب کنید</option>
                <option value="1">سایت کامپیوتر دانشکده فنی</option>
                <option value="2">آزمایشگاه مهندسی نرم‌افزار</option>
                <option value="3">مرکز کامپیوتر کتابخانه مرکزی</option>
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

          <SoftwarePicker
            options={software}
            selected={selectedSoftware}
            onAdd={(item) =>
              setSelectedSoftware((prev) =>
                prev.find((existing) => existing.id === item.id) ? prev : [...prev, item]
              )
            }
            onRemove={(id) => setSelectedSoftware((prev) => prev.filter((item) => item.id !== id))}
            label="نرم‌افزارهای نصب شده"
          />
        </div>
      )}
    </div>
  );
}
