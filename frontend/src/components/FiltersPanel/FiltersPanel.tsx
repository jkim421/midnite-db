import React, { Dispatch, SetStateAction } from 'react';
import _ from 'lodash';

import {
  FilterOptionType,
  FiltersType,
  FilterSelectionsStateType,
} from '../../types/filterTypes';

import MultiselectFilter from './MultiselectFilter';
import MultiselectFilterWithClauses from './MultiselectFilterWithClauses';

interface FiltersPanelProps {
  isLoading: boolean;
  filters: FiltersType;
  selections: FilterSelectionsStateType;
  setSelections: Dispatch<SetStateAction<FilterSelectionsStateType>>;
}

const MULTISELECT_FILTERS_MAP = [
  {
    title: 'Media Type',
    selectionsKey: 'type',
    Component: MultiselectFilter,
  },
  {
    title: 'Status',
    selectionsKey: 'type',
    Component: MultiselectFilter,
  },
  {
    title: 'Rating',
    selectionsKey: 'rating',
    Component: MultiselectFilter,
  },
  {
    title: 'Genre',
    selectionsKey: 'genre',
    Component: MultiselectFilterWithClauses,
  },
  {
    title: 'Theme',
    selectionsKey: 'theme',
    Component: MultiselectFilterWithClauses,
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
      {MULTISELECT_FILTERS_MAP.map(({ title, selectionsKey, Component }) => {
        const filterData = filters[selectionsKey] as FilterOptionType[];

        return (
          <Component
            key={`${_.kebabCase(title)}-filter-component`}
            title={title}
            filterData={filterData}
            selectionsKey={selectionsKey}
            selections={selections}
            setSelections={setSelections}
          />
        );
      })}
      <h5>{`Demographics: ${filters.demographic.length}`}</h5>
      <h5>{`Studios: ${filters.studios.length}`}</h5>
    </div>
  );
};

export default FiltersPanel;
