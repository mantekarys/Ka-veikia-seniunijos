import React, { Component } from 'react';
import Signup from './Signup/Signup';
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <Signup/>
    );
  }
}
