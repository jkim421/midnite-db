import React from 'react';

import { ShowTitles, ShowYears } from '../../types/showTypes';

import '../../styles/ShowCard.css';

interface ShowCardDetailsProps {
  title: string;
  titles?: ShowTitles;
  years: ShowYears;
  type: string;
  episodes: number;
  rating?: string;
}

const formatYears = (years: ShowYears) => {
  const { start, end } = years;

  if (!start) return;
  else if (!end) return start.toString();
  else return `${start} - ${end}`;
};

const formatTypeEpisodes = (type: string, episodes: number) => {
  const isSingleEpMovie = type === 'Movie' && episodes === 1;

  if (!episodes || isSingleEpMovie) return type;

  return `${type} (${episodes} episodes)`;
};

const ShowCardDetails = ({
  title,
  titles,
  years,
  type,
  episodes,
  rating,
}: ShowCardDetailsProps) => {
  const defaultTitle = titles ? titles.default : title;
  const showEngTitle =
    titles && titles.english && titles.english !== defaultTitle;

  return (
    <>
      <div className="show-card_details-row_info_default-title">
        {defaultTitle}
      </div>
      {showEngTitle && (
        <div className="show-card_details-row_info_english-title">
          {titles.english}
        </div>
      )}
      <div className="show-card_details-row_info_years">
        {formatYears(years)}
      </div>
      <div className="show-card_details-row_info_type-episodes">
        {formatTypeEpisodes(type, episodes)}
      </div>
      <div className="show-card_details-row_info_type-rating">{rating}</div>
    </>
  );
};

export default ShowCardDetails;
