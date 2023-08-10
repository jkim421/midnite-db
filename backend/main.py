import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from routers import router


load_dotenv()

app = FastAPI()

app.debug = os.environ.get("DEBUG")

origins = [os.environ.get("CORS_ORIGIN")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.environ.get("DB_URL"))
    app.mongodb = app.mongodb_client[os.environ.get("DB_NAME")]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(router)
