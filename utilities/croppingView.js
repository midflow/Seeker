import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View} from 'react-native';
import createReactClass from 'create-react-class';

var CroppingView = createReactClass({
  propTypes: {
    cropTop: PropTypes.number,
    cropLeft: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  },
  getDefaultProps() {
    return {
      cropTop: 0,
      cropLeft: 0
    }
  },
  render() {
    return (
      <View style={[{
        position: 'absolute',
        //overflow: 'hidden',
        flex: 1,
        top: this.props.cropTop,
        left: this.props.cropLeft,
        height: this.props.height,
        width: this.props.width,
        backgroundColor: 'transparent'
        }, this.props.style]}>
        <View style={{
          flex: 1,
          position: 'absolute',
          top: this.props.cropTop * -1,
          left: this.props.cropLeft * -1,
          backgroundColor: 'transparent'
        }}>
          {this.props.children}
        </View>
      </View>
    );
  }
});


module.exports = {
  CroppingView: CroppingView
};
