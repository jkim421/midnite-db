import React from 'react';

import {
  MultiselectFilterProps,
  FilterSelectionsStateType,
} from '../../../types/filterTypes';

import CheckboxColumns from '../CheckboxColumns/CheckboxColumns';

import { getIsMultiColumn } from '../../../utils/filterUtils';
import '../../../styles/filters.css';

const MultiselectFilter = ({
  title,
  filterData,
  selectionsKey,
  selectedValues,
  setSelections,
}: MultiselectFilterProps) => {
  const isMultiColumn = getIsMultiColumn(filterData);

  const getOnChange =
    (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      let updatedSelections = [...selectedValues] as string[];

      if (checked) {
        updatedSelections.push(value);
      } else {
        updatedSelections = updatedSelections.filter(
          selection => selection !== value,
        );
      }

      setSelections((currentFilters: FilterSelectionsStateType) => ({
        ...currentFilters,
        [selectionsKey]: updatedSelections,
      }));
    };

  return (
    <section>
      <h5 className="multiselect-filter_title">{title}</h5>
      <CheckboxColumns
        filterData={filterData}
        title={title}
        isMultiColumn={isMultiColumn}
        getOnChange={getOnChange}
        selectedValues={selectedValues as string[]}
      />
    </section>
  );
};

export default MultiselectFilter;
