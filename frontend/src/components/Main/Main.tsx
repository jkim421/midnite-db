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
import ShowCard from '../ShowCard';

import fetchShows from '../../utils/fetchShows';
import {
  getCleanedSelections,
  getRatingsMap,
  getShowNumCount,
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
  const [countHeaderText, setCountHeaderText] = useState<string>('No entries');

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
    const showNumCount = getShowNumCount(
      page,
      showsData.count,
      showsData.shows.length,
    );

    setCountHeaderText(showNumCount);
  }, [showsData.shows]);

  useEffect(() => {
    fetchShowsData({ selections, page });
  }, []);

  const showFooter = showsData.shows.length > 0;
  const isLoadingShows = showsData.loading;

  const ratingsMap = getRatingsMap(filters.rating as FilterOptionType[]);

  const placeholderContent = isLoadingShows
    ? 'Fetching entries...'
    : 'No matching entries.';

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
          <section className="show-section">
            <div className="show-section_entry-count">
              <span>{countHeaderText}</span>
            </div>
            {isLoadingShows || (!isLoadingShows && showsData.count == 0) ? (
              <section className="show-section show-section_loading">
                <span>{placeholderContent}</span>
              </section>
            ) : (
              <div className="show-list-wrapper">
                {showsData.shows.map(show => (
                  <ShowCard
                    key={`${show.mal_id}_show-card`}
                    show={show}
                    ratingsMap={ratingsMap}
                  />
                ))}
              </div>
            )}
          </section>
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
