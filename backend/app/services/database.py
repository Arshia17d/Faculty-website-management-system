import json
import os
import sqlite3
from pathlib import Path


def _default_db_path() -> str:
    base_dir = Path(__file__).resolve().parent.parent
    return str(base_dir / "data.db")


DB_PATH = os.environ.get("APP_DB_PATH", _default_db_path())


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def init_db() -> None:
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            faculty TEXT,
            department TEXT,
            access_level TEXT,
            status TEXT
        )
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS sites (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            total_desks INTEGER NOT NULL,
            free_desks INTEGER NOT NULL,
            occupied_desks INTEGER NOT NULL,
            reserved_desks INTEGER NOT NULL,
            under_repair_desks INTEGER NOT NULL,
            software TEXT NOT NULL
        )
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS software (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            version TEXT NOT NULL,
            license_key TEXT NOT NULL,
            installed_at TEXT,
            desks_count INTEGER
        )
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            priority TEXT NOT NULL,
            date TEXT NOT NULL,
            created_by TEXT NOT NULL
        )
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS malfunction_reports (
            id INTEGER PRIMARY KEY,
            user_id TEXT NOT NULL,
            user_name TEXT NOT NULL,
            site_id INTEGER NOT NULL,
            site_name TEXT NOT NULL,
            desk_id TEXT,
            description TEXT NOT NULL,
            priority TEXT NOT NULL,
            date TEXT NOT NULL,
            status TEXT NOT NULL,
            contact TEXT
        )
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY,
            user_id TEXT NOT NULL,
            user_name TEXT NOT NULL,
            site_id INTEGER NOT NULL,
            site_name TEXT NOT NULL,
            desk_id TEXT,
            date TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL,
            software TEXT,
            status TEXT NOT NULL,
            type TEXT NOT NULL,
            purpose TEXT,
            students_count INTEGER
        )
        """
    )
    connection.commit()

    _seed_if_needed(connection)
    connection.close()


def _table_is_empty(connection: sqlite3.Connection, table: str) -> bool:
    cursor = connection.execute(f"SELECT COUNT(*) FROM {table}")
    return cursor.fetchone()[0] == 0


def _seed_if_needed(connection: sqlite3.Connection) -> None:
    if _table_is_empty(connection, "sites"):
        _seed_sites(connection)
    if _table_is_empty(connection, "software"):
        _seed_software(connection)
    if _table_is_empty(connection, "announcements"):
        _seed_announcements(connection)
    if _table_is_empty(connection, "users"):
        _seed_users(connection)
    if _table_is_empty(connection, "reservations"):
        _seed_reservations(connection)
    if _table_is_empty(connection, "malfunction_reports"):
        _seed_malfunction_reports(connection)
    connection.commit()


def _seed_sites(connection: sqlite3.Connection) -> None:
    sites = [
        {
            "id": 1,
            "name": "سایت کامپیوتر دانشکده فنی",
            "location": "ساختمان اصلی، طبقه دوم",
            "total_desks": 40,
            "free_desks": 15,
            "occupied_desks": 20,
            "reserved_desks": 3,
            "under_repair_desks": 2,
            "software": ["Python", "MATLAB", "VS Code", "Office", "Adobe CC"],
        },
        {
            "id": 2,
            "name": "آزمایشگاه مهندسی نرم افزار",
            "location": "ساختمان علوم کامپیوتر، طبقه اول",
            "total_desks": 25,
            "free_desks": 8,
            "occupied_desks": 12,
            "reserved_desks": 4,
            "under_repair_desks": 1,
            "software": ["Java", "IntelliJ", "Docker", "PostgreSQL", "Git"],
        },
        {
            "id": 3,
            "name": "مرکز کامپیوتر کتابخانه مرکزی",
            "location": "کتابخانه مرکزی، طبقه همکف",
            "total_desks": 30,
            "free_desks": 10,
            "occupied_desks": 18,
            "reserved_desks": 1,
            "under_repair_desks": 1,
            "software": ["Office", "Adobe Reader", "Python", "Visual Studio"],
        },
    ]
    connection.executemany(
        """
        INSERT INTO sites (id, name, location, total_desks, free_desks, occupied_desks, reserved_desks, under_repair_desks, software)
        VALUES (:id, :name, :location, :total_desks, :free_desks, :occupied_desks, :reserved_desks, :under_repair_desks, :software)
        """,
        [
            {
                **site,
                "software": json.dumps(site["software"], ensure_ascii=False),
            }
            for site in sites
        ],
    )


def _seed_software(connection: sqlite3.Connection) -> None:
    software_list = [
        {"id": 1, "name": "Python", "version": "3.11", "license_key": "PYT-2023-001", "installed_at": "1402/12/10", "desks_count": 32},
        {"id": 2, "name": "MATLAB", "version": "R2022b", "license_key": "MAT-2022-045", "installed_at": "1402/11/05", "desks_count": 20},
        {"id": 3, "name": "VS Code", "version": "1.78", "license_key": "FREE", "installed_at": "1402/10/15", "desks_count": 40},
        {"id": 4, "name": "Office", "version": "2021", "license_key": "OFF-2021-123", "installed_at": "1402/08/20", "desks_count": 38},
        {"id": 5, "name": "Java", "version": "JDK 17", "license_key": "JAVA-17-001", "installed_at": "1402/09/22", "desks_count": 18},
        {"id": 6, "name": "IntelliJ", "version": "2023.1", "license_key": "INT-2023-012", "installed_at": "1402/09/25", "desks_count": 12},
        {"id": 7, "name": "Docker", "version": "24.0", "license_key": "DOCK-24-001", "installed_at": "1402/07/12", "desks_count": 10},
        {"id": 8, "name": "PostgreSQL", "version": "15", "license_key": "POST-15-001", "installed_at": "1402/06/30", "desks_count": 16},
    ]
    connection.executemany(
        """
        INSERT INTO software (id, name, version, license_key, installed_at, desks_count)
        VALUES (:id, :name, :version, :license_key, :installed_at, :desks_count)
        """,
        software_list,
    )


def _seed_announcements(connection: sqlite3.Connection) -> None:
    announcements = [
        {
            "id": 1,
            "title": "تعمیرات سایت دانشکده فنی",
            "content": "به اطلاع می رساند سایت کامپیوتر دانشکده فنی در تاریخ 1403/01/25 جهت تعمیرات سیستم های خنک کننده تعطیل خواهد بود.",
            "priority": "high",
            "date": "1403/01/20",
            "created_by": "ادمین سیستم",
        },
        {
            "id": 2,
            "title": "نصب نرم افزارهای جدید",
            "content": "نرم افزارهای Python 3.11 و VS Code نسخه 1.78 روی تمام سیستم های سایت ها نصب شد.",
            "priority": "medium",
            "date": "1403/01/18",
            "created_by": "ادمین سیستم",
        },
        {
            "id": 3,
            "title": "تغییر در ساعت کاری سایت ها",
            "content": "با توجه به شروع ترم جدید، ساعت کاری سایت های کامپیوتری از تاریخ 1403/01/25 تغییر می کند.",
            "priority": "low",
            "date": "1403/01/15",
            "created_by": "ادمین سیستم",
        },
    ]
    connection.executemany(
        """
        INSERT INTO announcements (id, title, content, priority, date, created_by)
        VALUES (:id, :title, :content, :priority, :date, :created_by)
        """,
        announcements,
    )


def _seed_users(connection: sqlite3.Connection) -> None:
    users = [
        {
            "id": "98123456",
            "name": "علی محمدی",
            "role": "student",
            "faculty": "مهندسی کامپیوتر",
            "department": None,
            "access_level": None,
            "status": "active",
        },
        {
            "id": "98234567",
            "name": "فاطمه کریمی",
            "role": "student",
            "faculty": "مهندسی نرم افزار",
            "department": None,
            "access_level": None,
            "status": "active",
        },
        {
            "id": "emp-1234",
            "name": "دکتر رضایی",
            "role": "professor",
            "faculty": None,
            "department": "علوم کامپیوتر",
            "access_level": None,
            "status": "active",
        },
        {
            "id": "emp-5678",
            "name": "دکتر حسینی",
            "role": "professor",
            "faculty": None,
            "department": "مهندسی نرم افزار",
            "access_level": None,
            "status": "active",
        },
        {
            "id": "admin-01",
            "name": "مدیر سیستم",
            "role": "admin",
            "faculty": None,
            "department": None,
            "access_level": "full",
            "status": "active",
        },
    ]
    connection.executemany(
        """
        INSERT INTO users (id, name, role, faculty, department, access_level, status)
        VALUES (:id, :name, :role, :faculty, :department, :access_level, :status)
        """,
        users,
    )


def _seed_reservations(connection: sqlite3.Connection) -> None:
    reservations = [
        {
            "id": 1,
            "user_id": "98123456",
            "user_name": "علی محمدی",
            "site_id": 1,
            "site_name": "سایت کامپیوتر دانشکده فنی",
            "desk_id": "A-12",
            "date": "1403/01/20",
            "start_time": "10:00",
            "end_time": "12:00",
            "software": json.dumps(["Python", "MATLAB"], ensure_ascii=False),
            "status": "approved",
            "type": "student",
            "purpose": "پروژه درس ساختمان داده",
            "students_count": None,
        },
        {
            "id": 2,
            "user_id": "98123456",
            "user_name": "علی محمدی",
            "site_id": 2,
            "site_name": "آزمایشگاه مهندسی نرم افزار",
            "desk_id": "B-05",
            "date": "1403/01/22",
            "start_time": "14:00",
            "end_time": "16:00",
            "software": json.dumps(["Java", "Docker"], ensure_ascii=False),
            "status": "pending",
            "type": "student",
            "purpose": "تمرین کدنویسی",
            "students_count": None,
        },
        {
            "id": 3,
            "user_id": "emp-1234",
            "user_name": "دکتر رضایی",
            "site_id": 1,
            "site_name": "سایت کامپیوتر دانشکده فنی",
            "desk_id": None,
            "date": "1403/01/25",
            "start_time": "08:00",
            "end_time": "10:00",
            "software": None,
            "status": "pending",
            "type": "professor",
            "purpose": "کلاس مبانی برنامه نویسی",
            "students_count": 35,
        },
    ]
    connection.executemany(
        """
        INSERT INTO reservations (id, user_id, user_name, site_id, site_name, desk_id, date, start_time, end_time, software, status, type, purpose, students_count)
        VALUES (:id, :user_id, :user_name, :site_id, :site_name, :desk_id, :date, :start_time, :end_time, :software, :status, :type, :purpose, :students_count)
        """,
        reservations,
    )


def _seed_malfunction_reports(connection: sqlite3.Connection) -> None:
    reports = [
        {
            "id": 1,
            "user_id": "98123456",
            "user_name": "علی محمدی",
            "site_id": 1,
            "site_name": "سایت کامپیوتر دانشکده فنی",
            "desk_id": "A-08",
            "description": "مانیتور سیستم روشن نمی شود",
            "priority": "high",
            "date": "1403/01/15",
            "status": "in-progress",
            "contact": None,
        },
        {
            "id": 2,
            "user_id": "emp-1234",
            "user_name": "دکتر رضایی",
            "site_id": 2,
            "site_name": "آزمایشگاه مهندسی نرم افزار",
            "desk_id": "B-12",
            "description": "سیستم هنگ می کند هنگام اجرای برنامه های سنگین",
            "priority": "medium",
            "date": "1403/01/16",
            "status": "pending",
            "contact": None,
        },
    ]
    connection.executemany(
        """
        INSERT INTO malfunction_reports (id, user_id, user_name, site_id, site_name, desk_id, description, priority, date, status, contact)
        VALUES (:id, :user_id, :user_name, :site_id, :site_name, :desk_id, :description, :priority, :date, :status, :contact)
        """,
        reports,
    )
