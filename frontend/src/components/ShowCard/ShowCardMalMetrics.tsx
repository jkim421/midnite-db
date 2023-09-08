import React from 'react';

import '../../styles/ShowCard.css';

interface ShowCardMalMetricsProps {
  score?: number;
  scoringUsers?: number;
}

const ShowCardMalMetrics = ({
  score,
  scoringUsers,
}: ShowCardMalMetricsProps) => {
  const formattedScore = score ? score.toFixed(2) : 'N/A';
  const formattedUsers = scoringUsers?.toLocaleString();

  return (
    <div className="show-card_details-row_mal-metrics">
      <div className="show-card_details-row_mal-metrics_score">
        <span>{formattedScore}</span>
        <span style={{ fontSize: 14 }}>&nbsp;/ 10</span>
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
