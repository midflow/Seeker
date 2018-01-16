import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StatusBar,
    CameraRoll,
    Image,
    Text,
    Dimensions
} from 'react-native';
import styles from '../Style';
import Camera from 'react-native-camera';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.disk,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
                captureQuality:Camera.constants.CaptureQuality.medium
            },
            path: null,
            photos:[],
        };
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
                        onPress={() => {this.props.navigation.navigate('CameraRoll_screen')}}
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