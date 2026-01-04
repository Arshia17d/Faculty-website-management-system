from app.models.reservation import Reservation
from app.models.software import Software
from app.models.user import User

VALID_USERS = {
    "98123456": {
        "role": "student",
        "name": "علی محمدی",
        "faculty": "مهندسی کامپیوتر",
    },
    "98234567": {
        "role": "student",
        "name": "فاطمه کریمی",
        "faculty": "مهندسی نرم‌افزار",
    },
    "emp-1234": {
        "role": "professor",
        "name": "دکتر رضایی",
        "department": "علوم کامپیوتر",
    },
    "emp-5678": {
        "role": "professor",
        "name": "دکتر حسینی",
        "department": "مهندسی نرم‌افزار",
    },
    "admin-01": {"role": "admin", "name": "مدیر سیستم", "accessLevel": "full"},
    "admin": {"role": "admin", "name": "ادمین اصلی", "accessLevel": "full"},
    "test": {"role": "student", "name": "کاربر تست", "faculty": "مهندسی کامپیوتر"},
}

SOFTWARE_LIST = [
    Software(id=1, name="Python", version="3.11", licenseKey="PYT-2023-001"),
    Software(id=2, name="MATLAB", version="R2022b", licenseKey="MAT-2022-045"),
    Software(id=3, name="VS Code", version="1.78", licenseKey="FREE"),
    Software(id=4, name="Office", version="2021", licenseKey="OFF-2021-123"),
    Software(id=5, name="Java", version="JDK 17", licenseKey="JAVA-17-001"),
    Software(id=6, name="IntelliJ", version="2023.1", licenseKey="INT-2023-012"),
    Software(id=7, name="Docker", version="24.0", licenseKey="DOCK-24-001"),
    Software(id=8, name="PostgreSQL", version="15", licenseKey="POST-15-001"),
]

RESERVATIONS = [
    Reservation(
        id=1,
        userId="98123456",
        userName="علی محمدی",
        siteId=1,
        siteName="سایت کامپیوتر دانشکده فنی",
        deskId="A-12",
        date="1403/01/20",
        startTime="10:00",
        endTime="12:00",
        software=["Python", "MATLAB"],
        status="approved",
        type="student",
    ),
    Reservation(
        id=2,
        userId="98123456",
        userName="علی محمدی",
        siteId=2,
        siteName="آزمایشگاه مهندسی نرم‌افزار",
        deskId="B-05",
        date="1403/01/22",
        startTime="14:00",
        endTime="16:00",
        software=["Java", "Docker"],
        status="pending",
        type="student",
    ),
    Reservation(
        id=3,
        userId="emp-1234",
        userName="دکتر رضایی",
        siteId=1,
        siteName="سایت کامپیوتر دانشکده فنی",
        date="1403/01/25",
        startTime="08:00",
        endTime="10:00",
        purpose="کلاس مبانی برنامه‌نویسی",
        studentsCount=35,
        status="pending",
        type="professor",
    ),
]


def next_reservation_id() -> int:
    return max((reservation.id for reservation in RESERVATIONS), default=0) + 1


def user_from_valid_users(user_id: str) -> User | None:
    if user_id not in VALID_USERS:
        return None

    data = VALID_USERS[user_id].copy()
    data["id"] = user_id
    return User(**data)
