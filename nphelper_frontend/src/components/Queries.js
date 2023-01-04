import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQueries } from '../asyncActions/asyncActions';

import Query from './Query.js';

function mapToProps(state) {
  const { queries } = state;
  return {
    queries,
  };
}
function mapDispatch(dispatch) {
  return {
    addQueriesAction: () => dispatch(fetchQueries()),
  };
}
const Queries = (props) => {
  const { addQueriesAction, queries, getId } = props;

  useEffect(() => {
    console.log('Fetching data from db complete!');
    addQueriesAction();
  }, [addQueriesAction]);

  return (
    <React.Fragment>
      {queries.map((query) => {
        return <Query key={query._id} query={query} getId={getId} />;
      })}
    </React.Fragment>
  );
};

export default connect(mapToProps, mapDispatch)(Queries);
