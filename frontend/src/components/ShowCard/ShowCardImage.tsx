import React from 'react';

import { ShowImages } from '../../types/showTypes';

interface ShowCardImageProps {
  images: ShowImages;
  url: string;
}

const ShowCardImage = ({ images, url }: ShowCardImageProps) => (
  <div className="show-card_details-row_image-wrapper">
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

export default ShowCardImage;
