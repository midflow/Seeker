import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Row from "../Row";
import api from "../../utilities/api";
import styles from "../Style";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import google from "../../assets/google.png";
//import { Navigation} from 'react-native-navigation';
import { NavigationActions } from 'react-navigation';
import global from '../../utilities/global';

export default class Options extends Component {
  constructor(props) {
    super(props);

    global.mainScreen = false;
    global.currentScreen = 'Options';
    //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      isLoading: true,
      result: [],
      name: "",
      image: this.props.navigation.state.params.image,
      facebook: "",
      twitter: "",
      instagram: "",
      google: ""
    };
  }

  componentDidMount() {
    api
      .getInfoFromNameAsync(this.props.navigation.state.params.name)
      .then(res => {
        if (res && res[0] && res.length > 0)
          this.setState({
            isLoading: false,  
            result: res,
            facebook: res[0]?res[0].facebook:"",
            twitter: res[0]?res[0].twitter:"",
            instagram: res[0]?res[0].instagram:"",
            google: res[0]?res[0].google:""
          })
          else
          {
            this.setState({
              isLoading: false,
          });
          };
      }).catch((err) => {
        this.setState({
            isLoading: false,
        });
        console.log(err);
      });
  }

  render() {
    if (this.state.isLoading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    else
    if (this.state.result && this.state.result[0] && this.state.result.length > 0) {
      return (
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={styles.imageViewTitle}
              source={{ uri: this.props.navigation.state.params.imageSource }}
            />

            <Text style={styles.textTitle}>
              {this.props.navigation.state.params.name}
            </Text>

            <TouchableOpacity
              style={styles.textViewContainer}
              onPress={() => {
                this.props.navigation.navigate("Page_screen", {
                  url: this.state.instagram,
                  name: this.props.navigation.state.params.name
                });
              }}
            >
              <Image
                style={styles.imageView}
                source={require("../../assets/instagram.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textViewContainer}
              onPress={() => {
                this.props.navigation.navigate("Page_screen", {
                  url: this.state.facebook,
                  name: this.props.navigation.state.params.name
                });
              }}
            >
              <Image
                style={styles.imageView}
                source={require("../../assets/facebook.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textViewContainer}
              onPress={() => {
                this.props.navigation.navigate("Page_screen", {
                  url: this.state.twitter,
                  name: this.props.navigation.state.params.name
                });
              }}
            >
              <Image
                style={styles.imageView}
                source={require("../../assets/twitter.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textViewContainer}
              onPress={() => {
                this.props.navigation.navigate("Page_screen", {
                  url: this.state.google,
                  name: this.props.navigation.state.params.name
                });
              }}
            >
              <Image
                style={styles.imageView}
                source={require("../../assets/google.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
          <Image style={styles.imageViewTitle} source={{ uri: this.props.navigation.state.params.imageSource }} />

          <Text style={styles.textTitle}>
            {this.props.navigation.state.params.name}
          </Text>

          <TouchableOpacity  style={{ flex:0.7, justifyContent: "flex-start", alignItems: "center" }} onPress={() => {              
              const {navigation} = this.props;
              global.mainScreen=true;
              
              navigation.dispatch({
                  routeName: 'Home_screen',
                  type: 'GoToRoute',
              });
              // this.props.navigation.dispatch(NavigationActions.back({
              //     key:'Home_screen'              
              //   }));             
              //this.props.navigation.navigate("Home_screen");
              //this.props.navigation = null; 
              // const resetAction = NavigationActions.reset({
              //   key:null,
              //   index: 0,
              //   actions: [NavigationActions.navigate({ routeName: 'Home_screen' })]
              // });
              
              // this.props.navigation.dispatch(resetAction);

              // this.props.navigation.reset({
              //   screen: 'Home_screen', 
              // });
            }}>
            <View style={styles.errorMessage}>
                                        <Text style={styles.text}>
                                        We could not found social links
                                        </Text>
                                    </View>            
          </TouchableOpacity>
        </View>;
    }
  }
}
