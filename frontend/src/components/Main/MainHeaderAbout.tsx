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
        <div style={{ padding: '12px 12px 24px 24px' }}>
          <div className="about-header_about-header">
            <div>About midnite-db</div>
            <CloseIcon
              hoverClass="icon-hover"
              onClick={onClick}
              style={{
                height: 16,
                width: 16,
                margin: 0,
                padding: 8,
                justifyContent: 'center',
              }}
            />
          </div>
          <div>
            <span>Work in progress, by&nbsp;</span>
            <a
              className="about-header_profile-link"
              href="https://github.com/jkim421"
              target="blank">
              <span>John Kim</span>
            </a>
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
    </>
  );
};

export default MainHeaderAbout;
