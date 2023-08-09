import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCursor
from bson.json_util import dumps


load_dotenv()
app = FastAPI()


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.environ.get("DB_URL"))
    app.mongodb = app.mongodb_client[os.environ.get("DB_NAME")]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


@app.get("/")
async def home():
  return {"message": "Hello World"}


@app.get("/show")
async def get_show():
    collection = app.mongodb["shows_mal"]
    show = await collection.find_one({"title": "Eyeshield 21"})

    if show is None:
        return JSONResponse(content={}, status_code=404)

    serialized_show = dumps(show)
    
    return JSONResponse(content=serialized_show, status_code=200)


@app.get("/shows")
async def get_show():
    collection = app.mongodb["shows_mal"]
    cursor: AsyncIOMotorCursor = collection.find({})

    serialized_shows = []
    async for show in cursor:
        serialized_shows.append(show)

    show_count = len(serialized_shows)
    
    return JSONResponse(content={"count": show_count}, status_code=200)
