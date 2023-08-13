import _ from 'lodash';

import { FilterOptionType } from '~/types/filterTypes';

const COLUMN_CLASS = 'filter-checkbox-column'
const LEFT_COLUMN_CLASS = 'filter-checkbox-column_left'

interface CheckboxColumnProps {
  title: string,
  data: FilterOptionType[],
  addRightPadding: boolean,
};

const CheckboxColumn = ({
  title,
  data,
  addRightPadding,
}: CheckboxColumnProps) => {
  const className = addRightPadding
    ? COLUMN_CLASS.concat(` ${LEFT_COLUMN_CLASS}`)
    : COLUMN_CLASS

  return (
    <div className={className}>
      {
        data.map(({ value, alias = undefined }) => {
          const id = `${_.kebabCase(title)}_filter_${_.kebabCase(value)}_checkbox`
          const label = alias || value

          return (
            <div key={id}>
              <input
                id={id}
                type="checkbox"
              />
              <label
                htmlFor={id}
                className="filter-checkbox-label"
              >
                {label}
              </label>
            </div>
          )
        }
      )}
    </div>
  )
};

export default CheckboxColumn;