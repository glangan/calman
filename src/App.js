import React, { Component } from 'react';
import './App.css';
import {auth} from './firebase';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MainContainer from './MainContainer/MainContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogin(loggedInUser) {
    this.setState({
      user: loggedInUser
    })
  }

  handleLogOut() {
    this.setState({user: null})
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} handleLogout={this.handleLogOut} />
        <MainContainer user={this.state.user} handleLogin={this.handleLogin}/>
        <Footer />
      </div>
    );
  }
}

export default App;
