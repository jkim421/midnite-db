import { useEffect, useState } from 'react';

import { MainStateType } from '~/types/filterTypes';

import FiltersPanel from './FiltersPanel';

import fetchFilters from '../utils/fetchFilters';
import '../styles/Main.css';

const Main = () => {
  const [filters, setFilters] = useState<MainStateType>({
    loading: true,
    data: {
      type: [],
      status: [],
      rating: [],
      genre: [],
      demographic: [],
      theme: [],
      studios: [],
    } 
  });

  useEffect(() => {
    const fetchData = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL

      const data = await fetchFilters(serverUrl);

      setFilters({
        loading: false,
        data,
      });
    };

    fetchData()
  }, []);

  return (
    <main className="app">
      <FiltersPanel
        isLoading={filters.loading}
        filters={filters.data}
      />
      <section className="show-section">
        <header className='app-header'>
          <h3>
            midnite-db
          </h3>
        </header>
        <div>
          SHOW DISPLAY
        </div>
      </section>
    </main>
  )
};

export default Main;
