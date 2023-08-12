import React, { useEffect, useState } from 'react';

import FiltersPanel from './FiltersPanel'

import fetchFilters from '../utils/fetchFilters'
import '../styles/Main.css'

const Main = () => {
  const [filters, setFilters] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL

      const data = await fetchFilters(serverUrl);

      setFilters(data);
    };

    fetchData()
  }, []);

  return (
    <main className="app">
      <FiltersPanel filters={filters} />
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
