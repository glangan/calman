import React from 'react';
import './MainContainer.css';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import Login from './Login';

const MainComponent = (props) => {
  let rightContent;
  let leftContent;

  if (props.user) {
    rightContent = <AppointmentList user={props.user} />;
    leftContent = <AppointmentForm user={props.user} />;
  } else {
    rightContent = <Login handleLogin={props.handleLogin}/>;
    leftContent =
      <div className="column container_column">
        <h3>Calman</h3>
        <p>A tool to save your appointments</p>
      </div>
  }
  return (
    <div className="container main_container">
      <div className="row">
          {leftContent}
        <div className="column container_column">
          {rightContent}
        </div>
      </div>
    </div>
  )
};

export default MainComponent;