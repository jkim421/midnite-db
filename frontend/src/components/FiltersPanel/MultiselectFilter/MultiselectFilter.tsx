import React from 'react';

import { FilterOptionType } from '../../../types/filterTypes';

import CheckboxColumns from '../CheckboxColumns/CheckboxColumns';

import '../../../styles/filters.css';

interface MultiselectFilterProps {
  title: string;
  filterData: FilterOptionType[];
}

const MIN_COLUMN_SIZE = 4;

const MultiselectFilter = ({ title, filterData }: MultiselectFilterProps) => {
  const isMultiColumn = filterData.length > MIN_COLUMN_SIZE;

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
