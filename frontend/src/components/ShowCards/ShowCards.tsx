import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

import { ShowStateType } from '../../types/showTypes';

import ShowCard from './ShowCard';
import Spinner from '../Spinner';

import { PAGE_SIZE } from '../../constants/constants';

interface ShowCardsType {
  page: number;
  showsData: ShowStateType;
  isLoadingShows: boolean;
  ratingsMap: { [key: string]: string };
  isFiltersOpen: boolean;
}

export const getShowNumCount = (
  page: number,
  count: number,
  resultsOnPage: number,
) => {
  if (!count) {
    return '0 entries';
  }

  const adjustedPage = page - 1;

  const rangeStart = (PAGE_SIZE * adjustedPage + 1).toLocaleString();
  const rangeEnd = (PAGE_SIZE * adjustedPage + resultsOnPage).toLocaleString();

  const formattedCount = count.toLocaleString();

  return `Entries ${rangeStart} - ${rangeEnd} of ${formattedCount}`;
};

const ShowCards = ({
  page,
  showsData,
  isLoadingShows,
  ratingsMap,
  isFiltersOpen,
}: ShowCardsType) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [countHeaderText, setCountHeaderText] = useState<string>('No entries');
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    const showNumCount = getShowNumCount(
      page,
      showsData.count,
      showsData.shows.length,
    );

    setCountHeaderText(showNumCount);
  }, [showsData.shows]);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }
  }, [isFiltersOpen]);

  const placeholderContent = isLoadingShows ? (
    <Spinner />
  ) : (
    'No matching entries.'
  );

  const shouldHideImg = Boolean(wrapperWidth && wrapperWidth < 600);

  return (
    <section
      className="show-section"
      ref={wrapperRef}>
      <div className="show-section_entry-count">
        <span>{countHeaderText}</span>
      </div>
      {isLoadingShows || (!isLoadingShows && showsData.count == 0) ? (
        <section className="show-section show-section_loading">
          <span>{placeholderContent}</span>
        </section>
      ) : (
        <div className="show-list-wrapper">
          {showsData.shows.map(show => (
            <ShowCard
              key={`${show.mal_id}_show-card`}
              show={show}
              ratingsMap={ratingsMap}
              shouldHideImg={shouldHideImg}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ShowCards;
