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
  demographic: FilterOptionType[];
  genre: FilterOptionType[];
  theme: FilterOptionType[];
  studios: string[];
}

export interface FilterSelectionsStateType {
  [key: string]: string[] | string[][] | string | number[];
  type: string[];
  status: string[];
  rating: string[];
  demographic: string[];
  malScore: [number, number];
  years: [number, number];
  genre: string[][];
  currentGenre: string[];
  theme: string[][];
  currentTheme: string[];
  studio: string;
}

export interface MultiselectFilterProps {
  title: string;
  filterData: FilterOptionType[];
  selectionsKey: string;
  selectedValues: string[] | string[][];
  setSelections: Dispatch<SetStateAction<FilterSelectionsStateType>>;
}

export interface MultiselectFilterWithClausesProps extends MultiselectFilterProps {
  currentSelectionsKey: string;
  currentSelections: string[];
}

export interface CheckboxColumnsProps {
  filterData: FilterOptionType[];
  title: string;
  isMultiColumn: boolean;
  getOnChange: MultiselectGetOnChangeFunc;
  selectedValues: string[];
}

type MultiselectGetOnChangeFunc = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;

export interface CheckboxColumnProps {
  title: string;
  data: FilterOptionType[];
  addRightPadding: boolean;
  getOnChange: MultiselectGetOnChangeFunc;
  selectedValues: string[];
}
