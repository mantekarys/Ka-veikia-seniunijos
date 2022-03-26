import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './components/Pages/Home/Home';
import Eldership from './components/Pages/Eldership-feed/Eldership';
import Profile from './components/Pages/Profile/Profile';
import Mailbox from './components/Pages/Mailbox/Mailbox';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <>
              <Route exact path='/:path(|home)' component={Home} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/eldership' component={Eldership} />
              <Route exact path='/mailbox' component={Mailbox} />
              {/* <Route exact path='/about' component={About} /> */}
        </>
    );
  }
}
