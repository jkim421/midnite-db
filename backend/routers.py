import json
from motor.motor_asyncio import AsyncIOMotorCursor
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from bson.json_util import dumps

from models import ShowModel, ShowsResponse


router = APIRouter()


@router.get("/")
async def home():
  return {"message": "on landing page"}


@router.get("/show", response_model=ShowModel)
async def get_show(request: Request):
    collection = request.app.mongodb["shows_mal"]
    show = await collection.find_one({"title": "Eyeshield 21"})

    if show is None:
        return JSONResponse(content={}, status_code=404)

    serialized_show = json.loads(dumps(show))

    print (serialized_show)
    
    return serialized_show


@router.get("/shows", response_model=ShowsResponse)
async def get_show(request: Request):
    collection = request.app.mongodb["shows_mal"]
    cursor: AsyncIOMotorCursor = collection.find({})

    serialized_shows = []

    async for show in cursor:
        serialized_show = json.loads(dumps(show))
        serialized_shows.append(serialized_show)
  
    content = {
      "count": len(serialized_shows),
      "shows": serialized_shows[:20],
    }
    
    return content
