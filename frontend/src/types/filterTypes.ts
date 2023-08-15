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
  demographic: string[];
  // malScore: [number, number];
  // yearRange: [number, number];
  genre: string[][];
  theme: string[][];
  studio: string;
}

export interface MultiselectFilterProps {
  title: string;
  filterData: FilterOptionType[];
  selectionsKey: string;
  selectedValues: string[] | string[][];
  setSelections: Dispatch<SetStateAction<FilterSelectionsStateType>>;
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
