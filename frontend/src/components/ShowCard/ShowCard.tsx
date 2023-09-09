import React from 'react';

import { ShowType } from '../../types/showTypes';

import ShowCardImage from './ShowCardImage';
import ShowCardDetails from './ShowCardDetails';
import ShowCardTitleStats from './ShowCardTitleStats';
import ShowCardTags from './ShowCardTags';
import ShowCardSynopsis from './ShowCardSynopsis';

import '../../styles/ShowCard.css';

interface ShowCardProps {
  show: ShowType;
  ratingsMap: { [key: string]: string };
}

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
    scored_by,
    // rank,
    // popularity,
    genres,
    themes,
    demographics,
    synopsis,
    mal_id,
    // status,
    // source,
    // members,
    // studios,
  } = show;

  const defaultTitle = titles ? titles.default : title;
  const showEngTitle = Boolean(
    titles && titles.english && titles.english !== defaultTitle,
  );

  const ratingAlias = rating ? ratingsMap[rating] : undefined;

  return (
    <div className="show-card_wrapper">
      <div className="show-card_details-row">
        <ShowCardImage
          images={images}
          url={url}
        />
        <div className="show-card_details-row_info">
          <ShowCardTitleStats
            title={defaultTitle}
            titles={titles}
            showEngTitle={showEngTitle}
            score={score}
            scoringUsers={scored_by}
          />
          <ShowCardDetails
            years={years}
            type={type}
            episodes={episodes}
            rating={ratingAlias}
            showEngTitle={showEngTitle}
          />
          <ShowCardTags
            genres={genres}
            themes={themes}
            demographics={demographics}
          />
        </div>
      </div>
      <ShowCardSynopsis synopsis={synopsis} />
    </div>
  );
};

export default ShowCard;
