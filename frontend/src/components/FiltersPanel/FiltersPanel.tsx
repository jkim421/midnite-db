import React from 'react';

import { FiltersType } from '../../types/filterTypes';

import MultiselectFilter from './MultiselectFilter';

interface FiltersPanelProps {
  isLoading: boolean;
  filters: FiltersType;
}

const FiltersPanel = ({ isLoading, filters }: FiltersPanelProps) => {
  // TODO - build out full loading ui
  if (isLoading)
    return <section className="FiltersPanel">Loading filters...</section>;

  //! multi-line object formatting not working
  const { type, status, rating, genre, theme, demographic, studios } = filters;

  return (
    <div className="FiltersPanel">
      <MultiselectFilter
        title="Media Type"
        filterData={type}
      />
      <MultiselectFilter
        title="Status"
        filterData={status}
      />
      <MultiselectFilter
        title="Rating"
        filterData={rating}
      />
      <MultiselectFilter
        title="Genre"
        filterData={genre}
      />
      <MultiselectFilter
        title="Theme"
        filterData={theme}
      />
      <MultiselectFilter
        title="Demographic"
        filterData={demographic}
      />
      <h5>{studios.length}</h5>
    </div>
  );
};

export default FiltersPanel;
