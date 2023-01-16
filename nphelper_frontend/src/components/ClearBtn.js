import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineReload } from 'react-icons/ai';

import classes from '../styles/ClearBtn.module.css';
import { deleteMany, fetchQueries } from '../asyncActions/asyncActions.js';

function mapToProps(state) {
  const queriesAmount = state.queries.filter((el) => el.completed === false);
  const completedQueries = state.queries.filter((el) => el.completed === true);
  return {
    queriesAmount,
    completedQueries,
  };
}
function mapDispatch(dispatch) {
  return {
    clearAllQueries: (boolean) => dispatch(deleteMany(boolean)),
    updateAllQueries: () => dispatch(fetchQueries()),
  };
}
const ClearBtn = (props) => {
  const { queriesAmount, clearAllQueries, completedQueries, updateAllQueries } = props;
  console.log(queriesAmount, completedQueries);
  return (
    <div className={classes.btnWrapper}>
      <div className={classes.textWrapper}>
        <p className={classes.bottonText}>You have {queriesAmount.length} pending queries</p>
        <p className={classes.bottonText}>You have {completedQueries.length} completed queries</p>
      </div>
      <div className={classes.updateBtnWrapper}>
        <button className={classes.updateBtn} onClick={() => updateAllQueries()}>
          <AiOutlineReload />
        </button>
      </div>
      <div className={classes.textWrapper}>
        <button className={classes.clearBtn} onClick={() => clearAllQueries(true)}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default connect(mapToProps, mapDispatch)(ClearBtn);
