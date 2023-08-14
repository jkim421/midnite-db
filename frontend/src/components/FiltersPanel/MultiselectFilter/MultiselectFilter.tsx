import React from 'react';

import { MultiselectFilterProps } from '../../../types/filterTypes';

import CheckboxColumns from '../CheckboxColumns/CheckboxColumns';

import { getIsMultiColumn } from '../../../utils/filterUtils';
import '../../../styles/filters.css';

const MultiselectFilter = ({
  title,
  filterData,
  selectionsKey,
  selections,
  setSelections,
}: MultiselectFilterProps) => {
  const isMultiColumn = getIsMultiColumn(filterData);

  return (
    <section>
      <h5 className="multiselect-filter_title">{title}</h5>
      <CheckboxColumns
        filterData={filterData}
        title={title}
        isMultiColumn={isMultiColumn}
      />
    </section>
  );
};

export default MultiselectFilter;
