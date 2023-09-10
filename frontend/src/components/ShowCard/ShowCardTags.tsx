import React from 'react';
import _ from 'lodash';

import {
  DEMOGRAPHICS_COLOR,
  GENRES_COLOR,
  THEMES_COLOR,
} from '../../constants/colors';

import '../../styles/ShowCard.css';

interface ShowCardTagsProps {
  demographics: string[];
  genres: string[];
  themes: string[];
}

interface TagProps {
  value: string;
  color: string;
}

const Tag = ({ value, color }: TagProps) => (
  <span
    className="show-card_details-row_tags-tag"
    style={{
      color,
      border: `1px solid ${color}`,
    }}>
    {value}
  </span>
);

const getTagsFromArray = (arr: string[], color: string) =>
  arr.map((value: string) => (
    <Tag
      key={`${_.kebabCase(value)}-tag`}
      value={value}
      color={color}
    />
  ));

const ShowCardTags = ({ demographics, genres, themes }: ShowCardTagsProps) => {
  const demoTags = getTagsFromArray(demographics, DEMOGRAPHICS_COLOR);
  const genreTags = getTagsFromArray(genres, GENRES_COLOR);
  const themeTags = getTagsFromArray(themes, THEMES_COLOR);

  return (
    <div className="show-card_details-row_tags">
      {demoTags}
      {genreTags}
      {themeTags}
    </div>
  );
};

export default ShowCardTags;
