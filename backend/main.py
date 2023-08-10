import os
from dotenv import load_dotenv
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from routers import router


load_dotenv()
app = FastAPI()


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.environ.get("DB_URL"))
    app.mongodb = app.mongodb_client[os.environ.get("DB_NAME")]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(router)
