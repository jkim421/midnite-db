import { FiltersType } from '~/types/filterTypes';

import FiltersCheckbox from './FilterCheckbox';

interface FiltersPanelProps {
  isLoading: boolean,
  filters: FiltersType,
}

const FiltersPanel = ({ isLoading, filters }: FiltersPanelProps) => {
  if (isLoading) return null;

  const {
    type,
    status,
    rating,
    genre,
    theme,
    demographic,
    studios,
  } = filters;

  return (
    <section className="FiltersPanel">
      <FiltersCheckbox
        title="Media Type"
        filterData={type}
      />
      <FiltersCheckbox
        title="Status"
        filterData={status}
      />
      <FiltersCheckbox
        title="Rating"
        filterData={rating}
      />
      <FiltersCheckbox
        title="Genre"
        filterData={genre}
      />
      <FiltersCheckbox
        title="Theme"
        filterData={theme}
      />
      <FiltersCheckbox
        title="Demographic"
        filterData={demographic}
      />
      <h5>{studios.length}</h5>
    </section>
  )
};

export default FiltersPanel;
