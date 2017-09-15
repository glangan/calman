import React from 'react';
import {auth} from './firebase';
import './Header.css';

const Header = (props) => {
  let profileContent;
  let logOutButton;

  const logOut = () => {
    auth.signOut()
      .then(() => props.handleLogOut)
  };
  if (props.user) {
    profileContent = (
      <div className="column">
        <h5>Welcome, {props.user.displayName}</h5>
      </div>
    );
    logOutButton = <button onClick={logOut}>Log Out</button>
  }
  return (
    <header>
      {profileContent}
      <h2>Calman</h2>
      {logOutButton}
    </header>
  );
};

export default Header;