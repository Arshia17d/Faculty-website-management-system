from fastapi import FastAPI

from app.config.settings import settings
from app.routes.auth_routes import router as auth_router
from app.routes.reservation_routes import router as reservation_router
from app.routes.software_routes import router as software_router

app = FastAPI(title=settings.app_name)

app.include_router(auth_router, prefix="/api")
app.include_router(software_router, prefix="/api")
app.include_router(reservation_router, prefix="/api")


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "environment": settings.environment}
