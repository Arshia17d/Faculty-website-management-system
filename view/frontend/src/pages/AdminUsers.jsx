import React, { useState } from "react";
import { users } from "../data/mockData";

const tabConfig = [
  { id: "users-list", label: "لیست کاربران" },
  { id: "add-user", label: "افزودن کاربر" },
  { id: "roles-management", label: "مدیریت نقش‌ها" },
];

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("users-list");

  return (
    <>
      <div className="content-header">
        <h2>
          <i className="fas fa-users" /> مدیریت کاربران و نقش‌ها
        </h2>
        <a href="/admin/dashboard" className="btn btn-outline">
          <i className="fas fa-arrow-right" /> بازگشت به داشبورد
        </a>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-graduate" />
          </div>
          <div className="stat-info">
            <h3>۸۵۰</h3>
            <p>دانشجو</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chalkboard-teacher" />
          </div>
          <div className="stat-info">
            <h3>۴۲</h3>
            <p>استاد</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-cog" />
          </div>
          <div className="stat-info">
            <h3>۵</h3>
            <p>ادمین</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-clock" />
          </div>
          <div className="stat-info">
            <h3>۱۲</h3>
            <p>کاربران غیرفعال</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <div style={{ borderBottom: "1px solid #ddd" }}>
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`user-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "users-list" && (
        <div className="user-tab-content active">
          <div className="table-container">
            <div className="table-header">
              <h3>
                <i className="fas fa-list" /> لیست کاربران سیستم
              </h3>
              <div>
                <button className="btn btn-primary">
                  <i className="fas fa-file-export" /> خروجی Excel
                </button>
                <button className="btn btn-outline" style={{ marginRight: "10px" }}>
                  <i className="fas fa-filter" /> فیلتر
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>شناسه کاربری</th>
                  <th>نام</th>
                  <th>نقش</th>
                  <th>دانشکده/دپارتمان</th>
                  <th>وضعیت</th>
                  <th>آخرین ورود</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                    <td>
                      <span className="status-badge status-approved">{user.status}</span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <button className="btn btn-outline btn-sm">ویرایش</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "add-user" && (
        <div className="user-tab-content active">
          <div className="form-container">
            <h3>
              <i className="fas fa-user-plus" /> افزودن کاربر جدید
            </h3>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="newUserId">شناسه کاربری</label>
                  <input type="text" id="newUserId" className="form-control" required />
                  <small className="form-text text-muted">
                    برای دانشجو: شماره دانشجویی، برای استاد: شناسه کارمندی
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="newUserFullName">نام کامل</label>
                  <input type="text" id="newUserFullName" className="form-control" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="newUserRole">نقش کاربر</label>
                  <select id="newUserRole" className="form-control" required>
                    <option value="">انتخاب کنید</option>
                    <option value="student">دانشجو</option>
                    <option value="professor">استاد</option>
                    <option value="admin">ادمین</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="newUserFaculty">دانشکده / دپارتمان</label>
                  <input type="text" id="newUserFaculty" className="form-control" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="newUserEmail">ایمیل</label>
                  <input type="email" id="newUserEmail" className="form-control" required />
                </div>

                <div className="form-group">
                  <label htmlFor="newUserPhone">شماره تماس</label>
                  <input type="tel" id="newUserPhone" className="form-control" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="newUserPassword">رمز عبور</label>
                  <input type="password" id="newUserPassword" className="form-control" required />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">تکرار رمز عبور</label>
                  <input type="password" id="confirmPassword" className="form-control" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="newUserNotes">توضیحات (اختیاری)</label>
                <textarea id="newUserNotes" className="form-control" rows="3" />
              </div>

              <div className="form-group" style={{ marginTop: "30px" }}>
                <button type="submit" className="btn btn-success" style={{ width: "100%", padding: "12px" }}>
                  <i className="fas fa-save" /> ایجاد حساب کاربری
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "roles-management" && (
        <div className="user-tab-content active">
          <div className="table-container">
            <div className="table-header">
              <h3>
                <i className="fas fa-user-tag" /> نقش‌های دسترسی
              </h3>
              <button className="btn btn-primary">
                <i className="fas fa-plus" /> افزودن نقش جدید
              </button>
            </div>
            <div style={{ padding: "20px" }}>
              <div className="roles-grid">
                <div className="role-card">
                  <div className="role-card-header">
                    <h4>دانشجو</h4>
                    <span className="status-badge status-approved">پیش‌فرض</span>
                  </div>
                  <p>دسترسی به رزرو میز، گزارش خرابی و مشاهده اعلان‌ها</p>
                  <div className="role-permissions">
                    <strong>مجوزها:</strong>
                    <ul>
                      <li>رزرو میز کامپیوتر</li>
                      <li>ثبت گزارش خرابی</li>
                      <li>مشاهده اعلان‌ها</li>
                      <li>مشاهده تاریخچه رزروها</li>
                    </ul>
                  </div>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-edit" /> ویرایش نقش
                  </button>
                </div>

                <div className="role-card">
                  <div className="role-card-header">
                    <h4>استاد</h4>
                    <span className="status-badge status-pending">پیش‌فرض</span>
                  </div>
                  <p>دسترسی به رزرو سایت، گزارش خرابی و مشاهده اعلان‌ها</p>
                  <div className="role-permissions">
                    <strong>مجوزها:</strong>
                    <ul>
                      <li>رزرو سایت برای کلاس</li>
                      <li>ثبت گزارش خرابی</li>
                      <li>مشاهده اعلان‌ها</li>
                      <li>مشاهده تاریخچه رزروها</li>
                      <li>مشاهده لیست دانشجویان</li>
                    </ul>
                  </div>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-edit" /> ویرایش نقش
                  </button>
                </div>

                <div className="role-card">
                  <div className="role-card-header">
                    <h4>ادمین</h4>
                    <span className="status-badge status-dark">پیش‌فرض</span>
                  </div>
                  <p>دسترسی کامل به تمام بخش‌های سیستم</p>
                  <div className="role-permissions">
                    <strong>مجوزها:</strong>
                    <ul>
                      <li>مدیریت تمام رزروها</li>
                      <li>مدیریت گزارشات خرابی</li>
                      <li>مدیریت نرم‌افزارها</li>
                      <li>مدیریت کاربران و نقش‌ها</li>
                      <li>ایجاد و مدیریت اعلان‌ها</li>
                      <li>مشاهده گزارشات و آمار</li>
                    </ul>
                  </div>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-edit" /> ویرایش نقش
                  </button>
                </div>

                <div className="role-card">
                  <div className="role-card-header">
                    <h4>ادمین محدود</h4>
                    <span className="status-badge status-warning">سفارشی</span>
                  </div>
                  <p>دسترسی محدود به بخش‌های خاصی از سیستم</p>
                  <div className="role-permissions">
                    <strong>مجوزها:</strong>
                    <ul>
                      <li>مدیریت رزروها</li>
                      <li>مدیریت گزارشات خرابی</li>
                      <li>مشاهده اعلان‌ها</li>
                      <li>مشاهده گزارشات</li>
                    </ul>
                  </div>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-edit" /> ویرایش نقش
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="table-container" style={{ marginTop: "30px" }}>
            <div className="table-header">
              <h3>
                <i className="fas fa-key" /> مجوزهای سیستم
              </h3>
            </div>
            <div style={{ padding: "20px" }}>
              <div className="form-row">
                <div className="form-group">
                  <div className="permission-box">
                    <h5>مجوزهای رزرواسیون</h5>
                    <div className="permission-list">
                      <label>
                        <input type="checkbox" defaultChecked /> ایجاد رزرو
                      </label>
                      <label>
                        <input type="checkbox" defaultChecked /> ویرایش رزرو
                      </label>
                      <label>
                        <input type="checkbox" defaultChecked /> لغو رزرو
                      </label>
                      <label>
                        <input type="checkbox" /> تایید رزروهای دیگران
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="permission-box">
                    <h5>مجوزهای مدیریت</h5>
                    <div className="permission-list">
                      <label>
                        <input type="checkbox" /> مدیریت کاربران
                      </label>
                      <label>
                        <input type="checkbox" /> مدیریت نرم‌افزارها
                      </label>
                      <label>
                        <input type="checkbox" /> مدیریت سایت‌ها
                      </label>
                      <label>
                        <input type="checkbox" /> مشاهده گزارشات سیستم
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="permission-box">
                    <h5>مجوزهای اعلان</h5>
                    <div className="permission-list">
                      <label>
                        <input type="checkbox" defaultChecked /> مشاهده اعلان‌ها
                      </label>
                      <label>
                        <input type="checkbox" /> ایجاد اعلان
                      </label>
                      <label>
                        <input type="checkbox" /> ویرایش اعلان
                      </label>
                      <label>
                        <input type="checkbox" /> حذف اعلان
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "left", marginTop: "20px" }}>
                <button className="btn btn-primary">
                  <i className="fas fa-save" /> ذخیره تغییرات مجوزها
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
