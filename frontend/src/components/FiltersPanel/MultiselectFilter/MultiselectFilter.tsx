import React from 'react';

import { FilterOptionType } from '../../../types/filterTypes';

import CheckboxColumn from './CheckboxColumn';

import '../../../styles/filters.css'; //! ~/styles/filters.css import isn't working

interface MultiselectFilterProps {
  title: string;
  filterData: FilterOptionType[];
}

const MIN_COLUMN_SIZE = 4;

const MultiselectFilter = ({ title, filterData }: MultiselectFilterProps) => {
  const isMultiColumn = filterData.length > MIN_COLUMN_SIZE;

  let filterColumns = [filterData];

  if (isMultiColumn) {
    // two columns
    const columnLength = Math.round(filterData.length / 2);

    filterColumns = [
      filterData.slice(0, columnLength),
      filterData.slice(columnLength),
    ];
  }

  return (
    <section>
      <h5 className="multiselect-filter_title">{title}</h5>
      <div className="multiselect-filter_columns">
        {filterColumns.map((columnData, idx) => (
          <CheckboxColumn
            key={`${_.kebabCase(title)})-filter_column-${idx}`}
        title={title}
            data={columnData}
            addRightPadding={isMultiColumn && idx === 0}
      />
        ))}
      </div>
    </section>
  );
};

export default MultiselectFilter;
