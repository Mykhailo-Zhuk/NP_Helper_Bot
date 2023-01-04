import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import classes from '../styles/Form.module.css';
import { updateQuery } from '../asyncActions/asyncActions.js';
import Queries from './Queries';

function mapDispatch(dispatch) {
  return {
    updateQuery: (obj) => dispatch(updateQuery(obj)),
  };
}

const Form = (props) => {
  const { updateQuery } = props;
  const [response, getResponse] = useState('');
  const [_id, get_Id] = useState('');
  const inputRef = useRef();

  const getIdFromQuery = (id) => {
    get_Id(id);
  };

  const getTextFromInput = (e) => {
    getResponse(e.target.value);
  };
  const addResponse = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    if (!_id) return;
    updateQuery({ response, date, _id, completed: false });
    getResponse('');
  };

  return (
    <form onSubmit={addResponse} className={classes.form}>
      <input
        className={classes.input}
        maxLength={50}
        ref={inputRef}
        value={response}
        placeholder="Add result message"
        onMouseEnter={() => {
          inputRef.current.focus();
        }}
        onChange={getTextFromInput}
      />
      <button type="submit" className={classes.btn}>
        Submit
      </button>
      <Queries getId={getIdFromQuery} />
    </form>
  );
};

export default connect(null, mapDispatch)(Form);
