import React from 'react';
import { useState } from 'react';

import {
  FiltersType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';
import { ShowType } from '../../types/showTypes';

import FiltersPanel from '../FiltersPanel';

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

  const [shows, setShows] = useState<ShowType[]>([]);

  return (
    <main className="app-wrapper">
      <FiltersPanel
        isLoading={isLoadingFilters}
        filters={filters}
        selections={selections}
        setSelections={setSelections}
        setShows={setShows}
        currentYear={currentYear}
      />
      <section className="show-section">
        <header className="app-header">
          <h3>midnite-db</h3>
        </header>
        <div>
          <pre>{JSON.stringify(selections)}</pre>
        </div>
        <div>
          {shows.map(show => (
            <div key={show.title}>
              <pre>{JSON.stringify(show)}</pre>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
