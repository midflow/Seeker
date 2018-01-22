import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StatusBar,
    CameraRoll,
    Image,
    Text,
    Dimensions,
    BackHandler,
    Alert
} from 'react-native';
import styles from '../Style';
import Camera from 'react-native-camera';
import global from '../../utilities/global';
//import { NavigationActions } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.camera = null;

        global.mainScreen = true;
        global.currentScreen = 'Home';      
                         
        //this.props.navigation.state = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.disk,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
                captureQuality:Camera.constants.CaptureQuality.high
            },            
            path: null,
            photos:[],
        };

        // this.handleBack = (() => {
        //     if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
        //       this.navigator.pop();
        //       return true; //avoid closing the app
        //     }
      
        //     return false; //close the app
        //   }).bind(this) //don't forget bind this, you will remember anyway.
        //if (global.mainScreen==true)
        this.handleBackButton = (() => {
                        
            //if (global.currentScreen=='Home')
            Alert.alert(
                'Exit App',
                'Exiting the application?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                }, ], {
                    cancelable: false
                }
             )
             //else 
            // {
                //  switch (global.currentScreen)
                //  {
                //      case 'CameraRoll':
                //         this.props.navigation.navigate('Home_screen');
                //         break;
                //         case 'Candidates':
                //         if (global.cameraroll)
                //         this.props.navigation.navigate('CameraRoll_screen');
                //         else
                //         this.props.navigation.navigate('Home_screen');
                //         break;
                //         case 'Options':
                //         this.props.navigation.navigate('Candidates_screen', { path: global.uri, cameraroll:'true' });
                //         break;
                //         case 'Page':
                //         this.props.navigation.navigate('Options_screen');
                //         break;
                //  }
                //const {goBack} = this.props.navigation;
                 //goBack();
                //  if (global.mainScreen==true)
                //     Alert.alert(
                //         'Exit App',
                //         'Exiting the application?', [{
                //             text: 'Cancel',
                //             onPress: () => console.log('Cancel Pressed'),
                //             style: 'cancel'
                //         }, {
                //             text: 'OK',
                //             onPress: () => BackHandler.exitApp()
                //         }, ], {
                //             cancelable: false
                //         }
                //     )
                // else
                //     this.props.navigation.dispatch(NavigationActions.back());
            // }

             return true;
           } ).bind(this)
    }

    // onButtonPress = () => {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    //     // then navigate
    //     navigate('NewScreen');
    //   }   
      
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

    takePicture = () => {
        if (this.camera) {
            this.camera.capture()
                .then(
                (data) => {
                    console.log(data);
                    this.setState({ path: data.path });
                }
                )
                .catch(err => console.error(err));
        }
    }

    switchType = () => {
        let newType;
        const { back, front } = Camera.constants.Type;

        if (this.state.camera.type === back) {
            newType = front;
        } else if (this.state.camera.type === front) {
            newType = back;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                type: newType,
            },
        });
    }

    get typeIcon() {
        let icon;
        const { back, front } = Camera.constants.Type;

        if (this.state.camera.type === back) {
            icon = require('../../assets/ic_camera_rear_white.png');
        } else if (this.state.camera.type === front) {
            icon = require('../../assets/ic_camera_front_white.png');
        }

        return icon;
    }

    switchFlash = () => {
        let newFlashMode;
        const { auto, on, off } = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode,
            },
        });
    }

    get flashIcon() {
        let icon;
        const { auto, on, off } = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = require('../../assets/ic_flash_auto_white.png');
        } else if (this.state.camera.flashMode === on) {
            icon = require('../../assets/ic_flash_on_white.png');
        } else if (this.state.camera.flashMode === off) {
            icon = require('../../assets/ic_flash_off_white.png');
        }

        return icon;
    }
    
    renderImage() {
        return (
            <View>
                <Image
                    source={{ uri: this.state.path }}
                    style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                />
                <View style={styles.cancel}>
                    <TouchableOpacity onPress={() => this.setState({ path: null })}>
                        <Image source={require('../../assets/error.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.accept}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Candidates_screen', { path: this.state.path, cameraroll:'false' }) }}>
                        <Image source={require('../../assets/valid.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderCamera() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    captureQuality = {this.state.camera.captureQuality}
                    onFocusChanged={() => { }}
                    onZoomChanged={() => { }}
                    defaultTouchToFocus
                    mirrorImage={false}
                />
                <View style={[styles.overlay, styles.topOverlay]}>
                    <TouchableOpacity
                        style={styles.flashButton}
                        onPress={this.switchFlash}
                    >
                        <Image
                            source={this.flashIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flashButton}
                        onPress={() => {
                            //this.props.navigation.state.routeName = 'CameraRoll_screen';
                                this.props.navigation.navigate('CameraRoll_screen');
                                // const resetAction = NavigationActions.reset({
                                //     //key:null,
                                //     index: 1,
                                //     actions: [NavigationActions.navigate({ routeName: 'Home_screen' }),
                                //     NavigationActions.navigate({ routeName: 'CameraRoll_screen'})]
                                // });
                
                                // this.props.navigation.dispatch(resetAction);
                            }
                        }
                    >
                        <Image
                                source={require('../../assets/cameraroll.png')}
                            />
                    </TouchableOpacity>
                </View>
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    {
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.takePicture}
                        >
                            <Image
                                source={require('../../assets/ic_photo_camera_36pt.png')}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
        );
    }
}