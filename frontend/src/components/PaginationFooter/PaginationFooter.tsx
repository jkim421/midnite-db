import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { LeftArrow, RightArrow } from './icons';

import '../../styles/PaginationFooter.css';

interface PaginationFooterProps {
  page: number;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PAGE_SIZE = 50;

const PaginationFooter = ({ page, count, setPage }: PaginationFooterProps) => {
  const [pageInput, setPageInput] = useState<number>(page);
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const page = parseInt(value);

    setPageInput(page);
  };

  return (
    <div className="pagination-footer_wrapper">
      <span>Page</span>
      <input
        className="pagination-footer_input"
        type="number"
        value={pageInput}
        min={1}
        max={totalPages}
        onChange={onChange}
        placeholder="Go to page"
      />
      <span>of {totalPages}</span>
      <LeftArrow />
      <RightArrow />
    </div>
  );
};

export default PaginationFooter;
