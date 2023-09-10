import React from 'react';

import MainHeaderAbout from './MainHeaderAbout';

interface MainHeaderProps {
  count: number;
}

const MainHeader = ({ count }: MainHeaderProps) => {
  const formattedCount = count ? count.toLocaleString() : 0;

  return (
    <header className="app-header">
      <div className="app-header_title-count">
        <h3 style={{ margin: 0 }}>midnite-db</h3>
        {count != 0 && (
          <div className="app-header_count">{formattedCount} entries</div>
        )}
      </div>
      <MainHeaderAbout />
    </header>
  );
};

export default MainHeader;
