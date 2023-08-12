import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from routers import router


load_dotenv()

mongo_uri = os.environ.get("DB_URI")
mongo_db = os.environ.get("DB_NAME")
cors_origins = os.environ.get("CORS_ORIGIN")
debug = os.environ.get("DEBUG")

app = FastAPI()

app.debug = debug

origins = [cors_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(mongo_uri)
    app.mongodb = app.mongodb_client[mongo_db]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(router)
