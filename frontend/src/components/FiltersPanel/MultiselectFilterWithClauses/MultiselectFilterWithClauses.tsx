import React, { useState } from 'react';

import { FilterOptionType } from '../../../types/filterTypes';

import CheckboxColumns from '../CheckboxColumns';

import { getIsMultiColumn } from '../../../utils/filterUtils';
import '../../../styles/filters.css';

interface MultiselectFilterWithClausesProps {
  title: string;
  filterData: FilterOptionType[];
}

const MultiselectFilterWithClauses = ({
  title,
  filterData, // selectionsKey,
} // selections,
// setSelections,
: MultiselectFilterWithClausesProps) => {
  const [clauses, setClauses] = useState<[string][]>([]);

  const isMultiColumn = getIsMultiColumn(filterData);

  return (
    <section>
      <h5 className="multiselect-filter_title">{title}</h5>
      <button>Save Clause</button>
      <CheckboxColumns
        filterData={filterData}
        title={title}
        isMultiColumn={isMultiColumn}
        setClauses={setClauses}
      />
    </section>
  );
};

export default MultiselectFilterWithClauses;
