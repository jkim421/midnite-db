import React from 'react';
import _ from 'lodash';

import { CloseIcon } from '../../icons';

interface ClauseTagsProps {
  title: string;
  clauses: string[][];
  getRemoveClause: (idx: number) => React.MouseEventHandler<HTMLDivElement>;
  tagColor: string;
}

const getClauseContent = (clause: string[]) =>
  clause.reduce((str: string, value: string, idx: number) => {
    str = str.concat(value);

    if (idx !== clause.length - 1) {
      str = str.concat(' + ');
    }

    return str;
  }, '');

const ClauseTags = ({
  clauses,
  title,
  getRemoveClause,
  tagColor,
}: ClauseTagsProps) => {
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
            style={{
              color: tagColor,
              border: `1px solid ${tagColor}`,
            }}>
            <span className="filter-clause-tag_content">{content}</span>
            <CloseIcon
              classes={['icon-hover']}
              onClick={removeClauseFn}
              tagColor={tagColor}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ClauseTags;
