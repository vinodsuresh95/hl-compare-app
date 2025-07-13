from fastapi import FastAPI
from app.api import router

app = FastAPI(title="HL Compare API")

app.include_router(router)
