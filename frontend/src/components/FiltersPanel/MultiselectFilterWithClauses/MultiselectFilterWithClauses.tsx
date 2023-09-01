import React from 'react';

import {
  MultiselectFilterWithClausesProps,
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
  currentSelections,
  currentSelectionsKey,
}: MultiselectFilterWithClausesProps) => {
  const isMultiColumn = getIsMultiColumn(filterData);
  const isButtonDisabled =
    selectedValues.length >= MAX_CLAUSES || currentSelections.length == 0;

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

      setSelections((currentFilters: FilterSelectionsStateType) => ({
        ...currentFilters,
        [currentSelectionsKey]: updatedSelections.sort(),
      }));
    };

  const onSaveBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedClauses = [...selectedValues] as string[][];

    updatedClauses.push(currentSelections);

    setSelections((currentFilters: FilterSelectionsStateType) => ({
      ...currentFilters,
      [selectionsKey]: updatedClauses,
      [currentSelectionsKey]: [],
    }));
  };

  const getRemoveClause =
    (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      const updatedClauses = [...selectedValues] as string[][];
      updatedClauses.splice(idx, 1);

      setSelections((currentFilters: FilterSelectionsStateType) => ({
        ...currentFilters,
        [selectionsKey]: updatedClauses,
      }));
    };

  return (
    <section>
      <h5 className="filter_title">{title}</h5>
      <ClauseTags
        title={title}
        clauses={selectedValues as string[][]}
        getRemoveClause={getRemoveClause}
      />
      <button
        onClick={onSaveBtnClick}
        disabled={isButtonDisabled}>
        Save Clause
      </button>
      <CheckboxColumns
        filterData={filterData}
        title={title}
        isMultiColumn={isMultiColumn}
        getOnChange={getOnChange}
        selectedValues={currentSelections}
      />
    </section>
  );
};

export default MultiselectFilterWithClauses;
