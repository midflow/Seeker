import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    NetInfo,
    Platform
} from 'react-native';
import Row from '../Row'
import api from '../../utilities/api';
import styles from '../Style';
import data from '../../utilities/data';
import ImageResizer from 'react-native-image-resizer';
import global from '../../utilities/global';

export default class Candidates extends Component {

    constructor(props) {
        super(props);

        //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });        
        this.state = {
            IBMImages: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            identity: null,
            isLoading: true,
            noFaces: true,
            isConnected: true,
            imageSource: '',
        }

        global.mainScreen = false;
        global.currentScreen = 'Candidates';
        global.imageSource = this.state.imageSource;
        global.uri = this.props.navigation.state.params.path;
    }

    componentWillUnmount() {
        if (Platform.OS == 'ios') NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        if (isConnected) {
            this.setState({
                isConnected: true,
                imageSource: this.props.navigation.state.params.path,
            });

            if (this.state.isConnected)
                ImageResizer.createResizedImage(this.props.navigation.state.params.path, 320, 320, 'JPEG', 100).then((response) => {
                    this.setState({ isLoading: true });
                    api.getCandidatesFromApiAsync_Fetch(response.uri).then((res) => {

                        if (res.images.length > 0) {
                            res.images[0].faces.forEach(e => {
                                if (e.identity)
                                    this.setState({
                                        noFaces: false,
                                    });
                            });

                            this.setState({
                                IBMImages: this.state.IBMImages.cloneWithRows(res.images[0].faces),
                                isLoading: false,
                                identity: res.images[0].faces.length > 0 && res.images[0].faces[0].identity ? res.images[0].faces[0].identity : null,
                                //IBMImages: this.state.IBMImages.cloneWithRows(data)
                            });
                        }
                    })
                }).catch((err) => {
                    // Oops, something went wrong. Check that the filename is correct and
                    // inspect err to get more details.
                    console.log(err);
                });
        }
        else {
            this.setState({
                isConnected: false,
            });
        }
    }

    componentDidMount() {

        if (Platform.OS == 'ios') NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        else {
            NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                this.setState({
                    isConnected: true,
                    imageSource: this.props.navigation.state.params.path,
                });

                if (this.state.isConnected)
                    ImageResizer.createResizedImage(this.props.navigation.state.params.path, 320, 320, 'JPEG', 100).then((response) => {
                        this.setState({ isLoading: true });
                        api.getCandidatesFromApiAsync_Fetch(response.uri).then((res) => {

                            if (res.images.length > 0) {
                                res.images[0].faces.forEach(e => {
                                    if (e.identity)
                                        this.setState({
                                            noFaces: false,
                                        });
                                });

                                this.setState({
                                    IBMImages: this.state.IBMImages.cloneWithRows(res.images[0].faces),
                                    isLoading: false,
                                    identity: res.images[0].faces.length > 0 && res.images[0].faces[0].identity ? res.images[0].faces[0].identity : null,
                                    //IBMImages: this.state.IBMImages.cloneWithRows(data)
                                });
                            }
                        })
                    }).catch((err) => {
                        // Oops, something went wrong. Check that the filename is correct and
                        // inspect err to get more details.
                        console.log(err);
                    });
            }
            else {
                this.setState({
                    isConnected: false,
                });
            }
            })
        }
        // Check for network connectivity

        // if (this.props.navigation.state.params.cameraroll=='true')
        // {
        //     this.setState({
        //         imageSource:this.props.navigation.state.params.path
        //     });
        // }
        // else
        // {
        this.setState({
            imageSource: this.props.navigation.state.params.path
        });
        //}             

    }

    render() {
        // const dataSource = this.ds.cloneWithRows([{
        //     resolved_url: this.props.navigation.state.params.path,
        //     name: 'Obama'
        // }, {
        //     resolved_url: this.props.navigation.state.params.path,
        //     name: 'Obama'
        // }, {
        //     resolved_url: 'https://www.whitehouse.gov/wp-content/uploads/2017/12/44_barack_obama1.jpg',
        //     name: 'Obama'
        // }]);
        if (!this.state.isConnected) {
            return <View style={{ flex: 0.5, flexDirection: "column" }}>
                <TouchableOpacity style={styles.textViewContainer} onPress={() => {
                    this.props.navigation.navigate(
                        "Home_screen"
                    );
                    //this.props.navigation = null; 
                }}>
                    <View style={{ flex: 0.7, borderRadius: 10, backgroundColor: "#47525e", justifyContent: "center" }}>
                        <Text
                            style={{
                                fontSize: 25, margin: 10, color: '#fff'
                            }}
                        >
                            Please check your network connection and try it again!
                                  </Text>
                    </View>
                </TouchableOpacity>

            </View>;
        }
        else
            if (this.state.isLoading && this.state.IBMImages.getRowCount() === 0) {
                return (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator color='#009688' size='large' style={styles.ActivityIndicatorStyle} />
                    </View>
                );
            }
            else if (this.state.noFaces || this.state.IBMImages.getRowCount() === 0 || (this.state.IBMImages.getRowCount() == 1
                && this.state.identity == null)) {
                return <View style={{ flex: 0.5, flexDirection: "column" }}>
                    <View style={{ flex: 1, alignItems: "center", paddingBottom: 20 }}>
                        <Image style={styles.imageViewTitle} source={{ uri: this.props.navigation.state.params.path }} />
                    </View>
                    <TouchableOpacity style={styles.textViewContainer} onPress={() => {
                        this.props.navigation.navigate(
                            "Home_screen"
                        );
                        this.props.navigation = null;
                    }}>
                        <View style={{ flex: 0.7, borderRadius: 10, backgroundColor: "#47525e", justifyContent: "center" }}>
                            <Text
                                style={{
                                    fontSize: 25, margin: 10, color: '#fff'
                                }}
                            >
                                We could not catch
                                    it, Please try it
                                    again!
                                  </Text>
                        </View>
                    </TouchableOpacity>

                </View>;
            }
            else {
                return (
                    <ScrollView style={{ flex: 1 }}><ListView contentContainerStyle={styles.list}
                        dataSource={this.state.IBMImages}
                        renderRow={(data) => {
                            if (data && data.identity)
                                return (
                                    <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Options_screen', { name: data.identity.name }) }}>
                                            <Image style={styles.imageViewContainer} source={{ uri: this.state.imageSource }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.textViewContainer} onPress={() => {
                                            global.name = data.identity.name;
                                            this.props.navigation.navigate('Options_screen', { name: data.identity.name, imageSource: this.state.imageSource })
                                        }}>
                                            <View style={styles.textViewBox}>
                                                <Text style={styles.text}>
                                                    {data.identity.name}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            else
                                return <View />;
                            // return <View style={{ flex: 0.5, flexDirection: "row"}}>
                            //     <View style={{ flex: 1, alignItems: "center", paddingBottom:20 }}>
                            //       <Image style={styles.imageViewTitle} source={{ uri: this.props.navigation.state.params.path }} />
                            //       </View>
                            //       <TouchableOpacity style={styles.textViewContainer} onPress={() => {
                            //           this.props.navigation.navigate(
                            //             "Home_screen"
                            //           );
                            //         }}>
                            //         <View style={{flex: 0.7, borderRadius: 10, backgroundColor: "#47525e", justifyContent: "center"}}>
                            //           <Text
                            //             style={{
                            //               fontSize: 25, margin:10
                            //             }}
                            //           >
                            //             We could not catch
                            //             it, Please try it
                            //             again!
                            //           </Text>
                            //         </View>
                            //       </TouchableOpacity>

                            //   </View>;
                        }}
                    />
                    </ScrollView>
                );
            }
    }
}