import React from 'react';

import MainHeaderAbout from './MainHeaderAbout';

import '../../styles/MainHeader.css';

const MainHeader = () => (
  <header className="app-header">
    <div className="app-header_title">
      <h3 style={{ margin: 0 }}>midnite-db</h3>
    </div>
    <MainHeaderAbout />
  </header>
);

export default MainHeader;
