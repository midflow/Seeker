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

export default class CameraRolls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: '',
      selected: [],
    };
  }

  
  getSelectedImages(images, current) {    

    
    this.setState({      
      path: images[0].uri,
    });

    console.log(current);
    console.log(this.state.selected);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
        <TouchableOpacity
                        style={styles.flashButton}
                        onPress={() => { this.props.navigation.navigate('Candidates_screen', { path: this.state.path }) }}
                    >
                        <Image
                                source={require('../../assets/Next.png')}
                            />
                    </TouchableOpacity>
        </View>
        <CameraRollPicker
          scrollRenderAheadDistance={2000}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          selectSingleItem={true}
          maximum={3}
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
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});
