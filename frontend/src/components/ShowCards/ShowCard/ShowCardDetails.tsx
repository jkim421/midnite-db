import React from 'react';

import { ShowYears } from '../../../types/showTypes';

import '../../../styles/ShowCard.css';

interface ShowCardDetailsProps {
  years: ShowYears;
  type: string;
  episodes: number;
  rating?: string;
  showEngTitle: boolean;
}

const formatYears = (years: ShowYears) => {
  const { start, end } = years;

  if (!start) return;
  else if (!end || start == end) return start.toString();
  else return `${start} - ${end}`;
};

const formatTypeEpisodesRating = (
  type: string,
  episodes: number,
  rating: string,
) => {
  const isSingleEpMovie = type === 'Movie' && episodes === 1;

  let str = type;

  if (rating) {
    str = str.concat(`  •  ${rating}`);
  }

  if (episodes && !isSingleEpMovie) {
    str = str.concat(`  •  ${episodes} episodes`);
  }

  return str;
};

const ShowCardDetails = ({
  years,
  type,
  episodes,
  rating = '',
  showEngTitle,
}: ShowCardDetailsProps) => {
  return (
    <div>
      <div
        style={{ marginTop: showEngTitle ? 12 : 0 }}
        className="show-card_details-row_info-item">
        {formatYears(years)}
      </div>
      <div className="show-card_details-row_info-item">
        {formatTypeEpisodesRating(type, episodes, rating)}
      </div>
    </div>
  );
};

export default ShowCardDetails;
