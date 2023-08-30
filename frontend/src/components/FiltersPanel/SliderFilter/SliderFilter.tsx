import React, { useState } from 'react';

import '../../../styles/SliderFilter.css';

interface SliderFilter {
  title: string;
  step: number;
  minValue: number;
  maxValue: number;
}

interface RangePositionsArgs {
  rangeBottom: number;
  rangeTop: number;
  maxValue: number;
  minValue: number;
}

const SLIDER_WIDTH = 280;

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

const SliderFilter = ({ title, step, minValue, maxValue }: SliderFilter) => {
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

  return (
    <div>
      <h5 className="filter_title">{title}</h5>
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
          <div
            className="slider-filter_track_handle"
            style={{ left: `${rangeTopPos}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderFilter;
