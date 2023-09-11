import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import {
  FilterOptionType,
  FiltersType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';
import { ShowStateType } from '../../types/showTypes';
import {
  FetchShowsDataType,
  FilterPanelsFetchType,
} from '../../types/fetchTypes';

import MainHeader from './MainHeader';
import FiltersPanel from '../FiltersPanel';
import PaginationFooter from '../PaginationFooter';
import ShowCards from '../ShowCards';

import fetchShows from '../../utils/fetchShows';
import {
  getCleanedSelections,
  getRatingsMap,
  defaultSelections,
  currentYear,
} from './utils';
import '../../styles/Main.css';

interface MainProps {
  isLoadingFilters: boolean;
  filters: FiltersType;
}

const Main = ({ filters, isLoadingFilters }: MainProps) => {
  const [selections, setSelections] =
    useState<FilterSelectionsStateType>(defaultSelections);

  const [fetchedSelections, setFetchedSelections] =
    useState<FilterSelectionsStateType>(defaultSelections);

  const [showsData, setShowsData] = useState<ShowStateType>({
    loading: false,
    count: 0,
    shows: [],
  });

  const [page, setPage] = useState<number>(1);

  const fetchShowsData: FetchShowsDataType = async ({
    selections,
    page,
    areSelectionsCleaned = false,
  }) => {
    const cleanedSelections = areSelectionsCleaned
      ? selections
      : getCleanedSelections(selections);

    setShowsData(prevState => ({
      ...prevState,
      loading: true,
    }));

    const { count, shows } = await fetchShows(cleanedSelections, page);

    setShowsData({ loading: false, count, shows });
  };

  const filterPanelsFetch: FilterPanelsFetchType = async ({
    resetPage = false,
    resetFilters = false,
  } = {}) => {
    const cleanedSelections = resetFilters
      ? defaultSelections
      : getCleanedSelections(selections);

    if (resetFilters) {
      setSelections(defaultSelections);
    }

    let pageToFetch = page;

    if (resetPage) {
      pageToFetch = 1;
      setPage(1);
    }

    const areSelectionsPrevFetched = _.isEqual(
      cleanedSelections,
      fetchedSelections,
    );

    if (!areSelectionsPrevFetched) {
      setFetchedSelections(cleanedSelections);

      fetchShowsData({
        selections: cleanedSelections,
        page: pageToFetch,
        areSelectionsCleaned: true,
      });
    }
  };

  useEffect(() => {
    if (showsData.count) {
      fetchShowsData({ selections, page });
    }
  }, [page]);

  useEffect(() => {
    fetchShowsData({ selections, page });
  }, []);

  const showFooter = showsData.shows.length > 0;
  const isLoadingShows = showsData.loading;

  const ratingsMap = getRatingsMap(filters.rating as FilterOptionType[]);

  const areSelectionsDefault = _.isEqual(selections, defaultSelections);

  return (
    <main className="app-wrapper">
      <MainHeader />
      <div className="app-content">
        <FiltersPanel
          isLoadingFilters={isLoadingFilters}
          isLoadingShows={isLoadingShows}
          filters={filters}
          selections={selections}
          setSelections={setSelections}
          currentYear={currentYear}
          filterPanelsFetch={filterPanelsFetch}
          setPage={setPage}
          areSelectionsDefault={areSelectionsDefault}
        />
        <div className="shows-footer-wrapper">
          <ShowCards
            page={page}
            showsData={showsData}
            isLoadingShows={isLoadingShows}
            ratingsMap={ratingsMap}
          />
          {showFooter && (
            <PaginationFooter
              page={page}
              count={showsData.count}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
