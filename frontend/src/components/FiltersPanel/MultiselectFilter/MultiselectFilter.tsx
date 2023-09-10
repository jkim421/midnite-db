import React from 'react';

import {
  MultiselectFilterProps,
  FilterSelectionsStateType,
} from '../../../types/filterTypes';

import CheckboxColumns from '../CheckboxColumns/CheckboxColumns';

import { getIsMultiColumn } from '../../../utils/filterUtils';
import { DEMOGRAPHICS_COLOR } from '../../../constants/colors';

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

  const isDemographic = title === 'Demographic';

  return (
    <section className="multiselect-filter-wrapper">
      <div className="multiselect-filter_header">
        <h5 className="filter_title">{title}</h5>
        {isDemographic && (
          <span
            className="multiselect-filter_header_tag"
            style={{ border: `1px solid ${DEMOGRAPHICS_COLOR}` }}
          />
        )}
      </div>
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
