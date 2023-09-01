import React from 'react';

interface ArrowProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

interface CloseIconProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const LeftArrow = ({ onClick }: ArrowProps) => (
  <div
    className="pagination-footer_arrow"
    onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 320 512">
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  </div>
);

export const RightArrow = ({ onClick }: ArrowProps) => (
  <div
    className="pagination-footer_arrow pagination-footer_arrow_right"
    onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 320 512">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  </div>
);

export const CloseIcon = ({ onClick }: CloseIconProps) => (
  <div
    className="filter-clause-tag_remove"
    onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
      style={{ fill: 'white' }}>
      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
    </svg>
  </div>
);
