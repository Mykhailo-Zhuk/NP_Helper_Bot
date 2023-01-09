import axios from 'axios';
import {
  addQueriesAction,
  updateQueryAction,
  clearAllQueries,
  deleteQueryAction,
} from '../actions/actions';

export const fetchQueries = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:5000/api/queries/')
      .then(function (response) {
        // handle success
        console.log('Fetching completed!');
        dispatch(addQueriesAction(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      });
  };
};

export const updateQuery = (query) => {
  return (dispatch) => {
    axios
      .put('http://localhost:5000/api/queries/', query)
      .then(function (response) {
        // handle success
        dispatch(updateQueryAction(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      });
  };
};

export const deleteQuery = (query) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:5000/api/queries/${query}`)
      .then(function (response) {
        // handle success
        dispatch(deleteQueryAction(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      });
  };
};
export const deleteMany = (boolean) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/api/`, boolean)
      .then(function (response) {
        console.log('Dropping complete!');
        // handle success
        dispatch(clearAllQueries());
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      });
  };
};
