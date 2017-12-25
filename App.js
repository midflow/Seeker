import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {HomeStack, Tabbar} from './src/Routes';

export default class App extends Component{
  render() {
      return (
          <HomeStack/>
      );
  }
}