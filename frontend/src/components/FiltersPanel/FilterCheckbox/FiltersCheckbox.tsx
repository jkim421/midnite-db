import _ from 'lodash';

import { FilterOptionType } from '~/types/filterTypes';

import CheckboxColumn from './CheckboxColumn';

import '../../../styles/filters.css'; //! ~/styles/filters.css import isn't working

interface FiltersCheckboxProps {
  title: string;
  filterData: FilterOptionType[];
}

const MIN_COLUMN_SIZE = 4;

const FiltersCheckbox = ({ title, filterData }: FiltersCheckboxProps) => {
  const isMultiColumn = filterData.length > MIN_COLUMN_SIZE;

  let filterColumns = [filterData];

  if (isMultiColumn) {
    // two columns
    const columnLength = Math.round(filterData.length / 2);

    filterColumns = [
      filterData.slice(0, columnLength),
      filterData.slice(columnLength),
    ];
  }

  return (
    <>
      <h5 className="filter-checkbox-group">{title}</h5>
      <section className="filter-checkbox-group-columns">
        {filterColumns.map((columnData, idx) => (
          <CheckboxColumn
            key={`${_.kebabCase(title)}-column-${idx}`}
            title={title}
            data={columnData}
            addRightPadding={isMultiColumn && idx === 0}
          />
        ))}
      </section>
    </>
  );
};

export default FiltersCheckbox;
