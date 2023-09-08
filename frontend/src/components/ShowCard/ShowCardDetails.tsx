import React from 'react';

import { ShowYears } from '../../types/showTypes';

import '../../styles/ShowCard.css';

interface ShowCardDetailsProps {
  years: ShowYears;
  type: string;
  episodes: number;
  rating?: string;
}

const formatYears = (years: ShowYears) => {
  const { start, end } = years;

  if (!start) return;
  else if (!end || start == end) return start.toString();
  else return `${start} - ${end}`;
};

const formatTypeEpisodes = (type: string, episodes: number) => {
  const isSingleEpMovie = type === 'Movie' && episodes === 1;

  if (!episodes || isSingleEpMovie) return type;

  return `${type} (${episodes} episodes)`;
};

const ShowCardDetails = ({
  years,
  type,
  episodes,
  rating = '',
}: ShowCardDetailsProps) => {
  return (
    <div>
      <div className="show-card_details-row_info-item">
        {formatYears(years)}
      </div>
      <div className="show-card_details-row_info-item">
        {formatTypeEpisodes(type, episodes)}
      </div>
      <div className="show-card_details-row_info-item">{rating}</div>
    </div>
  );
};

export default ShowCardDetails;
