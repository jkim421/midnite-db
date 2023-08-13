import React from 'react';
import _ from 'lodash';

import { FilterOptionType } from '../../../types/filterTypes';

import CheckboxColumn from './CheckboxColumn';

import { getMultiColumnData } from '../../../utils/filterUtils';

interface CheckboxColumnsProps {
  filterData: FilterOptionType[];
  title: string;
  isMultiColumn: boolean;
}

const CheckboxColumns = ({
  filterData,
  title,
  isMultiColumn,
}: CheckboxColumnsProps) => {
  let filterColumns = [filterData];

  if (isMultiColumn) filterColumns = getMultiColumnData(filterData);

  return (
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
  );
};

export default CheckboxColumns;
