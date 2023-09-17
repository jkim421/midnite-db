import React from 'react';

import HeaderAbout from './HeaderAbout';

import '../../styles/MainHeader.css';

const Header = () => (
  <header className="app-header">
    <div className="app-header_title">
      <h3 style={{ margin: 0 }}>midnite-db</h3>
    </div>
    <HeaderAbout />
  </header>
);

export default Header;
