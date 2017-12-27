import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from './screens/Home';
import Candidates from './screens/Candidates';
import Options from './screens/Options';
import Page from './screens/Page';

export const HomeStack = StackNavigator({
    Home_screen: {
        screen:Home,
        navigationOptions: { header:null}
    },
    Candidates_screen:{
        screen:Candidates,
        navigationOptions:{title:''}
    },
    Options_screen:{
        screen:Options,
        navigationOptions:{title:''}
    },
    Page_screen:{
        screen:Page,
        navigationOptions:{title:'Pages'}
    }
})