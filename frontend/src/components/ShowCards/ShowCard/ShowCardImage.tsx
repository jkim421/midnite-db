import React from 'react';

import { ShowImages } from '../../../types/showTypes';

import '../../../styles/ShowCard.css';

interface ShowCardImageProps {
  images: ShowImages;
  url: string;
  shouldHideImg: boolean;
}

const ShowCardImage = ({ images, url, shouldHideImg }: ShowCardImageProps) => {
  let wrapperClasses = 'show-card_details-row_image-wrapper';

  if (shouldHideImg) {
    wrapperClasses = wrapperClasses.concat(
      ' show-card_details-row_image-hidden',
    );
  }

  return (
    <div className={wrapperClasses}>
      <a
        href={url}
        target="blank">
        <img
          className="show-card_details-row_image"
          src={images.small}></img>
      </a>
      <div className="show-card_details-row_image-tooltip">Visit MAL Page</div>
    </div>
  );
};

export default ShowCardImage;
