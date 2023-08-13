import { useEffect, useState } from 'react';

import { FiltersType } from '~/types/filterTypes';

import Main from './Main';

import fetchFilters from '../../utils/fetchFilters';

interface FiltersDataStateType {
  loading: boolean;
  data: FiltersType;
}

const MainContainer = () => {
  const [filtersData, setFiltersData] = useState<FiltersDataStateType>({
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
