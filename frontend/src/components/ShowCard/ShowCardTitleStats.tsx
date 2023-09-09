import React from 'react';

import { ShowTitles } from '../../types/showTypes';

interface ShowCardTitleStatsProps {
  title: string;
  titles?: ShowTitles;
  score?: number;
  scoringUsers?: number;
  showEngTitle: boolean;
}

const formatScore = (score: number) => {
  if (!score) {
    return <span style={{ fontSize: 20 }}>Unscored</span>;
  }

  return (
    <>
      <span>{score.toFixed(2)}</span>
      <span style={{ fontSize: 14 }}>&nbsp;/ 10</span>
    </>
  );
};

const ShowCardTitleStats = ({
  title,
  titles,
  score = 0,
  scoringUsers,
  showEngTitle = false,
}: ShowCardTitleStatsProps) => {
  const formattedUsers = scoringUsers?.toLocaleString();

  return (
    <div className="show-card_details-row_info_title-stats">
      <div className="show-card_details-row_info_title-wrapper">
        <div className="show-card_details-row_info_default-title">{title}</div>
        {titles && showEngTitle && (
          <div className="show-card_details-row_info_english-title">
            {titles.english}
          </div>
        )}
      </div>
      <div className="show-card_details-row_mal-metrics">
        <div className="show-card_details-row_mal-metrics_score">
          {formatScore(score)}
        </div>
        {scoringUsers && (
          <div className="show-card_details-row_mal-metrics_users">
            <span>{formattedUsers} users</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCardTitleStats;
