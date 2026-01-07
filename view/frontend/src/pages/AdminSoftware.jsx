import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useNotification } from "../context/NotificationContext.jsx";
import {
  fetchSiteDesks,
  fetchSites,
  updateSiteSoftware,
} from "../services/siteService";
import { updateDeskSoftware } from "../services/deskService";
import {
  createSoftware,
  deleteSoftware,
  fetchSoftware,
  updateSoftware,
} from "../services/softwareService";

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
  const [desks, setDesks] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [selectedDeskId, setSelectedDeskId] = useState("");
  const [softwareModalOpen, setSoftwareModalOpen] = useState(false);
  const [siteSoftwareModalOpen, setSiteSoftwareModalOpen] = useState(false);
  const [softwareForm, setSoftwareForm] = useState({
    name: "",
    version: "",
    licenseKey: "",
    installedAt: "",
  });
  const [editingSoftware, setEditingSoftware] = useState(null);
  const [editingSite, setEditingSite] = useState(null);
  const [siteSoftwareSelection, setSiteSoftwareSelection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { notify } = useNotification();

  const currentSoftwareTags = useMemo(
    () => selectedSoftware.filter(Boolean),
    [selectedSoftware]
  );

  useEffect(() => {
    if (!selectedDeskId) {
      setSelectedSoftware([]);
      return;
    }
    const desk = desks.find((item) => item.id === Number(selectedDeskId));
    if (desk) {
      setSelectedSoftware(desk.software ?? []);
    }
  }, [desks, selectedDeskId]);

  const openCreateModal = () => {
    setEditingSoftware(null);
    setSoftwareForm({ name: "", version: "", licenseKey: "", installedAt: "" });
    setSoftwareModalOpen(true);
  };

  const openEditModal = (software) => {
    setEditingSoftware(software);
    setSoftwareForm({
      name: software.name,
      version: software.version,
      licenseKey: software.licenseKey,
      installedAt: software.installedAt || "",
    });
    setSoftwareModalOpen(true);
  };

  const handleSaveSoftware = async (event) => {
    event.preventDefault();
    try {
      if (editingSoftware) {
        const updated = await updateSoftware(editingSoftware.id, softwareForm);
        setSoftwareList((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        notify("نرم‌افزار به‌روزرسانی شد");
      } else {
        const created = await createSoftware(softwareForm);
        setSoftwareList((prev) => [...prev, created]);
        notify("نرم‌افزار جدید اضافه شد");
      }
      setSoftwareModalOpen(false);
    } catch (error) {
      notify(error?.message || "ذخیره نرم‌افزار ناموفق بود.", "error");
    }
  };

  const handleDeleteSoftware = async (softwareId) => {
    try {
      await deleteSoftware(softwareId);
      setSoftwareList((prev) => prev.filter((item) => item.id !== softwareId));
      notify("نرم‌افزار حذف شد");
    } catch (error) {
      notify(error?.message || "حذف نرم‌افزار ناموفق بود.", "error");
    }
  };

  const handleDeskSave = async () => {
    if (!selectedDeskId) {
      notify("لطفاً میز را انتخاب کنید.", "error");
      return;
    }
    try {
      const softwareIds = selectedSoftware.map((item) => item.id);
      const updated = await updateDeskSoftware(selectedDeskId, softwareIds);
      setDesks((prev) =>
        prev.map((desk) => (desk.id === updated.id ? updated : desk))
      );
      notify("نرم‌افزارهای میز ذخیره شد");
    } catch (error) {
      notify(error?.message || "ذخیره تغییرات میز ناموفق بود.", "error");
    }
  };

  const openSiteSoftwareModal = (site) => {
    setEditingSite(site);
    setSiteSoftwareSelection(site.software ?? []);
    setSiteSoftwareModalOpen(true);
  };

  const handleSaveSiteSoftware = async () => {
    if (!editingSite) return;
    try {
      const updated = await updateSiteSoftware(
        editingSite.id,
        siteSoftwareSelection
      );
      setSites((prev) =>
        prev.map((site) => (site.id === updated.id ? updated : site))
      );
      notify("نرم‌افزارهای سایت به‌روزرسانی شد");
      setSiteSoftwareModalOpen(false);
    } catch (error) {
      notify(
        error?.message || "به‌روزرسانی نرم‌افزارهای سایت ناموفق بود.",
        "error"
      );
    }
  };

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

  useEffect(() => {
    if (!selectedSiteId) {
      setDesks([]);
      setSelectedDeskId("");
      setSelectedSoftware([]);
      return;
    }
    fetchSiteDesks(selectedSiteId)
      .then((data) => {
        setDesks(Array.isArray(data) ? data : []);
        setSelectedDeskId("");
        setSelectedSoftware([]);
      })
      .catch(() => {
        notify("دریافت میزهای سایت ناموفق بود.", "error");
      });
  }, [notify, selectedSiteId]);

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
          {loading && (
            <div className="alert alert-info">در حال بارگذاری اطلاعات...</div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="table-header">
            <h3>
              <i className="fas fa-boxes" /> نرم‌افزارهای موجود
            </h3>
            <button
              type="button"
              className="btn btn-primary"
              onClick={openCreateModal}
            >
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
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => openEditModal(item)}
                    >
                      ویرایش
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteSoftware(item.id)}
                    >
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
                <select
                  id="selectSiteForDesk"
                  className="form-control"
                  value={selectedSiteId}
                  onChange={(event) => setSelectedSiteId(event.target.value)}
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
                <label htmlFor="selectDesk">انتخاب میز</label>
                <select
                  id="selectDesk"
                  className="form-control"
                  value={selectedDeskId}
                  onChange={(event) => setSelectedDeskId(event.target.value)}
                  disabled={!selectedSiteId}
                >
                  <option value="">ابتدا سایت را انتخاب کنید</option>
                  {desks.map((desk) => (
                    <option key={desk.id} value={desk.id}>
                      {desk.label}
                    </option>
                  ))}
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
                        setSelectedSoftware((prev) =>
                          prev.filter((item) => item.id !== software.id)
                        )
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
                      const software = softwareList.find(
                        (item) => item.id === id
                      );
                      if (
                        software &&
                        !selectedSoftware.some((item) => item.id === id)
                      ) {
                        setSelectedSoftware((prev) => [...prev, software]);
                      }
                      event.target.value = "";
                    }}
                    disabled={!selectedDeskId}
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
                    onClick={() => notify("نرم‌افزار به لیست اضافه شد")}
                    disabled={!selectedDeskId}
                  >
                    <i className="fas fa-plus" /> افزودن
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "30px" }}>
              <button
                type="button"
                className="btn btn-success"
                style={{ width: "100%", padding: "12px" }}
                onClick={handleDeskSave}
                disabled={!selectedDeskId}
              >
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
                </tr>
              </thead>
              <tbody>
                {desks.length === 0 ? (
                  <tr>
                    <td colSpan={4}>اطلاعات میزها هنوز ثبت نشده است.</td>
                  </tr>
                ) : (
                  desks.map((desk) => (
                    <tr key={desk.id}>
                      <td>
                        {sites.find(
                          (site) => site.id === Number(selectedSiteId)
                        )?.name ?? "-"}
                      </td>
                      <td>{desk.label}</td>
                      <td>{desk.status === "active" ? "فعال" : "غیرفعال"}</td>
                      <td>
                        {desk.software?.length
                          ? desk.software
                              .map(
                                (software) =>
                                  `${software.name} ${software.version}`
                              )
                              .join("، ")
                          : "بدون نرم‌افزار"}
                      </td>
                    </tr>
                  ))
                )}
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
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => openSiteSoftwareModal(site)}
                      >
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
      <Modal
        open={softwareModalOpen}
        title={editingSoftware ? "ویرایش نرم‌افزار" : "افزودن نرم‌افزار جدید"}
        onClose={() => setSoftwareModalOpen(false)}
        footer={
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setSoftwareModalOpen(false)}
            >
              انصراف
            </button>
            <button
              type="submit"
              form="software-form"
              className="btn btn-primary"
            >
              ذخیره
            </button>
          </>
        }
      >
        <form id="software-form" onSubmit={handleSaveSoftware}>
          <div className="form-group">
            <label htmlFor="softwareName">نام نرم‌افزار</label>
            <input
              id="softwareName"
              className="form-control"
              value={softwareForm.name}
              onChange={(event) =>
                setSoftwareForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="softwareVersion">نسخه</label>
            <input
              id="softwareVersion"
              className="form-control"
              value={softwareForm.version}
              onChange={(event) =>
                setSoftwareForm((prev) => ({
                  ...prev,
                  version: event.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="softwareLicense">کلید لایسنس</label>
            <input
              id="softwareLicense"
              className="form-control"
              value={softwareForm.licenseKey}
              onChange={(event) =>
                setSoftwareForm((prev) => ({
                  ...prev,
                  licenseKey: event.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="softwareInstalled">تاریخ نصب</label>
            <input
              id="softwareInstalled"
              className="form-control"
              value={softwareForm.installedAt}
              onChange={(event) =>
                setSoftwareForm((prev) => ({
                  ...prev,
                  installedAt: event.target.value,
                }))
              }
            />
          </div>
        </form>
      </Modal>

      <Modal
        open={siteSoftwareModalOpen}
        title={
          editingSite
            ? `ویرایش نرم‌افزارهای ${editingSite.name}`
            : "ویرایش نرم‌افزارها"
        }
        onClose={() => setSiteSoftwareModalOpen(false)}
        footer={
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setSiteSoftwareModalOpen(false)}
            >
              انصراف
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveSiteSoftware}
            >
              ذخیره
            </button>
          </>
        }
      >
        <div className="form-group">
          <label htmlFor="siteSoftwareSelect">نرم‌افزارهای سایت</label>
          <select
            id="siteSoftwareSelect"
            className="form-control"
            multiple
            style={{ height: "150px" }}
            value={siteSoftwareSelection}
            onChange={(event) =>
              setSiteSoftwareSelection(
                Array.from(
                  event.target.selectedOptions,
                  (option) => option.value
                )
              )
            }
          >
            {softwareList.map((software) => (
              <option key={software.id} value={software.name}>
                {software.name} {software.version}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            برای انتخاب چندگانه کلید Ctrl را نگه دارید
          </small>
        </div>
      </Modal>
    </>
  );
}
