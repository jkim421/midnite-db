import React from 'react';
import _ from 'lodash';

import FiltersCheckbox from '../FilterCheckbox';

const FiltersPanel = ({ filters }) => {
  if (_.isEmpty(filters)) return null

  const {
    type,
    status,
    rating,
    genre,
    theme,
    demographic,
    studios,
  } = filters;

  return (
    <section className="FiltersPanel">
      <FiltersCheckbox
        title="Media Type"
        filterData={type}
      />
      <FiltersCheckbox
        title="Status"
        filterData={status}
      />
      <FiltersCheckbox
        title="Rating"
        filterData={rating}
      />
      <FiltersCheckbox
        title="Genre"
        filterData={genre}
      />
      <FiltersCheckbox
        title="Theme"
        filterData={theme}
      />
      <FiltersCheckbox
        title="Demographic"
        filterData={demographic}
      />
      <h5>{studios.length}</h5>
    </section>
  )
};

export default FiltersPanel;
