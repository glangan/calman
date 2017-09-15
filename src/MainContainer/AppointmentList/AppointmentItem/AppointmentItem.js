import React from 'react';
import PropTypes from 'prop-types';
import './AppointmentItem.css';

const AppointmentItem = (props) => {
  return (
    <div className="item">
      <h5>{props.title}</h5>
      <p><span>Due: </span>{props.date} {props.time} <a onClick={props.onDelete}>Delete</a></p>
    </div>
  )
};

AppointmentItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  onDelete: PropTypes.func
};

export default AppointmentItem;