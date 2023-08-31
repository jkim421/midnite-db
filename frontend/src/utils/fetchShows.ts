import { FilterSelectionsStateType } from '../types/filterTypes';

const fetchShows = async (filters: FilterSelectionsStateType) => {
  try {
    const filterParams = encodeURIComponent(JSON.stringify(filters));

    const response = await fetch(`http://localhost:8000/shows/?filters=${filterParams}`, {
      method: 'get',
    })

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const showsData = await response.json();

    return showsData.shows;
  } catch (error) {
    console.error(error);

    return {};
  }
};

export default fetchShows;
