import React from 'react';
import _ from 'lodash';

interface ClauseTagsProps {
  title: string;
  clauses: string[][];
  getRemoveClause: (idx: number) => React.MouseEventHandler<HTMLDivElement>;
}

const getClauseContent = (clause: string[]) =>
  clause.reduce((str: string, value: string, idx: number) => {
    str = str.concat(value);

    if (idx !== clause.length - 1) {
      str = str.concat(' + ');
    }

    return str;
  }, '');

const ClauseTags = ({ clauses, title, getRemoveClause }: ClauseTagsProps) => {
  return (
    <div>
      {clauses.map((clause: string[], idx: number) => {
        const key = `${_.kebabCase(title)}-filter_clause_${idx}`;
        const content = getClauseContent(clause);

        const removeClauseFn = getRemoveClause(idx);

        return (
          <div
            key={key}
            className="filter-clause-tag"
            onClick={removeClauseFn}>
            <span>{content}</span>
            <span>x</span>
          </div>
        );
      })}
    </div>
  );
};

export default ClauseTags;
