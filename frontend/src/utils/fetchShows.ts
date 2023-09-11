import { FilterSelectionsStateType } from '../types/filterTypes';

const fetchShows = async (filters: FilterSelectionsStateType, page: number) => {
  try {
    const filterParams = encodeURIComponent(JSON.stringify(filters));

    const response = await fetch(`http://localhost:8000/shows/?filters=${filterParams}&page=${page}`, {
      method: 'get',
    })

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const showsData = await response.json();

    const { count, shows } = showsData

    return {
      count,
      shows,
    };
  } catch (error) {
    console.error(error);

    return {};
  }
};

export default fetchShows;
