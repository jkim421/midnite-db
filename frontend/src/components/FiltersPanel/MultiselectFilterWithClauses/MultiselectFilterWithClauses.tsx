import React, { useState } from 'react';
import _ from 'lodash';

import {
  MultiselectFilterProps,
  FilterSelectionsStateType,
} from '../../../types/filterTypes';

import CheckboxColumns from '../CheckboxColumns';
import ClauseTags from './ClauseTags';

import { getIsMultiColumn } from '../../../utils/filterUtils';
import '../../../styles/filters.css';

const MAX_CLAUSES = 3;

const MultiselectFilterWithClauses = ({
  title,
  filterData,
  selectionsKey,
  selectedValues,
  setSelections,
}: MultiselectFilterProps) => {
  const [currentSelections, setCurrentSelections] = useState<string[]>([]);

  const isMultiColumn = getIsMultiColumn(filterData);

  const getOnChange =
    (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      let updatedSelections = [...currentSelections] as string[];

      if (checked) {
        updatedSelections.push(value);
      } else {
        updatedSelections = updatedSelections.filter(
          selection => selection !== value,
        );
      }

      setCurrentSelections(updatedSelections.sort());
    };

  const onSave = () => {
    const updatedClauses = [...selectedValues] as string[][];

    updatedClauses.push(currentSelections);

    setSelections((currentFilters: FilterSelectionsStateType) => ({
      ...currentFilters,
      [selectionsKey]: updatedClauses,
    }));

    setCurrentSelections([]);
  };

  const isButtonDisabled = selectedValues.length >= MAX_CLAUSES;

  return (
    <section>
      <h5 className="multiselect-filter_title">{title}</h5>
      <ClauseTags
        title={title}
        clauses={selectedValues as string[][]}
      />
      <button
        onClick={onSave}
        disabled={isButtonDisabled}>
        Save Clause
      </button>
      <CheckboxColumns
        filterData={filterData}
        title={title}
        isMultiColumn={isMultiColumn}
        getOnChange={getOnChange}
        selectedValues={currentSelections as string[]}
      />
    </section>
  );
};

export default MultiselectFilterWithClauses;
