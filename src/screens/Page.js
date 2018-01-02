import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';

export default class Page extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
      });

    render() {
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