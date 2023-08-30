import React, { useState } from 'react';

import '../../../styles/SliderFilter.css';

interface SliderFilter {
  title: string;
  step: number;
  minValue: number;
  maxValue: number;
  showReset?: boolean;
}

interface RangePositionsArgs {
  rangeBottom: number;
  rangeTop: number;
  maxValue: number;
  minValue: number;
}

const HANDLE_LABEL_CHAR_ADJUSTMENT = 3;

const getMarginLeftAdjustment = (value: number) => {
  const str = value.toString();
  const leftAdjustment = str.length * HANDLE_LABEL_CHAR_ADJUSTMENT;

  return `-${leftAdjustment}px`;
};

const getRangePositions = ({
  rangeBottom,
  rangeTop,
  maxValue,
  minValue,
}: RangePositionsArgs) => {
  const rangeBottomPos =
    ((rangeBottom - minValue) / (maxValue - minValue)) * 100;
  const rangeTopPos = ((rangeTop - minValue) / (maxValue - minValue)) * 100;

  return { rangeBottomPos, rangeTopPos };
};

const SliderFilter = ({
  title,
  step,
  minValue,
  maxValue,
  showReset,
}: SliderFilter) => {
  const [rangeBottom, setRangeBottom] = useState<number>(minValue);
  const [rangeTop, setRangeTop] = useState<number>(maxValue);

  const onBottomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = parseInt(e.target.value);
    const updatedRangeBottom = Math.min(value, rangeTop - step);

    setRangeBottom(updatedRangeBottom);
  };

  const onTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = parseInt(e.target.value);
    const updatedRangeTop = Math.max(value, rangeBottom + step);

    setRangeTop(updatedRangeTop);
  };

  const { rangeBottomPos, rangeTopPos } = getRangePositions({
    rangeBottom,
    rangeTop,
    maxValue,
    minValue,
  });

  const shouldBottomLabelFlip = rangeTopPos - rangeBottomPos < 11;

  const resetFilters = () => {
    setRangeBottom(minValue);
    setRangeTop(maxValue);
  };

  return (
    <div>
      <div
        className="slider-filter_header"
        style={{ marginBottom: showReset ? 8 : 0 }}>
        <h5 className="filter_title">{title}</h5>
        {showReset && (
          <div
            className="slider-filter_header_reset"
            onClick={resetFilters}>
            Reset
          </div>
        )}
      </div>
      <div className="slider-filter_wrapper">
        <div className="slider-filter_inputs_wrapper">
          <input
            className="slider-filter_input"
            type="range"
            value={rangeBottom}
            step={step}
            min={minValue}
            max={maxValue}
            onChange={onBottomChange}
          />
          <input
            className="slider-filter_input"
            type="range"
            value={rangeTop}
            step={step}
            min={minValue}
            max={maxValue}
            onChange={onTopChange}
          />
        </div>

        <div className="slider-filter_track_wrapper">
          <div className="slider-filter_track">
            <div
              className="slider-filter_track_inner"
              style={{
                left: `${rangeBottomPos}%`,
                right: `${100 - rangeTopPos}%`,
              }}
            />
          </div>
          <div
            className="slider-filter_track_handle"
            style={{ left: `${rangeBottomPos}%` }}
          />
          <span
            className="slider-filter_track_handle-value"
            style={{
              top: shouldBottomLabelFlip ? -20 : 20,
              left: `${rangeBottomPos}%`,
              marginLeft: getMarginLeftAdjustment(rangeBottom),
            }}>
            {rangeBottom}
          </span>
          <div
            className="slider-filter_track_handle"
            style={{ left: `${rangeTopPos}%` }}
          />
          <span
            className="slider-filter_track_handle-value"
            style={{
              left: `${rangeTopPos}%`,
              marginLeft: getMarginLeftAdjustment(rangeTop),
            }}>
            {rangeTop}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SliderFilter;
