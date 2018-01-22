import React from 'react';
import {StackNavigator} from 'react-navigation';
import Home from './screens/Home';
import Candidates from './screens/Candidates';
import Options from './screens/Options';
import Page from './screens/Page';
import CameraRolls  from './screens/CameraRolls';


export const HomeStack = StackNavigator({
    Home_screen: {
        screen:Home,
        navigationOptions: { header:null}
    },
    CameraRoll_screen: {
        screen:CameraRolls,
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

const defaultGetStateForAction = HomeStack.router.getStateForAction;
HomeStack.router.getStateForAction = (action, state) => {            
    if (state && action.type === 'GoToRoute') {           
        let index = state.routes.findIndex((item) => {
            return item.routeName === action.routeName
        });
        const routes = state.routes.slice(0, index+1);
        return {
            routes,
            index
        };    
    }       
    return defaultGetStateForAction(action, state);
};