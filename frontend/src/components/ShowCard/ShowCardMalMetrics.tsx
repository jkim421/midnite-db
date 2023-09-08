import React from 'react';

import '../../styles/ShowCard.css';

interface ShowCardMalMetricsProps {
  score?: number;
  scoringUsers?: number;
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

const ShowCardMalMetrics = ({
  score = 0,
  scoringUsers,
}: ShowCardMalMetricsProps) => {
  const formattedUsers = scoringUsers?.toLocaleString();

  return (
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
  );
};

export default ShowCardMalMetrics;
