import React, { Component } from 'react';
import { View, Text, WebView, ActivityIndicator } from 'react-native';
import styles from '../Style';
import global from '../../utilities/global';

export default class Page extends Component {
    constructor(props) {
        super(props);

        global.mainScreen = false;
        global.currentScreen = 'Page';
    }

    ActivityIndicatorLoadingView() {
    
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator color='#009688' size='large' style={styles.ActivityIndicatorStyle} />
            </View>
        );                
      }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
      });

    render() {        
        return (
            <WebView
                source={{ uri: this.props.navigation.state.params.url }}
                style={{ marginTop: 20 }}
                renderLoading={this.ActivityIndicatorLoadingView}
                startInLoadingState
            />        
        );
    }
}