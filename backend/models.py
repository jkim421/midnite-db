from typing import Optional, List
from pydantic import BaseModel


class AltTitles(BaseModel):
    en: str
    ja: str
    synonyms:  List[str]


class Pictures(BaseModel):
    large: str
    medium: str


# class Recommendation(BaseModel):
#     id: int
#     title: str
#     num_recommendations: int


# class StartSeason(BaseModel):
#     season: str
#     year: int


# class WatchStatus(BaseModel):
#     completed: Union[int, str]
#     dropped: Union[int, str]
#     on_hold: Union[int, str]
#     plan_to_watch: Union[int, str]
#     watching: Union[int, str]
    

# class Statistics(BaseModel):
#     num_list_users: int
#     status: WatchStatus


class ShowModel(BaseModel):
    mal_id: int
    title: str
    alt_titles: AltTitles
    media_type: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    status: str
    num_episodes: int
    rating: Optional[str] = None
    studios: List[str]
    genres: Optional[List[str]] = []
    pictures: Optional[Pictures] = {}
    synopsis: str
    mal_popularity: int
    mal_rank: Optional[int] = None
    mal_score: Optional[float] = None
    updated_at: str
    # nsfw: str
    # num_list_users: Optional[int] = None
    # num_scoring_users: Optional[int] = None
    # recommendations: List[Recommendation]
    # source: Optional[str] = None
    # start_season: Optional[StartSeason] = {}
    # statistics: Optional[Statistics] = {}


class ShowsResponse(BaseModel):
    count: int
    shows: List[ShowModel]
