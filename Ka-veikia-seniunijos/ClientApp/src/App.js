import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './components/Pages/Home/Home';
import Eldership from './components/Pages/Eldership-feed/Eldership';
import Profile from './components/Pages/Profile/Profile';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <>
             <Route exact path='/' component={Eldership} />
             <Route exact path='/profile' component={Profile} />
        </>
    );
  }
}
