const initialState = {
  queries: [],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUERIES': {
      return { queries: [...action.payload] };
    }
    // case 'ADD_QUERY': {
    //   return { queries: [...state.queries, action.payload] };
    // }

    case 'UPDATE_QUERY': {
      let payload = state.queries.find((el) => el._id === action.payload._id);
      if (payload) {
        payload.response = action.payload.response;
        payload.completed = action.payload.completed;
        payload.date = action.payload.date;
      }
      return { ...state };
    }

    case 'DELETE_QUERY': {
      const filterQueries = state.queries.filter((el) => el._id !== action.payload._id);
      return { queries: filterQueries };
    }

    case 'CLEAR_ALL': {
      return { queries: [] };
    }
    default:
      return state;
  }
};
