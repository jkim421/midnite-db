import React from 'react';
import { useState, useEffect } from 'react';

import {
  FilterOptionType,
  FiltersType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';
import { ShowStateType } from '../../types/showTypes';

import FiltersPanel from '../FiltersPanel';
import PaginationFooter from '../PaginationFooter';
import ShowCard from '../ShowCard';

import fetchShows from '../../utils/fetchShows';
import '../../styles/Main.css';

interface MainProps {
  isLoadingFilters: boolean;
  filters: FiltersType;
}

const getFinalSelections = (selections: FilterSelectionsStateType) => {
  // if no clauses selected, use current selections as "first" clause
  const finalSelections = { ...selections };
  const { currentGenre, currentTheme } = selections;

  const useCurrentGenre =
    currentGenre.length > 0 && selections.genre.length === 0;

  const useCurrentTheme =
    currentTheme.length > 0 && selections.theme.length === 0;

  if (useCurrentGenre) {
    finalSelections.genre = [currentGenre];
  }

  if (useCurrentTheme) {
    finalSelections.theme = [currentTheme];
  }

  return finalSelections;
};

const getRatingsMap = (ratings: FilterOptionType[] = []) =>
  ratings.reduce(
    (acc, rating) => {
      const { value, alias = '' } = rating;

      acc[value] = alias;

      return acc;
    },
    {} as { [key: string]: string },
  );

const Main = ({ filters, isLoadingFilters }: MainProps) => {
  const currentYear = new Date().getFullYear();

  const defaultSelections = {
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

  const [selections, setSelections] =
    useState<FilterSelectionsStateType>(defaultSelections);

  const [showsData, setShowsData] = useState<ShowStateType>({
    loading: false,
    count: 0,
    shows: [],
  });

  const [page, setPage] = useState<number>(1);

  const fetchData = async (resetPage = false, resetFilters = false) => {
    const finalSelections = resetFilters
      ? defaultSelections
      : getFinalSelections(selections);

    if (resetFilters) {
      setSelections(defaultSelections);
    }

    let pageToFetch = page;

    if (resetPage) {
      pageToFetch = 1;
      setPage(1);
    }

    setShowsData(prevState => ({
      ...prevState,
      loading: true,
    }));

    const { count, shows } = await fetchShows(finalSelections, pageToFetch);

    setShowsData({ loading: false, count, shows });
  };

  useEffect(() => {
    // data is fetched after initial render here
    fetchData();
  }, [page]);

  const showFooter = showsData.shows.length > 0;
  const isLoadingShows = showsData.loading;

  const ratingsMap = getRatingsMap(filters.rating as FilterOptionType[]);

  return (
    <main className="app-wrapper">
      <FiltersPanel
        isLoadingFilters={isLoadingFilters}
        isLoadingShows={isLoadingShows}
        filters={filters}
        selections={selections}
        setSelections={setSelections}
        currentYear={currentYear}
        fetchData={fetchData}
        setPage={setPage}
      />
      <div className="content-wrapper">
        <header className="app-header">
          <h3>midnite-db</h3>
        </header>
        <section className="show-section">
          <h4>SHOWS</h4>
          <h5>Show Count: {showsData.count}</h5>
          {isLoadingShows ? (
            'Loading Shows...'
          ) : (
            <div className="show-list-wrapper">
              {showsData.shows.map(show => (
                <ShowCard
                  key={`${show.mal_id}_show-card`}
                  show={show}
                  ratingsMap={ratingsMap}
                />
              ))}
            </div>
          )}
        </section>
        {showFooter && (
          <PaginationFooter
            page={page}
            count={showsData.count}
            setPage={setPage}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
