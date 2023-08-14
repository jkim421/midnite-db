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
  const [selections, setSelections] = useState<FilterSelectionsStateType>({
    type: [],
    status: [],
    rating: [],
    // malScore: [0, 0],
    // yearRange: [0, 0],
    genres: [],
    themes: [],
    demographic: '',
    studio: '',
  });

  return (
    <main className="app-wrapper">
      <FiltersPanel
        isLoading={isLoadingFilters}
        filters={filters}
        selections={selections}
        setSelections={setSelections}
      />
      <section className="show-section">
        <header className="app-header">
          <h3>midnite-db</h3>
        </header>
        <div>SHOW DISPLAY</div>
      </section>
    </main>
  );
};

export default Main;
