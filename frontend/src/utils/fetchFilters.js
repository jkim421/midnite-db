const fetchFilters = async serverUrl => {
  try {
    const response = await fetch(`${serverUrl}/filters`, {
      method: 'get',
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const filtersData = await response.json();

    return filtersData;
  } catch (error) {
    console.error(error);

    return {};
  }
};

export default fetchFilters;
