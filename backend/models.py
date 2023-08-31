from typing import Optional, List, Union
from pydantic import BaseModel


class Titles(BaseModel):
    default: str
    english: Optional[str] = None


class Images(BaseModel):
    small: str
    large: str


class Years(BaseModel):
    start: Optional[int] = None
    end: Optional[int] = None


class ShowModel(BaseModel):
    mal_id: int
    url: str
    images: Images
    title: str
    titles: Optional[Titles] = {}
    title: str
    type: Optional[str] = None
    source: str
    episodes: Optional[int] = None
    status: str
    rating: Optional[str] = None
    score: Optional[Union[int, float]] = None
    scored_by: Optional[int] = None
    rank: Optional[int] = None
    popularity: int
    members: int
    synopsis: Optional[str] = None
    studios: List[str]
    genres: List[str]
    themes: List[str]
    demographics: List[str]
    years: Years


class ShowsResponse(BaseModel):
    page: int
    count: int
    shows: List[ShowModel]
