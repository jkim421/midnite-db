export interface MainStateType {
  loading: boolean,
  data: FiltersType,
}

export interface FilterOptionType {
  type: string,
  value: string,
  alias?: string,
  sort?: number
}

export interface FiltersType {
  type: FilterOptionType[],
  status: FilterOptionType[],
  rating: FilterOptionType[],
  genre: FilterOptionType[],
  demographic: FilterOptionType[],
  theme: FilterOptionType[],
  studios: string[],
}
