import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useNotification } from "../context/NotificationContext.jsx";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../services/userService";

export default function AdminUsers() {
  const { notify } = useNotification();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
      id: "",
      name: "",
      role: "student",
      faculty: "",
      department: "",
      accessLevel: "",
      status: "active",
    });

  useEffect(() => {
    let mounted = true;
    fetchUsers()
      .then((data) => {
        if (!mounted) return;
        setUsers(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch(() => {
        if (mounted) setError("دریافت کاربران ناموفق بود.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

   const openCreateModal = () => {
     setEditingUser(null);
     setForm({
       id: "",
       name: "",
       role: "student",
       faculty: "",
       department: "",
       accessLevel: "",
       status: "active",
     });
     setModalOpen(true);
   };

   const openEditModal = (user) => {
     setEditingUser(user);
     setForm({
       id: user.id,
       name: user.name,
       role: user.role,
       faculty: user.faculty ?? "",
       department: user.department ?? "",
       accessLevel: user.accessLevel ?? "",
       status: user.status ?? "active",
     });
     setModalOpen(true);
   };

   const handleSubmit = async (event) => {
     event.preventDefault();
     try {
       if (editingUser) {
         const updated = await updateUser(editingUser.id, {
           name: form.name,
           role: form.role,
           faculty: form.role === "student" ? form.faculty : null,
           department: form.role === "professor" ? form.department : null,
           accessLevel: form.role === "admin" ? form.accessLevel : null,
           status: form.status,
         });
         setUsers((prev) =>
           prev.map((item) => (item.id === updated.id ? updated : item))
         );
         notify("کاربر به‌روزرسانی شد");
       } else {
         const created = await createUser({
           id: form.id,
           name: form.name,
           role: form.role,
           faculty: form.role === "student" ? form.faculty : null,
           department: form.role === "professor" ? form.department : null,
           accessLevel: form.role === "admin" ? form.accessLevel : null,
           status: form.status,
         });
         setUsers((prev) => [...prev, created]);
         notify("کاربر جدید اضافه شد");
       }
       setModalOpen(false);
     } catch (submitError) {
       notify(submitError?.message || "ذخیره کاربر ناموفق بود.", "error");
     }
   };

   const handleDelete = async (userId) => {
     try {
       await deleteUser(userId);
       setUsers((prev) => prev.filter((item) => item.id !== userId));
       notify("کاربر حذف شد");
     } catch (deleteError) {
       notify(deleteError?.message || "حذف کاربر ناموفق بود.", "error");
     }
   };

   const handleToggleStatus = async (user) => {
     const nextStatus = user.status === "active" ? "inactive" : "active";
     try {
       const updated = await updateUser(user.id, { status: nextStatus });
       setUsers((prev) =>
         prev.map((item) => (item.id === updated.id ? updated : item))
       );
       notify("وضعیت کاربر تغییر کرد");
     } catch (toggleError) {
       notify(toggleError?.message || "تغییر وضعیت کاربر ناموفق بود.", "error");
     }
   };

  return (
    <>
      <Header
        title="مدیریت کاربران"
        icon="fa-users"
        action={
          <Link to="/admin/dashboard" className="btn btn-outline">
            <i className="fas fa-arrow-right" /> بازگشت به داشبورد
          </Link>
        }
        showDate={false}
      />

      <div className="table-container">
        {loading && (
          <div className="alert alert-info">در حال بارگذاری اطلاعات...</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-header">
          <h3>
            <i className="fas fa-users" /> لیست کاربران
          </h3>
          <button
            type="button"
            className="btn btn-primary"
            onClick={openCreateModal}
          >
            <i className="fas fa-user-plus" /> افزودن کاربر
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>نقش</th>
              <th>اطلاعات تکمیلی</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const roleBadge =
                user.role === "admin"
                  ? { label: "ادمین", className: "status-admin" }
                  : user.role === "professor"
                  ? { label: "استاد", className: "status-professor" }
                  : { label: "دانشجو", className: "status-student" };

              const extraInfo =
                user.role === "student"
                  ? user.faculty
                  : user.role === "professor"
                  ? user.department
                  : user.accessLevel === "full"
                  ? "دسترسی کامل"
                  : "دسترسی محدود";

              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <span className={`status-badge ${roleBadge.className}`}>
                      {roleBadge.label}
                    </span>
                  </td>
                  <td>{extraInfo}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        user.status === "active"
                          ? "status-approved"
                          : "status-rejected"
                      }`}
                    >
                      {user.status === "active" ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => openEditModal(user)}
                    >
                      ویرایش
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleToggleStatus(user)}
                    >
                      {user.status === "active" ? "غیرفعال" : "فعال"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        title={editingUser ? "ویرایش کاربر" : "افزودن کاربر جدید"}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setModalOpen(false)}
            >
              انصراف
            </button>
            <button type="submit" form="user-form" className="btn btn-primary">
              ذخیره
            </button>
          </>
        }
      >
        <form id="user-form" onSubmit={handleSubmit}>
          {!editingUser && (
            <div className="form-group">
              <label htmlFor="userId">شناسه</label>
              <input
                id="userId"
                className="form-control"
                value={form.id}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, id: event.target.value }))
                }
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="userName">نام</label>
            <input
              id="userName"
              className="form-control"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userRole">نقش</label>
            <select
              id="userRole"
              className="form-control"
              value={form.role}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, role: event.target.value }))
              }
            >
              <option value="student">دانشجو</option>
              <option value="professor">استاد</option>
              <option value="admin">ادمین</option>
            </select>
          </div>
          {form.role === "student" && (
            <div className="form-group">
              <label htmlFor="userFaculty">دانشکده</label>
              <input
                id="userFaculty"
                className="form-control"
                value={form.faculty}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, faculty: event.target.value }))
                }
              />
            </div>
          )}
          {form.role === "professor" && (
            <div className="form-group">
              <label htmlFor="userDepartment">گروه آموزشی</label>
              <input
                id="userDepartment"
                className="form-control"
                value={form.department}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    department: event.target.value,
                  }))
                }
              />
            </div>
          )}
          {form.role === "admin" && (
            <div className="form-group">
              <label htmlFor="userAccess">سطح دسترسی</label>
              <input
                id="userAccess"
                className="form-control"
                value={form.accessLevel}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    accessLevel: event.target.value,
                  }))
                }
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="userStatus">وضعیت</label>
            <select
              id="userStatus"
              className="form-control"
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, status: event.target.value }))
              }
            >
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
}
