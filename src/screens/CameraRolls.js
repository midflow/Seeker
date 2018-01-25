import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';
import global from '../../utilities/global';
//import styles from '../Style';

export default class CameraRolls extends Component {
  constructor(props) {
    super(props);

    global.mainScreen = false;
    global.currentScreen = 'CameraRoll';
    global.cameraroll = true;

    this.state = {
      path: '',
      selected: [],
    };
  }

  
  getSelectedImages(images, current) {    
    this.setState({      
      path: images.length>0?images[0].uri:"",
    });

    //console.log(current);
    //console.log(this.state.selected);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.overlay, styles.topOverlay]}>
        <TouchableOpacity
                        style={styles.BackButton}
                        onPress={() => { 
                          this.props.navigation.navigate('Home_screen', { path: this.state.path, cameraroll:'true' });
                      }}
                    >            
                        <Image
                                source={require('../../assets/back.png')}
                            />
                    </TouchableOpacity>
        
        <Text style={styles.text}>Camera Roll</Text>
        <TouchableOpacity disabled={this.state.path.length==0}
                        style={styles.NextButton}
                        onPress={() => { this.props.navigation.navigate('Candidates_screen', { path: this.state.path, cameraroll:'true' }) }}
                    >
                    
                        <Image
                                source={this.state.path.length==0?require('../../assets/next_disabled.png'):require('../../assets/next.png')}
                            />

                    </TouchableOpacity>
        </View>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={3}
          pageSize={3}
          removeClippedSubviews={true}
          groupTypes='SavedPhotos'
          batchSize={6}
          selectSingleItem={true}
          maximum={1}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 25,
    alignItems: 'center',
    //color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
  overlay: {
    //position: "absolute",
    padding: 10,
    right: 0,
    left: 0,
    alignItems: "center"
  },
  topOverlay: {
    top: 0,
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
});
