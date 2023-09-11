import { PAGE_SIZE } from '../../constants/constants';

import {
  FilterOptionType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';

export const getCleanedSelections = (selections: FilterSelectionsStateType) => {
  // if no clauses selected, use current selections as "first" clause
  const cleanedSelections = { ...selections };
  const { currentGenre, currentTheme } = selections;

  const useCurrentGenre =
    currentGenre.length > 0 && selections.genre.length === 0;

  const useCurrentTheme =
    currentTheme.length > 0 && selections.theme.length === 0;

  if (useCurrentGenre) {
    cleanedSelections.genre = [currentGenre];
  }

  if (useCurrentTheme) {
    cleanedSelections.theme = [currentTheme];
  }

  return cleanedSelections;
};

export const getRatingsMap = (ratings: FilterOptionType[] = []) =>
  ratings.reduce(
    (acc, rating) => {
      const { value, alias = '' } = rating;

      acc[value] = alias;

      return acc;
    },
    {} as { [key: string]: string },
  );

export const getShowNumCount = (
  page: number,
  count: number,
  resultsOnPage: number,
) => {
  if (!count) {
    return '0 entries';
  }

  const adjustedPage = page - 1;

  const rangeStart = (PAGE_SIZE * adjustedPage + 1).toLocaleString();
  const rangeEnd = (PAGE_SIZE * adjustedPage + resultsOnPage).toLocaleString();

  const formattedCount = count.toLocaleString();

  return `Entries ${rangeStart} - ${rangeEnd} of ${formattedCount}`;
};

export const currentYear = new Date().getFullYear();

export const defaultSelections = {
  type: [],
  status: [],
  rating: [],
  malScore: [0, 10],
  years: [1917, currentYear],
  demographic: [],
  genre: [],
  currentGenre: [],
  theme: [],
  currentTheme: [],
  studio: '',
} as FilterSelectionsStateType;