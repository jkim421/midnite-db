import React from 'react';
import { useState, useEffect } from 'react';

import {
  FiltersType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';
import { ShowStateType } from '../../types/showTypes';

import FiltersPanel from '../FiltersPanel';
import PaginationFooter from '../PaginationFooter';

import fetchShows from '../../utils/fetchShows';
import '../../styles/Main.css';

interface MainProps {
  isLoadingFilters: boolean;
  filters: FiltersType;
}

const Main = ({ filters, isLoadingFilters }: MainProps) => {
  const currentYear = new Date().getFullYear();

  const [selections, setSelections] = useState<FilterSelectionsStateType>({
    type: [],
    status: [],
    rating: [],
    malScore: [0, 10],
    years: [1917, currentYear],
    genre: [],
    theme: [],
    demographic: [],
    studio: '',
  });

  const [showsData, setShowsData] = useState<ShowStateType>({
    loading: false,
    count: 0,
    shows: [],
  });
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    setShowsData(prevState => ({
      ...prevState,
      loading: true,
    }));

    const { count, shows } = await fetchShows(selections, page);

    setShowsData({ loading: false, count, shows });
  };

  useEffect(() => {
    // data is fetched after initial render here
    fetchData();
  }, [page]);

  const showFooter = showsData.shows.length > 0;
  const isLoadingShows = showsData.loading;

  return (
    <main className="app-wrapper">
      <FiltersPanel
        isLoading={isLoadingFilters}
        filters={filters}
        selections={selections}
        setSelections={setSelections}
        currentYear={currentYear}
        fetchData={fetchData}
      />
      <section className="show-section">
        <header className="app-header">
          <h3>midnite-db</h3>
        </header>
        <div>
          <pre>{JSON.stringify(selections)}</pre>
        </div>
        <h4>SHOWS</h4>
        <h5>Show Count: {showsData.count}</h5>
        {isLoadingShows ? (
          'Loading Shows...'
        ) : (
          <div>
            {showsData.shows.map(show => (
              <div key={show.title}>
                <pre>{JSON.stringify(show)}</pre>
              </div>
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
    </main>
  );
};

export default Main;
