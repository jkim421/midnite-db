import { useEffect, useState } from 'react';

import { MainStateType } from '~/types/filterTypes';

import Main from './Main';

import fetchFilters from '../../utils/fetchFilters';

const MainContainer = () => {
  const [filtersData, setFiltersData] = useState<MainStateType>({
    loading: true,
    data: {
      type: [],
      status: [],
      rating: [],
      genre: [],
      demographic: [],
      theme: [],
      studios: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;

      const data = await fetchFilters(serverUrl);

      setFiltersData({
        loading: false,
        data,
      });
    };

    fetchData();
  }, []);

  return (
    <Main
      filters={filtersData.data}
      isLoadingFilters={filtersData.loading}
    />
  );
};

export default MainContainer;
