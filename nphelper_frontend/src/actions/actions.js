export const addQueriesAction = (payload) => {
  return { type: 'ADD_QUERIES', payload };
};

export const updateQueryAction = (payload) => {
  return {
    type: 'UPDATE_QUERY',
    payload,
  };
};

export const deleteQueryAction = (payload) => {
  return {
    type: 'DELETE_QUERY',
    payload,
  };
};

export const clearAllQueries = () => {
  return {
    type: 'CLEAR_ALL',
  };
};
