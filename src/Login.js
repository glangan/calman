import React from 'react';
import {auth, provider} from "./firebase";

const Login = (props) => {
  const login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        props.handleLogin(user);
      })
  };

  return (
    <div className="column container_column">
      <h3>Sign In</h3>
      <button onClick={login}>Log In</button>
    </div>
  )
};

export default Login;