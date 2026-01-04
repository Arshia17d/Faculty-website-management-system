// داده‌های نمونه برای سیستم
const mockData = {
  // کاربران
  currentUser: null,

  // لیست کاربران مجاز
  validUsers: {
    98123456: {
      role: "student",
      name: "علی محمدی",
      faculty: "مهندسی کامپیوتر",
    },
    98234567: {
      role: "student",
      name: "فاطمه کریمی",
      faculty: "مهندسی نرم‌افزار",
    },
    "emp-1234": {
      role: "professor",
      name: "دکتر رضایی",
      department: "علوم کامپیوتر",
    },
    "emp-5678": {
      role: "professor",
      name: "دکتر حسینی",
      department: "مهندسی نرم‌افزار",
    },
    "admin-01": { role: "admin", name: "مدیر سیستم", accessLevel: "full" },
    admin: { role: "admin", name: "ادمین اصلی", accessLevel: "full" },
    test: { role: "student", name: "کاربر تست", faculty: "مهندسی کامپیوتر" },
  },

  // سایت‌های کامپیوتری
  sites: [
    {
      id: 1,
      name: "سایت کامپیوتر دانشکده فنی",
      location: "ساختمان اصلی، طبقه دوم",
      totalDesks: 40,
      freeDesks: 15,
      occupiedDesks: 20,
      reservedDesks: 3,
      underRepairDesks: 2,
      software: ["Python", "MATLAB", "VS Code", "Office", "Adobe CC"],
    },
    {
      id: 2,
      name: "آزمایشگاه مهندسی نرم‌افزار",
      location: "ساختمان علوم کامپیوتر، طبقه اول",
      totalDesks: 25,
      freeDesks: 8,
      occupiedDesks: 12,
      reservedDesks: 4,
      underRepairDesks: 1,
      software: ["Java", "IntelliJ", "Docker", "PostgreSQL", "Git"],
    },
    {
      id: 3,
      name: "مرکز کامپیوتر کتابخانه مرکزی",
      location: "کتابخانه مرکزی، طبقه همکف",
      totalDesks: 30,
      freeDesks: 10,
      occupiedDesks: 18,
      reservedDesks: 1,
      underRepairDesks: 1,
      software: ["Office", "Adobe Reader", "Python", "Visual Studio"],
    },
  ],

  // رزروها
  reservations: [
    {
      id: 1,
      userId: "98123456",
      userName: "علی محمدی",
      siteId: 1,
      siteName: "سایت کامپیوتر دانشکده فنی",
      deskId: "A-12",
      date: "1403/01/20",
      startTime: "10:00",
      endTime: "12:00",
      software: ["Python", "MATLAB"],
      status: "approved",
      type: "student",
    },
    {
      id: 2,
      userId: "98123456",
      userName: "علی محمدی",
      siteId: 2,
      siteName: "آزمایشگاه مهندسی نرم‌افزار",
      deskId: "B-05",
      date: "1403/01/22",
      startTime: "14:00",
      endTime: "16:00",
      software: ["Java", "Docker"],
      status: "pending",
      type: "student",
    },
    {
      id: 3,
      userId: "emp-1234",
      userName: "دکتر رضایی",
      siteId: 1,
      siteName: "سایت کامپیوتر دانشکده فنی",
      date: "1403/01/25",
      startTime: "08:00",
      endTime: "10:00",
      purpose: "کلاس مبانی برنامه‌نویسی",
      studentsCount: 35,
      status: "pending",
      type: "professor",
    },
  ],

  // گزارشات خرابی
  malfunctionReports: [
    {
      id: 1,
      userId: "98123456",
      userName: "علی محمدی",
      siteId: 1,
      siteName: "سایت کامپیوتر دانشکده فنی",
      deskId: "A-08",
      description: "مانیتور سیستم روشن نمی‌شود",
      priority: "high",
      date: "1403/01/15",
      status: "in-progress",
    },
    {
      id: 2,
      userId: "emp-1234",
      userName: "دکتر رضایی",
      siteId: 2,
      siteName: "آزمایشگاه مهندسی نرم‌افزار",
      deskId: "B-12",
      description: "سیستم هنگ می‌کند هنگام اجرای برنامه‌های سنگین",
      priority: "medium",
      date: "1403/01/16",
      status: "pending",
    },
  ],

  // نرم‌افزارها
  softwareList: [
    { id: 1, name: "Python", version: "3.11", licenseKey: "PYT-2023-001" },
    { id: 2, name: "MATLAB", version: "R2022b", licenseKey: "MAT-2022-045" },
    { id: 3, name: "VS Code", version: "1.78", licenseKey: "FREE" },
    { id: 4, name: "Office", version: "2021", licenseKey: "OFF-2021-123" },
    { id: 5, name: "Java", version: "JDK 17", licenseKey: "JAVA-17-001" },
    { id: 6, name: "IntelliJ", version: "2023.1", licenseKey: "INT-2023-012" },
    { id: 7, name: "Docker", version: "24.0", licenseKey: "DOCK-24-001" },
    { id: 8, name: "PostgreSQL", version: "15", licenseKey: "POST-15-001" },
  ],

  // اعلان‌ها
  announcements: [
    {
      id: 1,
      title: "تعمیرات سایت دانشکده فنی",
      content:
        "به اطلاع می‌رساند سایت کامپیوتر دانشکده فنی در تاریخ 1403/01/25 جهت تعمیرات سیستم‌های خنک‌کننده تعطیل خواهد بود.",
      priority: "high",
      date: "1403/01/20",
      createdBy: "ادمین سیستم",
    },
    {
      id: 2,
      title: "نصب نرم‌افزارهای جدید",
      content:
        "نرم‌افزارهای Python 3.11 و VS Code نسخه 1.78 روی تمام سیستم‌های سایت‌ها نصب شد.",
      priority: "medium",
      date: "1403/01/18",
      createdBy: "ادمین سیستم",
    },
  ],

  // کاربران سیستم
  users: [
    {
      id: "98123456",
      name: "علی محمدی",
      role: "student",
      faculty: "مهندسی کامپیوتر",
      status: "active",
    },
    {
      id: "98234567",
      name: "فاطمه کریمی",
      role: "student",
      faculty: "مهندسی نرم‌افزار",
      status: "active",
    },
    {
      id: "emp-1234",
      name: "دکتر رضایی",
      role: "professor",
      department: "علوم کامپیوتر",
      status: "active",
    },
    {
      id: "emp-5678",
      name: "دکتر حسینی",
      role: "professor",
      department: "مهندسی نرم‌افزار",
      status: "active",
    },
    {
      id: "admin-01",
      name: "مدیر سیستم",
      role: "admin",
      accessLevel: "full",
      status: "active",
    },
  ],
};

// نقش‌ها و مجوزهای سیستم
const rolePermissions = {
  student: {
    name: "دانشجو",
    permissions: [
      "view_dashboard",
      "make_reservation",
      "report_malfunction",
      "view_announcements",
      "view_own_reservations",
    ],
    accessiblePages: [
      "student-dashboard.html",
      "student-reservation.html",
      "malfunction-report.html",
      "announcements.html",
    ],
  },
  professor: {
    name: "استاد",
    permissions: [
      "view_dashboard",
      "make_site_reservation",
      "report_malfunction",
      "view_announcements",
      "view_own_reservations",
    ],
    accessiblePages: [
      "professor-dashboard.html",
      "professor-reservation.html",
      "malfunction-report.html",
      "announcements.html",
    ],
  },
  admin: {
    name: "ادمین",
    permissions: [
      "view_dashboard",
      "manage_all_reservations",
      "manage_reports",
      "manage_software",
      "manage_users",
      "manage_announcements",
      "view_system_reports",
    ],
    accessiblePages: [
      "admin-dashboard.html",
      "admin-reservations.html",
      "admin-reports.html",
      "admin-software.html",
      "admin-users.html",
      "announcements.html",
    ],
  },
};

// مدیریت وضعیت کاربر با RBAC
class UserManager {
  constructor() {
    const storedUser = localStorage.getItem("currentUser");
    try {
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    }
  }

  login(userId, password, role) {
    console.log("تلاش برای ورود با:", { userId, password, role });

    // تعیین نقش واقعی بر اساس شناسه کاربری
    let userRole = role;
    let userName = "کاربر سیستم";
    let additionalInfo = {};

    // شناسایی کاربر بر اساس شناسه
    if (userId.startsWith("98") && userId.length === 8) {
      userRole = "student";
      userName = "دانشجوی نمونه";
      additionalInfo = {
        faculty: "مهندسی کامپیوتر",
        studentNumber: userId,
      };
    } else if (userId.startsWith("emp-")) {
      userRole = "professor";
      userName = "استاد نمونه";
      additionalInfo = {
        department: "علوم کامپیوتر",
        employeeId: userId,
      };
    } else if (userId.includes("admin")) {
      userRole = "admin";
      userName = "ادمین سیستم";
      additionalInfo = {
        accessLevel: "full",
      };
    }

    // کاربران مشخص
    if (userId === "98123456") {
      userRole = "student";
      userName = "علی محمدی";
      additionalInfo = { faculty: "مهندسی کامپیوتر", studentNumber: userId };
    } else if (userId === "emp-1234") {
      userRole = "professor";
      userName = "دکتر رضایی";
      additionalInfo = { department: "علوم کامپیوتر", employeeId: userId };
    } else if (userId === "admin-01" || userId === "admin") {
      userRole = "admin";
      userName = "مدیر سیستم";
      additionalInfo = { accessLevel: "full" };
    }

    const user = {
      id: userId,
      name: userName,
      role: userRole,
      ...additionalInfo,
      permissions: rolePermissions[userRole].permissions,
    };

    this.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("ورود موفق:", user);
    return { success: true, user };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
    console.log("کاربر از سیستم خارج شد");
  }

  getLoginPath() {
    if (window.location.pathname.includes("/pages/")) {
      return "../index.html";
    }

    return "index.html";
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  hasPermission(permission) {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission);
  }

  canAccessPage(pageName) {
    if (!this.currentUser) return false;
    return rolePermissions[this.currentUser.role].accessiblePages.includes(
      pageName
    );
  }

  redirectToDashboard() {
    if (!this.currentUser) {
      window.location.href = "index.html";
      return;
    }

    switch (this.currentUser.role) {
      case "student":
        window.location.href = "pages/student-dashboard.html";
        break;
      case "professor":
        window.location.href = "pages/professor-dashboard.html";
        break;
      case "admin":
        window.location.href = "pages/admin-dashboard.html";
        break;
      default:
        window.location.href = "index.html";
    }
  }

  // جلوگیری از دسترسی به صفحات غیرمجاز
  enforceAccessControl() {
    if (!this.currentUser) {
      // اگر کاربر لاگین نکرده و در صفحه لاگین نیست، به لاگین هدایت شود
      if (
        !window.location.pathname.includes("index.html") &&
        !window.location.pathname.includes("login.html")
      ) {
        window.location.href = this.getLoginPath();
      }
      return;
    }

    // گرفتن نام صفحه فعلی
    const currentPage = window.location.pathname.split("/").pop();

    // بررسی دسترسی
    if (!this.canAccessPage(currentPage)) {
      console.warn(
        `دسترسی غیرمجاز: کاربر ${this.currentUser.role} به صفحه ${currentPage}`
      );
      this.redirectToDashboard();
    }
  }

  // تولید منو بر اساس نقش کاربر
  generateSidebarMenu() {
    if (!this.currentUser) return "";

    const role = this.currentUser.role;
    let menuItems = "";

    if (role === "student") {
      menuItems = `
                <li><a href="student-dashboard.html"><i class="fas fa-home"></i> داشبورد</a></li>
                <li><a href="student-reservation.html"><i class="fas fa-calendar-plus"></i> رزرو میز</a></li>
                <li><a href="malfunction-report.html"><i class="fas fa-exclamation-triangle"></i> گزارش خرابی</a></li>
                <li><a href="announcements.html"><i class="fas fa-bell"></i> اعلان‌ها</a></li>
            `;
    } else if (role === "professor") {
      menuItems = `
                <li><a href="professor-dashboard.html"><i class="fas fa-home"></i> داشبورد</a></li>
                <li><a href="professor-reservation.html"><i class="fas fa-calendar-plus"></i> رزرو سایت</a></li>
                <li><a href="malfunction-report.html"><i class="fas fa-exclamation-triangle"></i> گزارش خرابی</a></li>
                <li><a href="announcements.html"><i class="fas fa-bell"></i> اعلان‌ها</a></li>
            `;
    } else if (role === "admin") {
      menuItems = `
                <li><a href="admin-dashboard.html"><i class="fas fa-home"></i> داشبورد</a></li>
                <li><a href="admin-reservations.html"><i class="fas fa-calendar-check"></i> مدیریت رزروها</a></li>
                <li><a href="admin-reports.html"><i class="fas fa-exclamation-triangle"></i> گزارشات خرابی</a></li>
                <li><a href="admin-software.html"><i class="fas fa-cogs"></i> مدیریت نرم‌افزار</a></li>
                <li><a href="admin-users.html"><i class="fas fa-users"></i> مدیریت کاربران</a></li>
                <li><a href="announcements.html"><i class="fas fa-bell"></i> اعلان‌ها</a></li>
            `;
    }

    return `
            <nav>
                <ul class="sidebar-nav">
                    ${menuItems}
                    <li><a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> خروج</a></li>
                </ul>
            </nav>
        `;
  }
}

// مدیر سیستم
const userManager = new UserManager();

// مدیر نمایش نوتیفیکیشن
class NotificationManager {
  static show(message, type = "success") {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    let icon = "check-circle";
    if (type === "error") icon = "exclamation-circle";
    if (type === "warning") icon = "exclamation-triangle";

    notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <div class="notification-content">
                <h4>${
                  type === "success"
                    ? "موفقیت"
                    : type === "error"
                    ? "خطا"
                    : "هشدار"
                }</h4>
                <p>${message}</p>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
}

// مدیریت فرم‌ها
class FormManager {
  static handleLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role");
    if (roleParam) {
      const roleOption = document.querySelector(
        `.role-option[data-role="${roleParam}"]`
      );
      if (roleOption) {
        document
          .querySelectorAll(".role-option")
          .forEach((opt) => opt.classList.remove("selected"));
        roleOption.classList.add("selected");
        document.getElementById("role").value = roleParam;
      }
    }

    document.querySelectorAll(".role-option").forEach((option) => {
      option.addEventListener("click", function () {
        document
          .querySelectorAll(".role-option")
          .forEach((opt) => opt.classList.remove("selected"));
        this.classList.add("selected");
        document.getElementById("role").value = this.dataset.role;
      });
    });

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const userId = document.getElementById("userId").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;

      if (!userId || !password || !role) {
        NotificationManager.show("لطفاً تمام فیلدها را پر کنید", "error");
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="loading"></span> در حال ورود...';
      submitBtn.disabled = true;

      setTimeout(() => {
        const result = userManager.login(userId, password, role);

        if (result.success) {
          NotificationManager.show("ورود با موفقیت انجام شد");
          setTimeout(() => {
            userManager.redirectToDashboard();
          }, 1000);
        } else {
          NotificationManager.show(result.message, "error");
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 1000);
    });
  }

  static handleReservationForm() {
    const reservationForm = document.getElementById("reservationForm");
    if (!reservationForm) return;

    const siteSelect = document.getElementById("site");
    if (siteSelect) {
      mockData.sites.forEach((site) => {
        const option = document.createElement("option");
        option.value = site.id;
        option.textContent = site.name;
        siteSelect.appendChild(option);
      });
    }

    const softwareSelect = document.getElementById("software");
    if (softwareSelect) {
      mockData.softwareList.forEach((software) => {
        const option = document.createElement("option");
        option.value = software.id;
        option.textContent = `${software.name} (${software.version})`;
        softwareSelect.appendChild(option);
      });
    }

    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      NotificationManager.show("رزرو با موفقیت ثبت شد و در انتظار تایید است");
      this.reset();

      setTimeout(() => {
        const user = userManager.getCurrentUser();
        if (user.role === "student") {
          window.location.href = "student-dashboard.html";
        } else if (user.role === "professor") {
          window.location.href = "professor-dashboard.html";
        }
      }, 2000);
    });
  }

  static handleMalfunctionReportForm() {
    const reportForm = document.getElementById("malfunctionForm");
    if (!reportForm) return;

    const siteSelect = document.getElementById("site");
    if (siteSelect) {
      mockData.sites.forEach((site) => {
        const option = document.createElement("option");
        option.value = site.id;
        option.textContent = site.name;
        siteSelect.appendChild(option);
      });
    }

    reportForm.addEventListener("submit", function (e) {
      e.preventDefault();
      NotificationManager.show("گزارش خرابی با موفقیت ثبت شد");
      this.reset();

      setTimeout(() => {
        const user = userManager.getCurrentUser();
        if (user.role === "student") {
          window.location.href = "student-dashboard.html";
        } else if (user.role === "professor") {
          window.location.href = "professor-dashboard.html";
        }
      }, 2000);
    });
  }

  static handleAnnouncementForm() {
    const announcementForm = document.getElementById("announcementForm");
    if (!announcementForm) return;

    announcementForm.addEventListener("submit", function (e) {
      e.preventDefault();
      NotificationManager.show("اعلان با موفقیت ایجاد شد");
      this.reset();

      setTimeout(() => {
        window.location.href = "announcements.html";
      }, 2000);
    });
  }
}

// مدیریت داشبورد
class DashboardManager {
  static loadDashboardData() {
    const user = userManager.getCurrentUser();
    if (!user) {
      window.location.href = "../index.html";
      return;
    }

    const userNameElement = document.getElementById("userName");
    const userRoleElement = document.getElementById("userRole");
    const userInfoElement = document.getElementById("userInfo");

    if (userNameElement) userNameElement.textContent = user.name;
    if (userRoleElement)
      userRoleElement.textContent =
        user.role === "student"
          ? "دانشجو"
          : user.role === "professor"
          ? "استاد"
          : "ادمین";

    if (userInfoElement) {
      if (user.role === "student") {
        userInfoElement.innerHTML = `
                    <p><strong>شماره دانشجویی:</strong> ${
                      user.studentNumber || user.id
                    }</p>
                    <p><strong>دانشکده:</strong> ${user.faculty || "نامشخص"}</p>
                `;
      } else if (user.role === "professor") {
        userInfoElement.innerHTML = `
                    <p><strong>شناسه کارمندی:</strong> ${
                      user.employeeId || user.id
                    }</p>
                    <p><strong>دپارتمان:</strong> ${
                      user.department || "نامشخص"
                    }</p>
                `;
      }
    }

    switch (user.role) {
      case "student":
        this.loadStudentDashboard();
        break;
      case "professor":
        this.loadProfessorDashboard();
        break;
      case "admin":
        this.loadAdminDashboard();
        break;
    }
  }

  static loadStudentDashboard() {
    const userReservations = mockData.reservations.filter(
      (r) => r.userId === userManager.getCurrentUser().id
    );
    const activeReservations = userReservations.filter(
      (r) => r.status === "approved"
    ).length;
    const pendingReservations = userReservations.filter(
      (r) => r.status === "pending"
    ).length;

    if (document.getElementById("activeReservations")) {
      document.getElementById("activeReservations").textContent =
        activeReservations;
    }
    if (document.getElementById("pendingReservations")) {
      document.getElementById("pendingReservations").textContent =
        pendingReservations;
    }

    this.loadRecentReservations(userReservations.slice(0, 5));
  }

  static loadProfessorDashboard() {
    const userReservations = mockData.reservations.filter(
      (r) => r.userId === userManager.getCurrentUser().id
    );
    const approvedReservations = userReservations.filter(
      (r) => r.status === "approved"
    ).length;
    const pendingReservations = userReservations.filter(
      (r) => r.status === "pending"
    ).length;

    if (document.getElementById("approvedReservations")) {
      document.getElementById("approvedReservations").textContent =
        approvedReservations;
    }
    if (document.getElementById("pendingReservations")) {
      document.getElementById("pendingReservations").textContent =
        pendingReservations;
    }

    this.loadRecentReservations(userReservations.slice(0, 5));
  }

  static loadAdminDashboard() {
    const totalDesks = mockData.sites.reduce(
      (sum, site) => sum + site.totalDesks,
      0
    );
    const freeDesks = mockData.sites.reduce(
      (sum, site) => sum + site.freeDesks,
      0
    );
    const pendingReservations = mockData.reservations.filter(
      (r) => r.status === "pending"
    ).length;
    const openReports = mockData.malfunctionReports.filter(
      (r) => r.status === "pending"
    ).length;

    if (document.getElementById("totalDesks")) {
      document.getElementById("totalDesks").textContent = totalDesks;
    }
    if (document.getElementById("freeDesks")) {
      document.getElementById("freeDesks").textContent = freeDesks;
    }
    if (document.getElementById("pendingReservations")) {
      document.getElementById("pendingReservations").textContent =
        pendingReservations;
    }
    if (document.getElementById("openReports")) {
      document.getElementById("openReports").textContent = openReports;
    }

    this.loadSites();
    this.loadPendingReservations();
  }

  static loadRecentReservations(reservations) {
    const tableBody = document.getElementById("reservationsTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    reservations.forEach((reservation) => {
      const row = document.createElement("tr");

      let statusBadge = "";
      if (reservation.status === "approved") {
        statusBadge =
          '<span class="status-badge status-approved">تایید شده</span>';
      } else if (reservation.status === "pending") {
        statusBadge =
          '<span class="status-badge status-pending">در انتظار</span>';
      } else if (reservation.status === "rejected") {
        statusBadge =
          '<span class="status-badge status-rejected">رد شده</span>';
      }

      row.innerHTML = `
                <td>${reservation.siteName}</td>
                <td>${reservation.date}</td>
                <td>${reservation.startTime} - ${reservation.endTime}</td>
                <td>${statusBadge}</td>
            `;

      tableBody.appendChild(row);
    });
  }

  static loadPendingReservations() {
    const tableBody = document.getElementById("pendingReservationsTableBody");
    if (!tableBody) return;

    const pendingReservations = mockData.reservations.filter(
      (r) => r.status === "pending"
    );

    tableBody.innerHTML = "";

    pendingReservations.forEach((reservation) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${reservation.userName}</td>
                <td>${reservation.siteName}</td>
                <td>${reservation.date}</td>
                <td>${reservation.startTime} - ${reservation.endTime}</td>
                <td>${
                  reservation.type === "student" ? "رزرو میز" : "رزرو سایت"
                }</td>
                <td>
                    <button class="btn btn-success btn-sm approve-btn" data-id="${
                      reservation.id
                    }">تایید</button>
                    <button class="btn btn-danger btn-sm reject-btn" data-id="${
                      reservation.id
                    }">رد</button>
                </td>
            `;

      tableBody.appendChild(row);
    });

    document.querySelectorAll(".approve-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const reservationId = this.dataset.id;
        DashboardManager.approveReservation(reservationId);
      });
    });

    document.querySelectorAll(".reject-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const reservationId = this.dataset.id;
        DashboardManager.rejectReservation(reservationId);
      });
    });
  }

  static approveReservation(reservationId) {
    NotificationManager.show("رزرو با موفقیت تایید شد");

    setTimeout(() => {
      this.loadPendingReservations();
      this.loadAdminDashboard();
    }, 500);
  }

  static rejectReservation(reservationId) {
    NotificationManager.show("رزرو رد شد");

    setTimeout(() => {
      this.loadPendingReservations();
      this.loadAdminDashboard();
    }, 500);
  }

  static loadSites() {
    const sitesContainer = document.getElementById("sitesContainer");
    if (!sitesContainer) return;

    sitesContainer.innerHTML = "";

    mockData.sites.forEach((site) => {
      const siteCard = document.createElement("div");
      siteCard.className = "site-card fade-in";

      const softwareTags = site.software
        .map((soft) => `<span class="software-tag">${soft}</span>`)
        .join("");

      siteCard.innerHTML = `
                <div class="site-header">
                    <h3>${site.name}</h3>
                    <span class="status-badge status-free">${site.freeDesks} میز آزاد</span>
                </div>
                <div class="site-body">
                    <p><i class="fas fa-map-marker-alt"></i> ${site.location}</p>
                    
                    <div class="desks-status">
                        <div class="desk-status-item">
                            <div class="desk-status-count">${site.totalDesks}</div>
                            <div class="desk-status-label">کل میزها</div>
                        </div>
                        <div class="desk-status-item">
                            <div class="desk-status-count" style="color: #27ae60">${site.freeDesks}</div>
                            <div class="desk-status-label">آزاد</div>
                        </div>
                        <div class="desk-status-item">
                            <div class="desk-status-count" style="color: #f39c12">${site.occupiedDesks}</div>
                            <div class="desk-status-label">اشغال</div>
                        </div>
                        <div class="desk-status-item">
                            <div class="desk-status-count" style="color: #c0392b">${site.underRepairDesks}</div>
                            <div class="desk-status-label">تعمیر</div>
                        </div>
                    </div>
                    
                    <div class="software-list">
                        <h4>نرم‌افزارهای نصب شده:</h4>
                        <div class="software-tags">
                            ${softwareTags}
                        </div>
                    </div>
                    
                    <button class="btn btn-outline btn-sm mt-3" onclick="window.location.href='admin-software.html?site=${site.id}'">
                        مدیریت نرم‌افزارها
                    </button>
                </div>
            `;

      sitesContainer.appendChild(siteCard);
    });
  }

  // تابع جدید: نمایش سایت‌ها برای دانشجو (بدون دکمه مدیریت)
  static loadStudentSites() {
    const sitesContainer = document.getElementById("sitesContainer");
    if (!sitesContainer) return;

    sitesContainer.innerHTML = "";

    mockData.sites.forEach((site) => {
      const siteCard = document.createElement("div");
      siteCard.className = "site-card fade-in";

      const softwareTags = site.software
        .map((soft) => `<span class="software-tag">${soft}</span>`)
        .join("");

      siteCard.innerHTML = `
                <div class="site-header">
                    <h3>${site.name}</h3>
                    <span class="status-badge ${
                      site.freeDesks > 5 ? "status-free" : "status-occupied"
                    }">
                        ${site.freeDesks > 5 ? "دارای ظرفیت" : "ظرفیت محدود"}
                    </span>
                </div>
                <div class="site-body">
                    <p><i class="fas fa-map-marker-alt"></i> ${
                      site.location
                    }</p>
                    
                    <div class="desks-status">
                        <div class="desk-status-item">
                            <div class="desk-status-count">${
                              site.totalDesks
                            }</div>
                            <div class="desk-status-label">کل میزها</div>
                        </div>
                        <div class="desk-status-item">
                            <div class="desk-status-count" style="color: #27ae60">${
                              site.freeDesks
                            }</div>
                            <div class="desk-status-label">آزاد</div>
                        </div>
                        <div class="desk-status-item">
                            <div class="desk-status-count" style="color: #f39c12">${
                              site.occupiedDesks
                            }</div>
                            <div class="desk-status-label">اشغال</div>
                        </div>
                        <div class="desk-status-item">
                            <div class="desk-status-count" style="color: #c0392b">${
                              site.underRepairDesks
                            }</div>
                            <div class="desk-status-label">تعمیر</div>
                        </div>
                    </div>
                    
                    <div class="software-list">
                        <h4>نرم‌افزارهای موجود:</h4>
                        <div class="software-tags">
                            ${softwareTags}
                        </div>
                    </div>
                    
                    <!-- برای دانشجو دکمه مدیریت وجود ندارد -->
                </div>
            `;

      sitesContainer.appendChild(siteCard);
    });
  }

  static loadReports() {
    const tableBody = document.getElementById("reportsTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    mockData.malfunctionReports.forEach((report) => {
      const row = document.createElement("tr");

      let priorityBadge = "";
      if (report.priority === "high") {
        priorityBadge =
          '<span class="status-badge status-rejected">بالا</span>';
      } else if (report.priority === "medium") {
        priorityBadge =
          '<span class="status-badge status-pending">متوسط</span>';
      } else {
        priorityBadge =
          '<span class="status-badge status-approved">پایین</span>';
      }

      let statusBadge = "";
      if (report.status === "pending") {
        statusBadge =
          '<span class="status-badge status-pending">در انتظار</span>';
      } else if (report.status === "in-progress") {
        statusBadge =
          '<span class="status-badge status-warning">در حال بررسی</span>';
      } else if (report.status === "resolved") {
        statusBadge =
          '<span class="status-badge status-approved">حل شده</span>';
      }

      row.innerHTML = `
                <td>${report.userName}</td>
                <td>${report.siteName}</td>
                <td>${report.deskId || "--"}</td>
                <td>${report.description}</td>
                <td>${priorityBadge}</td>
                <td>${report.date}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="DashboardManager.updateReportStatus(${
                      report.id
                    }, 'in-progress')">
                        شروع بررسی
                    </button>
                </td>
            `;

      tableBody.appendChild(row);
    });
  }

  static updateReportStatus(reportId, status) {
    NotificationManager.show("وضعیت گزارش به روز شد");

    setTimeout(() => {
      this.loadReports();
    }, 500);
  }

  static loadUsers() {
    const tableBody = document.getElementById("usersTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    mockData.users.forEach((user) => {
      const row = document.createElement("tr");

      let roleBadge = "";
      if (user.role === "admin") {
        roleBadge =
          '<span class="status-badge" style="background-color: #2c3e50; color: white">ادمین</span>';
      } else if (user.role === "professor") {
        roleBadge =
          '<span class="status-badge" style="background-color: #3498db; color: white">استاد</span>';
      } else if (user.role === "student") {
        roleBadge =
          '<span class="status-badge" style="background-color: #27ae60; color: white">دانشجو</span>';
      }

      let statusBadge = "";
      if (user.status === "active") {
        statusBadge = '<span class="status-badge status-approved">فعال</span>';
      } else {
        statusBadge =
          '<span class="status-badge status-rejected">غیرفعال</span>';
      }

      let userInfo = "";
      if (user.role === "student") {
        userInfo = user.faculty;
      } else if (user.role === "professor") {
        userInfo = user.department;
      } else if (user.role === "admin") {
        userInfo = user.accessLevel === "full" ? "دسترسی کامل" : "دسترسی محدود";
      }

      row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${roleBadge}</td>
                <td>${userInfo}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-warning btn-sm">ویرایش</button>
                    <button class="btn btn-danger btn-sm">غیرفعال</button>
                </td>
            `;

      tableBody.appendChild(row);
    });
  }

  static loadSoftware() {
    const tableBody = document.getElementById("softwareTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    mockData.softwareList.forEach((software) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${software.name}</td>
                <td>${software.version}</td>
                <td>${software.licenseKey}</td>
                <td>
                    <button class="btn btn-warning btn-sm">ویرایش</button>
                    <button class="btn btn-danger btn-sm">حذف</button>
                </td>
            `;

      tableBody.appendChild(row);
    });
  }

  static loadAnnouncements() {
    const announcementsContainer = document.getElementById(
      "announcementsContainer"
    );
    if (!announcementsContainer) return;

    const user = userManager.getCurrentUser();
    const isAdmin = user && user.role === "admin";

    if (isAdmin) {
      const formHTML = `
                <div class="form-container mb-4">
                    <h3>ایجاد اعلان جدید</h3>
                    <form id="announcementForm">
                        <div class="form-group">
                            <label for="title">عنوان اعلان</label>
                            <input type="text" id="title" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="content">محتوا</label>
                            <textarea id="content" class="form-control" rows="4" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="priority">اولویت</label>
                            <select id="priority" class="form-control" required>
                                <option value="high">بالا</option>
                                <option value="medium" selected>متوسط</option>
                                <option value="low">پایین</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">ایجاد اعلان</button>
                    </form>
                </div>
            `;

      announcementsContainer.innerHTML = formHTML;

      FormManager.handleAnnouncementForm();
    }

    const announcementsList = document.createElement("div");
    announcementsList.className = "announcements-list";

    if (mockData.announcements.length === 0) {
      announcementsList.innerHTML =
        '<p class="text-center">هیچ اعلانی وجود ندارد.</p>';
    } else {
      mockData.announcements.forEach((announcement) => {
        let priorityBadge = "";
        if (announcement.priority === "high") {
          priorityBadge =
            '<span class="status-badge status-rejected">بالا</span>';
        } else if (announcement.priority === "medium") {
          priorityBadge =
            '<span class="status-badge status-pending">متوسط</span>';
        } else {
          priorityBadge =
            '<span class="status-badge status-approved">پایین</span>';
        }

        const announcementElement = document.createElement("div");
        announcementElement.className = "announcement-card fade-in";
        announcementElement.innerHTML = `
                    <div class="announcement-header">
                        <h4>${announcement.title}</h4>
                        ${priorityBadge}
                    </div>
                    <div class="announcement-body">
                        <p>${announcement.content}</p>
                    </div>
                    <div class="announcement-footer">
                        <span><i class="fas fa-user"></i> ${
                          announcement.createdBy
                        }</span>
                        <span><i class="fas fa-calendar"></i> ${
                          announcement.date
                        }</span>
                        ${
                          isAdmin
                            ? '<button class="btn btn-danger btn-sm">حذف</button>'
                            : ""
                        }
                    </div>
                `;

        announcementsList.appendChild(announcementElement);
      });
    }

    announcementsContainer.appendChild(announcementsList);
  }
}

// مدیریت رویداد خروج
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      userManager.logout();
      NotificationManager.show("خروج با موفقیت انجام شد");
      const loginPath = userManager.getLoginPath();
      setTimeout(() => {
        window.location.href = loginPath;
      }, 1000);
    });
  }
}

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  // اجرای کنترل دسترسی
  userManager.enforceAccessControl();

  // بارگذاری منو در صفحات داشبورد
  const sidebarMenu = document.getElementById("sidebarMenu");
  if (sidebarMenu) {
    sidebarMenu.innerHTML = userManager.generateSidebarMenu();

    // علامت‌گذاری لینک فعال
    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll(".sidebar-nav a");
    menuLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && currentPage.includes(href.replace(".html", ""))) {
        link.classList.add("active");
      }
    });
  }

  setupLogout();

  const path = window.location.pathname;
  console.log("Current path:", path);

  if (path.includes("index.html") || path.endsWith("/")) {
    console.log("Initializing login form...");
    FormManager.handleLoginForm();
  } else if (path.includes("dashboard.html")) {
    console.log("Loading dashboard...");
    DashboardManager.loadDashboardData();
  } else if (path.includes("reservation.html")) {
    console.log("Loading reservation form...");
    FormManager.handleReservationForm();

    const user = userManager.getCurrentUser();
    if (user && document.getElementById("userName")) {
      document.getElementById("userName").textContent = user.name;
    }
  } else if (path.includes("malfunction-report.html")) {
    console.log("Loading malfunction report form...");
    FormManager.handleMalfunctionReportForm();

    const user = userManager.getCurrentUser();
    if (user && document.getElementById("userName")) {
      document.getElementById("userName").textContent = user.name;
    }
  } else if (path.includes("admin-")) {
    console.log("Loading admin page...");
    DashboardManager.loadDashboardData();

    if (path.includes("admin-reports.html")) {
      DashboardManager.loadReports();
    } else if (path.includes("admin-users.html")) {
      DashboardManager.loadUsers();
    } else if (path.includes("admin-software.html")) {
      DashboardManager.loadSoftware();
    }
  } else if (path.includes("announcements.html")) {
    console.log("Loading announcements...");
    DashboardManager.loadDashboardData();
    DashboardManager.loadAnnouncements();
  }
});

// تابع‌های عمومی برای دسترسی از HTML
window.DashboardManager = DashboardManager;
window.NotificationManager = NotificationManager;
window.userManager = userManager;
