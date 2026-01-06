from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.routes.announcement_routes import router as announcement_router
from app.routes.auth_routes import router as auth_router
from app.routes.malfunction_routes import router as malfunction_router
from app.routes.reservation_routes import router as reservation_router
from app.routes.site_routes import router as site_router
from app.routes.software_routes import router as software_router
from app.routes.user_routes import router as user_router
from app.services.database import init_db

app = FastAPI(title=settings.app_name)

# ✅ CORS middleware (خیلی مهم: قبل از include_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router, prefix="/api")
app.include_router(software_router, prefix="/api")
app.include_router(reservation_router, prefix="/api")
app.include_router(site_router, prefix="/api")
app.include_router(announcement_router, prefix="/api")
app.include_router(malfunction_router, prefix="/api")
app.include_router(user_router, prefix="/api")


@app.on_event("startup")
def startup() -> None:
    init_db()


@app.get("/health")
def health_check() -> dict:
    return {
        "status": "ok",
        "environment": settings.environment
    }
