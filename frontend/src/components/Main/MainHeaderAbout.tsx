import React, { useState } from 'react';

import { CloseIcon } from '../icons';

const MainHeaderAbout = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  let aboutClassNames = 'app-header_about-modal';

  if (isAboutOpen) {
    aboutClassNames = aboutClassNames.concat(' app-header_about-modal-open');
  }

  const onClick = () => setIsAboutOpen(!isAboutOpen);

  return (
    <>
      <div
        className="app-header_about-btn"
        onClick={onClick}>
        <span>?</span>
      </div>
      <div className={aboutClassNames}>
        <div className="app-header_about-modal_content">
          <div className="about-header_about-header">
            <div>About midnite-db</div>
            <CloseIcon
              classes={['icon-hover', 'about-header_close-btn']}
              onClick={onClick}
            />
          </div>
          <div>
            <div style={{ marginTop: 8 }}>
              <span>
                midnite-db provides access to a scraped instance of the&nbsp;
              </span>
              <a
                className="about-header_profile-link"
                href="https://myanimelist.net/anime.php"
                target="blank">
                <span>MyAnimeList</span>
              </a>
              <span>
                &nbsp;media database to enable more powerful queries than are
                possible through the the MAL site.
              </span>
            </div>
            <div style={{ marginTop: 12 }}>
              <span>Work in progress, by&nbsp;</span>
              <a
                className="about-header_profile-link"
                href="https://github.com/jkim421"
                target="blank">
                <span>John Kim</span>
              </a>
              <span>.</span>
            </div>
            <div style={{ marginTop: 24, textDecoration: 'underline' }}>
              Filters Guide
            </div>
            <div>
              <div className="about-header_about-section-title">OR Filters</div>
              <div className="about-header_about-section-subtitle">
                Option A OR Option B OR ...
              </div>
              <ul className="app-header_about-list">
                <li>Media Type</li>
                <li>Status</li>
                <li>Rating</li>
                <li>Demographic</li>
              </ul>
            </div>
            <div>
              <div className="about-header_about-section-title">
                AND/OR Filters
              </div>
              <div className="about-header_about-section-subtitle">
                <div>If no sets: Option A AND Option B AND ...</div>
                <div>If 1+ sets: Set A OR Set B OR ...</div>
              </div>
              <ul className="app-header_about-list">
                <li>Genre</li>
                <li>Theme</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeaderAbout;
