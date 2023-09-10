import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { LeftArrow, RightArrow } from '../icons';

import '../../styles/PaginationFooter.css';

interface PaginationFooterProps {
  page: number;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PAGE_SIZE = 50;

const PaginationFooter = ({ page, count, setPage }: PaginationFooterProps) => {
  const [pageInput, setPageInput] = useState<number | undefined>(undefined);
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const handlePageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const page = parseInt(value);

    setPageInput(page);
  };

  const handlePageInputSubmission = () => {
    if (pageInput && pageInput <= totalPages) {
      setPage(pageInput);
    }
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (pageInput && e.key === 'Enter') {
      if (pageInput > totalPages) return;

      handlePageInputSubmission();
    }
  };

  const handleArrowClick = (direction: string) => {
    if (direction === 'prev') {
      if (page <= 1) return;

      setPage(currentPage => currentPage - 1);
    } else {
      if (page + 1 > totalPages) return;

      setPage(currentPage => currentPage + 1);
    }
  };

  return (
    <div className="pagination-footer_wrapper">
      <span style={{ minWidth: 120 }}>
        Page {page} / {totalPages}
      </span>
      <LeftArrow onClick={() => handleArrowClick('prev')} />
      <RightArrow onClick={() => handleArrowClick('next')} />
      <input
        className="pagination-footer_input"
        type="number"
        value={pageInput}
        min={1}
        max={totalPages}
        onChange={handlePageInput}
        onKeyDown={handleInputEnter}
      />
      <button
        className="pagination-footer_page-btn"
        onClick={handlePageInputSubmission}>
        Go to page
      </button>
    </div>
  );
};

export default PaginationFooter;
