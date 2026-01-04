# Backend

Backend اولیه برای Faculty Website با FastAPI.

## پیش‌نیازها

- Python 3.10+

## نصب و اجرا

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

سرویس روی `http://127.0.0.1:8000` اجرا می‌شود.

## مسیرهای API

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/software`
- `GET /api/reservations`
- `POST /api/reservations`

## تنظیمات

متغیرهای محیطی پشتیبانی‌شده:

- `APP_NAME` (پیش‌فرض: `Faculty Website Backend`)
- `ENVIRONMENT` (پیش‌فرض: `development`)
