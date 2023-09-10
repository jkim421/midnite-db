import json
import copy
from motor.motor_asyncio import AsyncIOMotorCursor
from fastapi import APIRouter, Request, Query

from models import ShowsResponse

from build_agg_pipeline import build_agg_pipeline


router = APIRouter()


@router.get("/")
async def home():
    pass

@router.get("/filters")
async def get_filters(request: Request):
    filters_collection = request.app.mongodb["filters_jikan"]
    studios_collection = request.app.mongodb["studios_jikan"]

    filters_cursor: AsyncIOMotorCursor = filters_collection.find({}, { "_id": 0 })
    studios_cursor: AsyncIOMotorCursor = studios_collection.find({}, { "_id": 0 })

    # retain filter docs for non-studio filterse
    filters = [filter_doc async for filter_doc in filters_cursor]
    # extract strings from studio docs
    studios = [studio_doc["name"] async for studio_doc in studios_cursor]

    # group filter docs by "type"
    grouped_filters = {}

    for filter_doc in filters:
        type_value = filter_doc["type"]
        # assign key to empty list when first accessing each type key
        grouped_filters.setdefault(type_value, []).append(filter_doc)

    return {
      **grouped_filters,
      "studios": studios,
    }


@router.get("/shows", response_model=ShowsResponse)
async def get_show(request: Request, filters: str = Query(default=""), page: int = 1):
    page_size = 50

    # generate agg pipeline from query filters
    decoded_filters = {}

    if filters:
      decoded_filters = json.loads(filters)

    collection = request.app.mongodb["shows_jikan"]

    agg_pipeline = build_agg_pipeline(decoded_filters)

    # calculate total number of matching documents
    count_pipeline = copy.deepcopy(agg_pipeline)
    count_pipeline.append({
      "$group": {
          "_id": None,
          "count": { "$sum": 1 }
        }
    })

    count_cursor: AsyncIOMotorCursor = collection.aggregate(count_pipeline)
    count_documents = await count_cursor.to_list(length=1)
    query_match_count = 0

    if len(count_documents) > 0:
      query_match_count = count_documents[0]["count"]

    # sort by score by default
    agg_pipeline.append({ "$sort": { "score": -1 } })

    # get paginated show results
    agg_pipeline.append({ "$skip": (page - 1) * page_size })
    agg_pipeline.append({ "$limit": page_size })

    cursor: AsyncIOMotorCursor = collection.aggregate(agg_pipeline)

    serialized_shows = [show_doc async for show_doc in cursor]

    return {
      "page": page,
      "count": query_match_count,
      "shows": serialized_shows,
    }
