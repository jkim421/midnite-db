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

interface FiltersPanelProps {
  isLoading: boolean;
  filters: FiltersType;
  selections: FilterSelectionsStateType;
  setSelections: Dispatch<SetStateAction<FilterSelectionsStateType>>;
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
    MultiselectComponent: MultiselectFilterWithClauses,
    sortFn: sortFiltersAlphabetically,
  },
  {
    title: 'Theme',
    selectionsKey: 'theme',
    MultiselectComponent: MultiselectFilterWithClauses,
    sortFn: sortFiltersAlphabetically,
  },
];

const FiltersPanel = ({
  isLoading,
  filters,
  selections,
  setSelections,
}: FiltersPanelProps) => {
  // TODO - build out full loading ui
  if (isLoading)
    return <section className="FiltersPanel">Loading filters...</section>;

  return (
    <div className="FiltersPanel">
      <SliderFilter
        title="MAL Score"
        step={1}
        minValue={1}
        maxValue={10}
      />
      {MULTISELECT_FILTERS_MAP.map(
        ({ title, selectionsKey, MultiselectComponent, sortFn }) => {
          let filterData = filters[selectionsKey] as FilterOptionType[];
          if (sortFn) filterData = sortFn(filterData);

          const selectedValues = selections[selectionsKey] as
            | string[]
            | string[][];

          return (
            <MultiselectComponent
              key={`${_.kebabCase(title)}-filter-component`}
              title={title}
              filterData={filterData}
              selectionsKey={selectionsKey}
              selectedValues={selectedValues}
              setSelections={setSelections}
            />
          );
        },
      )}
      <h5>{`Studios: ${filters.studios.length}`}</h5>
    </div>
  );
};

export default FiltersPanel;
