import React from 'react';

import {
  MultiselectFilterWithClausesProps,
  FilterSelectionsStateType,
} from '../../../types/filterTypes';

import CheckboxColumns from '../CheckboxColumns';
import ClauseTags from './ClauseTags';

import { getIsMultiColumn } from '../../../utils/filterUtils';
import { GENRES_COLOR, THEMES_COLOR } from '../../../constants/constants';

import '../../../styles/filters.css';

interface ColorMap {
  [key: string]: string;
  Genre: string;
  Theme: string;
}

const MAX_CLAUSES = 3;

const COLOR_MAP: ColorMap = {
  Genre: GENRES_COLOR,
  Theme: THEMES_COLOR,
};

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

  const tagColor = COLOR_MAP[title];

  const buttonTitle = isButtonDisabled
    ? `Make selections to save a ${title.toLowerCase()} set`
    : '';

  return (
    <section className="multiselect-filter-wrapper">
      <div className="multiselect-filter_header">
        <h5 className="filter_title">{title}</h5>
        <span
          className="multiselect-filter_header_tag"
          style={{ border: `1px solid ${tagColor}` }}
        />
      </div>
      <ClauseTags
        title={title}
        clauses={selectedValues as string[][]}
        getRemoveClause={getRemoveClause}
        tagColor={tagColor}
      />
      <button
        className="multiselect-filter_clause-btn"
        onClick={onSaveBtnClick}
        disabled={isButtonDisabled}
        title={buttonTitle}>
        Save {title} Set
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
