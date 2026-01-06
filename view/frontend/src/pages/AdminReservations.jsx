import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useNotification } from "../context/NotificationContext.jsx";
import { fetchReservations, updateReservationStatus } from "../services/reservationService";
import { fetchSites } from "../services/siteService";

export default function AdminReservations() {
  const { notify } = useNotification();
  const [reservations, setReservations] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadData = () =>
      Promise.all([fetchReservations(), fetchSites()])
        .then(([reservationsData, sitesData]) => {
          if (!mounted) return;
          setReservations(Array.isArray(reservationsData) ? reservationsData : []);
          setSites(Array.isArray(sitesData) ? sitesData : []);
          setError("");
        })
        .catch(() => {
          if (mounted) setError("دریافت رزروها ناموفق بود.");
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });

    loadData();
    const intervalId = setInterval(loadData, 15000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const allReservations = useMemo(
    () =>
      reservations.map((item) => ({
        id: item.id,
        userName: `${item.userName} (${item.userId})`,
        siteName: item.siteName,
        date: item.date,
        time: `${item.startTime} - ${item.endTime}`,
        type: item.type === "student" ? "رزرو میز" : "رزرو سایت",
        status: item.status,
      })),
    [reservations]
  );

  const handleUpdateStatus = async (reservationId, status, message) => {
    try {
      await updateReservationStatus(reservationId, status);
      setReservations((prev) =>
        prev.map((item) => (item.id === reservationId ? { ...item, status } : item))
      );
      notify(message);
    } catch (error) {
      notify(error?.message || "به روز رسانی رزرو ناموفق بود.", "error");
    }
  };

  const stats = useMemo(() => {
    const total = reservations.length;
    const pending = reservations.filter((item) => item.status === "pending").length;
    const approved = reservations.filter((item) => item.status === "approved").length;
    const rejected = reservations.filter((item) => item.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [reservations]);

  return (
    <>
      <Header
        title="مدیریت رزروها"
        icon="fa-calendar-check"
        action={
          <Link to="/admin/dashboard" className="btn btn-outline">
            <i className="fas fa-arrow-right" /> بازگشت به داشبورد
          </Link>
        }
        showDate={false}
      />

      <div className="table-container">
        {loading && <div className="alert alert-info">در حال بارگذاری اطلاعات...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-header">
          <h3>
            <i className="fas fa-filter" /> فیلتر رزروها
          </h3>
        </div>
        <div className="content-padding">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="filterSite">سایت</label>
              <select id="filterSite" className="form-control">
                <option value="">همه سایت‌ها</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterDate">تاریخ</label>
              <input type="date" id="filterDate" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="filterStatus">وضعیت</label>
              <select id="filterStatus" className="form-control">
                <option value="">همه وضعیت‌ها</option>
                <option value="pending">در انتظار</option>
                <option value="approved">تایید شده</option>
                <option value="rejected">رد شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="filterType">نوع رزرو</label>
              <select id="filterType" className="form-control">
                <option value="">همه انواع</option>
                <option value="student">رزرو میز (دانشجو)</option>
                <option value="professor">رزرو سایت (استاد)</option>
              </select>
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
            <i className="fas fa-list" /> لیست رزروها
          </h3>
          <div>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-file-export" /> خروجی Excel
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>سایت</th>
              <th>تاریخ</th>
              <th>زمان</th>
              <th>نوع</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {allReservations.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.userName}</td>
                <td>{item.siteName}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.type}</td>
                <td>
                  <span
                    className={`status-badge ${
                      item.status === "approved"
                        ? "status-approved"
                        : item.status === "pending"
                        ? "status-pending"
                        : "status-rejected"
                    }`}
                  >
                    {item.status === "approved" ? "تایید شده" : item.status === "pending" ? "در انتظار" : "رد شده"}
                  </span>
                </td>
                <td>
                  {item.status === "pending" && (
                    <>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdateStatus(item.id, "approved", "رزرو با موفقیت تایید شد")}
                      >
                        تایید
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleUpdateStatus(item.id, "rejected", "رزرو رد شد")}
                      >
                        رد
                      </button>
                    </>
                  )}
                  {item.status === "approved" && (
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => handleUpdateStatus(item.id, "cancelled", "رزرو لغو شد")}
                    >
                      لغو
                    </button>
                  )}
                  <button type="button" className="btn btn-outline btn-sm">
                    جزئیات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <nav>
            <ul>
              <li>
                <a href="#" className="active">
                  ۱
                </a>
              </li>
              <li>
                <a href="#">۲</a>
              </li>
              <li>
                <a href="#">۳</a>
              </li>
              <li>
                <a href="#">بعدی</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>
            <i className="fas fa-chart-bar" /> آمار رزروها
          </h3>
        </div>
        <div className="content-padding">
          <div className="form-row">
            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#3498db" }}>
                {stats.total}
              </div>
              <div className="stat-label">رزرو امروز</div>
            </div>

            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#27ae60" }}>
                {stats.approved}
              </div>
              <div className="stat-label">رزرو این هفته</div>
            </div>

            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#f39c12" }}>
                {stats.rejected}
              </div>
              <div className="stat-label">رزرو این ماه</div>
            </div>

            <div className="stat-summary">
              <div className="stat-value" style={{ color: "#e74c3c" }}>
                {stats.pending}
              </div>
              <div className="stat-label">در انتظار تایید</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
