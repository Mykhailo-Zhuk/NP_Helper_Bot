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
      .get('https://nphelper-bot-server-bharf.ondigitalocean.app/api/queries/')
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
      .put('https://nphelper-bot-server-bharf.ondigitalocean.app/api/queries/', query)
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
      .delete(`https://nphelper-bot-server-bharf.ondigitalocean.app/api/queries/${query}`)
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
      .post(`https://nphelper-bot-server-bharf.ondigitalocean.app/api/`, boolean)
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
