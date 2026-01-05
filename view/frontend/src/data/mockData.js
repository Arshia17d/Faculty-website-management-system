export const sites = [
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
];

export const malfunctionReports = [
  {
    id: 1,
    userName: "علی محمدی",
    siteName: "سایت کامپیوتر دانشکده فنی",
    deskId: "A-08",
    description: "مانیتور سیستم روشن نمی‌شود",
    priority: "high",
    date: "1403/01/15",
    status: "pending",
  },
  {
    id: 2,
    userName: "دکتر رضایی",
    siteName: "آزمایشگاه مهندسی نرم‌افزار",
    deskId: "B-12",
    description: "سیستم هنگ می‌کند هنگام اجرای برنامه‌های سنگین",
    priority: "medium",
    date: "1403/01/16",
    status: "in-progress",
  },
];

export const announcements = [
  {
    id: 1,
    title: "تعمیرات سایت دانشکده فنی",
    content:
      "به اطلاع می‌رساند سایت کامپیوتر دانشکده فنی در تاریخ 1403/01/25 جهت تعمیرات سیستم‌های خنک‌کننده تعطیل خواهد بود. لطفاً برای این تاریخ رزروی انجام ندهید.",
    priority: "high",
    date: "1403/01/20 - ۱۰:۳۰",
    createdBy: "ادمین سیستم",
  },
  {
    id: 2,
    title: "نصب نرم‌افزارهای جدید",
    content:
      "نرم‌افزارهای Python 3.11 و VS Code نسخه 1.78 روی تمام سیستم‌های سایت‌ها نصب شد. همچنین MATLAB نسخه 2022b روی سیستم‌های سایت دانشکده فنی و آزمایشگاه نرم‌افزار نصب شده است.",
    priority: "medium",
    date: "1403/01/18 - ۱۴:۱۵",
    createdBy: "ادمین سیستم",
  },
  {
    id: 3,
    title: "تغییر در ساعت کاری سایت‌ها",
    content:
      "با توجه به شروع ترم جدید، ساعت کاری سایت‌های کامپیوتری از تاریخ 1403/01/25 تغییر می‌کند. سایت‌ها از ساعت ۸ صبح تا ۸ شب فعال خواهند بود.",
    priority: "low",
    date: "1403/01/15 - ۰۹:۴۵",
    createdBy: "ادمین سیستم",
  },
  {
    id: 4,
    title: "برگزاری کارگاه برنامه‌نویسی Python",
    content:
      "کارگاه آموزشی برنامه‌نویسی Python برای دانشجویان رشته کامپیوتر در تاریخ 1403/02/05 در سایت دانشکده فنی برگزار می‌شود. ظرفیت محدود است. برای ثبت نام به دفتر دانشکده مراجعه کنید.",
    priority: "medium",
    date: "1403/01/10 - ۱۱:۲۰",
    createdBy: "ادمین سیستم",
  },
];

export const users = [
  {
    id: "98123456",
    name: "علی محمدی",
    role: "دانشجو",
    department: "مهندسی کامپیوتر",
    status: "فعال",
    lastLogin: "امروز ۹:۰۰",
  },
  {
    id: "98234567",
    name: "فاطمه کریمی",
    role: "دانشجو",
    department: "مهندسی نرم‌افزار",
    status: "فعال",
    lastLogin: "دیروز ۱۵:۳۰",
  },
  {
    id: "emp-1234",
    name: "دکتر رضایی",
    role: "استاد",
    department: "علوم کامپیوتر",
    status: "فعال",
    lastLogin: "امروز ۸:۱۵",
  },
  {
    id: "emp-5678",
    name: "دکتر حسینی",
    role: "استاد",
    department: "مهندسی نرم‌افزار",
    status: "فعال",
    lastLogin: "1403/01/10",
  },
  {
    id: "admin-01",
    name: "مدیر سیستم",
    role: "ادمین",
    department: "-",
    status: "فعال",
    lastLogin: "امروز ۱۰:۳۰",
  },
];
