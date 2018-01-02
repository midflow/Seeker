import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Row from '../Row'
import api from '../../utilities/api';
import styles from '../Style';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import google from '../../assets/google.png';


export default class Options extends Component {

    constructor(props) {
        super(props);
        //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });        
        this.state = {
            name: "Barack Obama",
            image: this.props.navigation.state.params.image,
            facebook: "https://www.facebook.com/barackobama/?ref=br_rs",
            twitter: "https://twitter.com/BarackObama",
            instagram: "https://www.instagram.com/barackobama/",
            google: "https://www.google.com.vn/search?q=barack+obama"
        }
    }




    render() {

        return (
            <View style={{ flex: 1, flexDirection: 'column'}}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    
                        <Image style={styles.imageViewTitle} source={{ uri: 'https://www.whitehouse.gov/wp-content/uploads/2017/12/44_barack_obama1.jpg' }} />
                    
                    <Text style={styles.textTitle}>{this.props.navigation.state.params.name}</Text>
               
                    <TouchableOpacity style={styles.textViewContainer} onPress={() => { this.props.navigation.navigate('Page_screen', { url: this.state.instagram, name: this.props.navigation.state.params.name}) }}>
                        <Image style={styles.imageView} source={require('../../assets/instagram.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewContainer} onPress={() => { this.props.navigation.navigate('Page_screen', { url: this.state.facebook, name: this.props.navigation.state.params.name }) }}>
                        <Image style={styles.imageView} source={require('../../assets/facebook.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewContainer} onPress={() => { this.props.navigation.navigate('Page_screen', { url: this.state.twitter, name: this.props.navigation.state.params.name }) }}>
                        <Image style={styles.imageView} source={require('../../assets/twitter.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewContainer} onPress={() => { this.props.navigation.navigate('Page_screen', { url: this.state.google, name: this.props.navigation.state.params.name }) }}>
                        <Image style={styles.imageView} source={require('../../assets/google.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}