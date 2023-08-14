import React, { Dispatch, SetStateAction } from 'react';
import _ from 'lodash';

import { FilterOptionType } from '../../../types/filterTypes';

const COLUMN_CLASS = 'multiselect-filter_column';

interface CheckboxColumnProps {
  title: string;
  data: FilterOptionType[];
  addRightPadding: boolean;
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
}

const CheckboxColumn = ({
  title,
  data,
  addRightPadding,
  selectedValues,
  setSelectedValues,
}: CheckboxColumnProps) => {
  const className = addRightPadding
    ? COLUMN_CLASS.concat(` ${COLUMN_CLASS}_left`)
    : COLUMN_CLASS;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: selectedValue, checked },
    } = e;

    let updatedSelections = [...selectedValues];

    if (checked) {
      updatedSelections.push(selectedValue);
    } else {
      updatedSelections = updatedSelections.filter(
        value => value === selectedValue,
      );
    }

    setSelectedValues(updatedSelections);
  };

  return (
    <div className={className}>
      {data.map(({ value, alias = undefined }) => {
        const id = `${_.kebabCase(title)}_filter_${_.kebabCase(
          value,
        )}_checkbox`;
        const label = alias || value;

        return (
          <div key={id}>
            <input
              id={id}
              type="checkbox"
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
