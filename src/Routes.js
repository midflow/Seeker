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
        navigationOptions: {
            headerStyle: {
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0,   //remove shadow on iOS
                }
            
        }
    },
    Options_screen:{
        screen:Options,
        navigationOptions: {
            headerStyle: {
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0,   //remove shadow on iOS
                }
            
        }
    },
    Page_screen:{
        screen:Page,
        navigationOptions: {
            headerStyle: {
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0,   //remove shadow on iOS
                }
            
        }
    }
})