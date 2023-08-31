interface ShowTitles {
  default: string;
  english?: string;
}

interface ShowImages {
    small: string
    large: string
}

interface ShowYears {
  start?: number;
  end?: number;
}

export interface ShowType {
  mal_id: number;
  url: string;
  images: ShowImages;
  title: string;
  titles?: ShowTitles;
  type?: string;
  source: string
  episodes?: number;
  status: string;
  rating?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity: number;
  members: number;
  synopsis?: string;
  studios: string[];
  genres: string[];
  themes: string[];
  demographics: string[];
  years: ShowYears
}