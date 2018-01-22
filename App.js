import React, {Component} from 'react';
import { View, Text, BackAndroid } from 'react-native';
import {HomeStack, Tabbar} from './src/Routes';

export default class App extends Component{
    constructor(props) {
        super(props);

        this.currentScreen = 'Home';
    }
  render() {        
        return (
            <HomeStack/>
        );
  }
}