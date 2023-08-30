import React from 'react';
import { useState } from 'react';

import {
  FiltersType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';

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
    malScore: [1, 10],
    years: [1917, currentYear],
    genre: [],
    theme: [],
    demographic: [],
    studio: '',
  });

  return (
    <main className="app-wrapper">
      <FiltersPanel
        isLoading={isLoadingFilters}
        filters={filters}
        selections={selections}
        setSelections={setSelections}
        currentYear={currentYear}
      />
      <section className="show-section">
        <header className="app-header">
          <h3>midnite-db</h3>
        </header>
        <div>
          <pre>{JSON.stringify(selections)}</pre>
        </div>
      </section>
    </main>
  );
};

export default Main;
