import React, { Component } from 'react';
import Login from './Login/Login';
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <Login/>
    );
  }
}
