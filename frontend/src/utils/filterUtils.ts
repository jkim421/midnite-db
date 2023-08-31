import { FilterOptionType } from '../types/filterTypes';

const MIN_COLUMN_SIZE = 4;

export const getIsMultiColumn = (filterData: FilterOptionType[]) => filterData.length > MIN_COLUMN_SIZE;

export const getMultiColumnData = (filterData: FilterOptionType[]) => {
  const columnLength = Math.round(filterData.length / 2); // two columns

  const filterColumns = [
    filterData.slice(0, columnLength),
    filterData.slice(columnLength),
  ];

  return filterColumns;
};
