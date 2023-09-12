import React from 'react';
import _ from 'lodash';

import { CheckboxColumnProps } from '../../../types/filterTypes';

const COLUMN_CLASS = 'multiselect-filter_column';

const MAX_CLAUSE_LENGTH = 5;

const CheckboxColumn = ({
  title,
  data,
  addRightPadding,
  getOnChange,
  selectedValues,
}: CheckboxColumnProps) => {
  const className = addRightPadding
    ? COLUMN_CLASS.concat(` ${COLUMN_CLASS}_left`)
    : COLUMN_CLASS;

  return (
    <div className={className}>
      {data.map(({ value, alias = undefined }) => {
        const id = `${_.kebabCase(title)}_filter_${_.kebabCase(
          value,
        )}_checkbox`;

        const label = alias || value;

        const onChange = getOnChange(value);

        const isChecked = selectedValues.includes(value);

        const isDisabled =
          !isChecked && selectedValues.length >= MAX_CLAUSE_LENGTH;

        const className = isDisabled
          ? 'filter-checkbox-wrapper filter-checkbox_disabled'
          : 'filter-checkbox-wrapper';

        return (
          <div
            key={id}
            className={className}>
            <input
              id={id}
              className="filter-checkbox-input"
              type="checkbox"
              checked={isChecked}
              disabled={isDisabled}
              value={value}
              onChange={onChange}
            />
            <label
              htmlFor={id}
              className="filter-checkbox-label">
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxColumn;
