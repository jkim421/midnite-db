import React, { useState } from 'react';

import { DownCaret, UpCaret } from '../icons';

interface ShowCardSynopsisProps {
  synopsis?: string;
}

const EXPANDED_CLASS = 'show_card_synopsis_expanded';

const ShowCardSynopsis = ({ synopsis }: ShowCardSynopsisProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!synopsis) {
    return <div style={{ paddingTop: 24 }} />;
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsOpen(!isOpen);
  };

  const Icon = isOpen ? UpCaret : DownCaret;

  let contentClasses = 'show-card_synopsis_content-wrapper';

  if (isOpen) {
    contentClasses = contentClasses.concat(` ${EXPANDED_CLASS}`);
  }

  const cleanedSynonpsis = synopsis.replace('[Written by MAL Rewrite]', '');

  return (
    <div className="show-card_synopsis">
      <div
        className="show-card_synopsis_toggle"
        onClick={onClick}>
        <div className="show-card_synopsis_toggle_label">
          <span style={{ marginRight: 12 }}>Synopsis</span>
          <Icon />
        </div>
      </div>
      <div className={contentClasses}>
        <span className="show-card_synopsis_content">
          &nbsp;&nbsp;&nbsp;&nbsp;
          {cleanedSynonpsis}
        </span>
      </div>
    </div>
  );
};

export default ShowCardSynopsis;
