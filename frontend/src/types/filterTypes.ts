import { Dispatch, SetStateAction } from 'react';

export interface FilterOptionType {
  type: string;
  value: string;
  alias?: string;
  sort?: number
}

export interface FiltersType {
  [key: string]: FilterOptionType[] | string[];
  type: FilterOptionType[];
  status: FilterOptionType[];
  rating: FilterOptionType[];
  genre: FilterOptionType[];
  demographic: FilterOptionType[];
  theme: FilterOptionType[];
  studios: string[];
}

export interface FilterSelectionsStateType {
  [key: string]: string[] | string[][] | string;
  type: string[];
  status: string[];
  rating: string[];
  // malScore: [number, number];
  // yearRange: [number, number];
  genres: string[][];
  themes: string[][];
  demographic: string;
  studio: string;
}

export interface MultiselectFilterProps {
  title: string;
  filterData: FilterOptionType[];
  selectionsKey: string;
  selections: FilterSelectionsStateType;
  setSelections: Dispatch<SetStateAction<FilterSelectionsStateType>>;
}

export interface CheckboxColumnsProps {
  filterData: FilterOptionType[];
  title: string;
  isMultiColumn: boolean;
  setClauses?: Dispatch<SetStateAction<[string][]>>;
}
