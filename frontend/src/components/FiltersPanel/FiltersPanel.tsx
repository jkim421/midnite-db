import React, { Dispatch, SetStateAction } from 'react';
import _ from 'lodash';

import {
  FilterOptionType,
  FiltersType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';

import MultiselectFilter from './MultiselectFilter';
import MultiselectFilterWithClauses from './MultiselectFilterWithClauses';
import SliderFilter from './SliderFilter';

import '../../styles/filters.css';

interface FiltersPanelProps {
  isLoadingFilters: boolean;
  isLoadingShows: boolean;
  filters: FiltersType;
  selections: FilterSelectionsStateType;
  setSelections: Dispatch<SetStateAction<FilterSelectionsStateType>>;
  currentYear: number;
  fetchData: (resetPage?: boolean, resetFilters?: boolean) => void;
  setPage: Dispatch<SetStateAction<number>>;
}

const sortFiltersBySortKey = (data: FilterOptionType[]) =>
  _.sortBy(data, 'sort');

const sortFiltersAlphabetically = (data: FilterOptionType[]) =>
  _.sortBy(data, 'value');

const MULTISELECT_FILTERS_MAP = [
  {
    title: 'Media Type',
    selectionsKey: 'type',
    MultiselectComponent: MultiselectFilter,
    sortFn: sortFiltersBySortKey,
  },
  {
    title: 'Status',
    selectionsKey: 'status',
    MultiselectComponent: MultiselectFilter,
    sortFn: sortFiltersBySortKey,
  },
  {
    title: 'Rating',
    selectionsKey: 'rating',
    MultiselectComponent: MultiselectFilter,
    sortFn: sortFiltersBySortKey,
  },
  {
    title: 'Demographic',
    selectionsKey: 'demographic',
    MultiselectComponent: MultiselectFilter,
    sortFn: sortFiltersBySortKey,
  },
  {
    title: 'Genre',
    selectionsKey: 'genre',
    currentSelectionsKey: 'currentGenre',
    MultiselectComponent: MultiselectFilterWithClauses,
    sortFn: sortFiltersAlphabetically,
  },
  {
    title: 'Theme',
    selectionsKey: 'theme',
    currentSelectionsKey: 'currentTheme',
    MultiselectComponent: MultiselectFilterWithClauses,
    sortFn: sortFiltersAlphabetically,
  },
];

const FiltersPanel = ({
  isLoadingFilters,
  isLoadingShows,
  filters,
  selections,
  setSelections,
  currentYear,
  fetchData,
}: FiltersPanelProps) => {
  if (isLoadingFilters)
    return (
      <section className="FiltersPanel filters-panel_loading">
        <span>Loading filters...</span>
      </section>
    );

  const onSubmit = async () => {
    fetchData(true);
  };

  const resetFilters = () => {
    fetchData(true, true);
  };

  return (
    <div className="FiltersPanel">
      <div className="filters-panel-buttons">
        <button
          onClick={onSubmit}
          disabled={isLoadingShows}>
          Submit Query
        </button>
        <div
          className="filters-panel-buttons_reset"
          onClick={resetFilters}>
          Reset all filters
        </div>
      </div>
      <div className="filters-panel_filters-wrapper">
        <SliderFilter
          title="MAL Score"
          step={1}
          minValue={0}
          maxValue={10}
          selectionsKey="malScore"
          setSelections={setSelections}
        />
        <SliderFilter
          title="Air Years"
          step={1}
          minValue={1917}
          maxValue={currentYear}
          selectionsKey="years"
          setSelections={setSelections}
          showReset
        />
        {MULTISELECT_FILTERS_MAP.map(
          ({
            title,
            selectionsKey,
            currentSelectionsKey = '',
            MultiselectComponent,
            sortFn,
          }) => {
            let filterData = filters[selectionsKey] as FilterOptionType[];
            if (sortFn) filterData = sortFn(filterData);

            const currentSelections = currentSelectionsKey
              ? selections[currentSelectionsKey]
              : [];

            const selectedValues = selections[selectionsKey] as
              | string[]
              | string[][];

            return (
              <MultiselectComponent
                key={`${_.kebabCase(title)}-filter-component`}
                title={title}
                filterData={filterData}
                selectionsKey={selectionsKey}
                currentSelections={currentSelections as string[]}
                currentSelectionsKey={currentSelectionsKey}
                selectedValues={selectedValues}
                setSelections={setSelections}
              />
            );
          },
        )}
        {/* <h5>{`Studios: ${filters.studios.length}`}</h5> */}
      </div>
    </div>
  );
};

export default FiltersPanel;
