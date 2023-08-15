import React, { Dispatch, SetStateAction } from 'react';
import _ from 'lodash';

import { CheckboxColumnProps } from '../../../types/filterTypes';

const COLUMN_CLASS = 'multiselect-filter_column';

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

        const isChecked = selectedValues.includes(value);
        const label = alias || value;

        const onChange = getOnChange(value);

        return (
          <div key={id}>
            <input
              id={id}
              type="checkbox"
              checked={isChecked}
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
