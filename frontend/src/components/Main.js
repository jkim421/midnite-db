import React, { useEffect, useState } from 'react';

import FiltersPanel from './FiltersPanel'

import fetchFilters from '../utils/fetchFilters'

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
    <section style={{ margin: 24, border: '1px dashed black' }}>
      <FiltersPanel filters={filters} />
    </section>
  )
};

export default Main;
