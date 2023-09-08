import React, { useState } from 'react';

import { ShowType, ShowYears } from '../../types/showTypes';

import '../../styles/ShowCard.css';

interface ShowCardProps {
  show: ShowType;
  ratingsMap: { [key: string]: string };
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

const ShowCard = ({ show, ratingsMap }: ShowCardProps) => {
  const {
    url,
    images,
    title,
    titles,
    years,
    type = '',
    episodes = 0,
    rating,
    score,
    rank,
    popularity,
    genres,
    themes,
    demographics,
    synopsis,
    // mal_id,
    // status,
    // source,
    // scored_by,
    // members,
    // studios,
  } = show;

  const defaultTitle = titles ? titles.default : title;
  const showEngTitle =
    titles && titles.english && titles.english !== defaultTitle;

  const ratingAlias = rating ? ratingsMap[rating] : undefined;

  return (
    <div className="show-card_wrapper">
      <div>
        <div className="show-card_details-row">
          {/* image */}
          <div className="show-card_details-row_image-wrapper">
            <a
              href={url}
              target="blank">
              <img
                className="show-card_details-row_image"
                src={images.small}></img>
            </a>
            <div className="show-card_details-row_image-tooltip">
              Visit MAL Page
            </div>
          </div>
          {/* general info */}
          <div className="show-card_details-row_info">
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
            <div className="show-card_details-row_info_type-rating">
              {ratingAlias}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
