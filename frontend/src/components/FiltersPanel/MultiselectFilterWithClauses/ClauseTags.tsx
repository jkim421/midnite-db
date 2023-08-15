import React from 'react';
import _ from 'lodash';

interface ClauseTagsProps {
  title: string;
  clauses: string[][];
}

const ClauseTags = ({ clauses, title }: ClauseTagsProps) => {
  return (
    <div>
      {clauses.map((clause, idx: number) => {
        const content = clause.reduce(
          (str: string, value: string, idx: number) => {
            str = str.concat(value);

            if (idx !== clause.length - 1) {
              str = str.concat(' + ');
            }

            return str;
          },
          '',
        );

        const key = `${_.kebabCase(title)}-filter_clause_${idx}`;

        return (
          <div
            key={key}
            className="filter-clause-tag">
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default ClauseTags;
