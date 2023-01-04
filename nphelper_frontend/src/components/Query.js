import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import classes from '../styles/Query.module.css';

import { updateQuery, deleteQuery } from '../asyncActions/asyncActions.js';

function mapDispatch(dispatch) {
  return {
    deleteQueryAction: (payload) => dispatch(deleteQuery(payload)),
    updateQueryAction: (payload) => dispatch(updateQuery(payload)),
  };
}

const Query = (props) => {
  const { query, deleteQueryAction, updateQueryAction, getId } = props;
  const [isDisplayedBin, getDisplayedBin] = useState(false);
  const [isActive, getActive] = useState(false);
  const [isCompleted, getCompleted] = useState(false);
  const isCompletedQuery = (boolean) => {
    getCompleted(boolean);
    updateQueryAction({ ...query, completed: boolean });
    getActive(!isCompleted);
  };

  const onClickHandler = () => {
    getId(query._id);
    getActive(!isActive);
  };

  return (
    <div
      className={`${classes.query} ${isActive && !isCompleted ? classes.active : ''} ${
        isCompleted ? classes.completed : ''
      }`}
      onMouseLeave={() => {
        getDisplayedBin(false);
      }}
      onDoubleClick={() => isCompletedQuery(!isCompleted)}
      onMouseEnter={() => getDisplayedBin(true)}
      onClick={onClickHandler}>
      <p className={classes.queryText}>
        {query.lastName} - <b>{query.number}</b> | {query.response || ''} | {query.date || ''}
      </p>
      {isDisplayedBin && (
        <div className={classes.btnWrapper}>
          <button className={classes.deleteBtn} onClick={() => deleteQueryAction(query._id)}>
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(null, mapDispatch)(Query);
