import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';
//import global from '../../utilities/global';

export default class Page extends Component {
    constructor(props) {
        super(props);

        global.mainScreen = false;
        global.currentScreen = 'Page';
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
      });

    render() {
        global.currentScreen = 'Page';
        return (
            <WebView
                source={{ uri: this.props.navigation.state.params.url }}
                style={{ marginTop: 20 }}
                renderLoading={this.renderLoading}
                startInLoadingState
            />
        );
    }
}