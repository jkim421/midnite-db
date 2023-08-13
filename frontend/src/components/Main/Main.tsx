// import { useState } from 'react';

import { FiltersType } from '~/types/filterTypes';

import FiltersPanel from '../FiltersPanel';

import '../..//styles/Main.css';

interface MainProps {
  isLoadingFilters: boolean;
  filters: FiltersType;
}

const Main = ({ filters, isLoadingFilters }: MainProps) => {
  // const [selections, setSelections] = useState();

  return (
    <main className="app-wrapper">
      <FiltersPanel
        isLoading={isLoadingFilters}
        filters={filters}
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
