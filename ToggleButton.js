import React, { Component } from 'react';
import { Platform, View, Text, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import Ripple from 'react-native-material-ripple';
import PropTypes from 'prop-types';

import { styles } from './styles.js';

//stateless component; value managed by parent through value prop
class ToggleButton extends Component {

  static propTypes = {
    //functionality
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    defaultValue: PropTypes.bool.isRequired,
    value: PropTypes.bool.isRequired,
    //styles
    styles: PropTypes.object
  }

  constructor(props){
    super(props);

    let mainColor = '#009688';
    let borderColor = '#00796B';
    let borderWidth = 1;


    this.style = this.props.styles != null && this.props.styles.style != null ? this.props.styles.style : {
      height: 40,
      marginTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: borderColor,
    };

    this.firstStyle = this.props.styles != null && this.props.styles.firstStyle != null ? this.props.styles.firstStyle : {
      borderWidth: borderWidth,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    };

    this.middleStyle = this.props.styles != null && this.props.styles.middleStyle != null ? this.props.styles.middleStyle : {
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
      borderRightWidth: borderWidth,
    };

    this.secondToLastStyle = this.props.styles != null && this.props.styles.secondToLastStyle != null ? this.props.styles.secondToLastStyle : {
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
    };

    this.lastStyle = this.props.styles != null && this.props.styles.lastStyle != null ? this.props.styles.lastStyle : {
      borderWidth: borderWidth,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      //marginLeft: -1 * borderWidth
    };

    this.activeStyle = this.props.styles != null && this.props.styles.activeStyle != null ? this.props.styles.activeStyle : {
      backgroundColor: mainColor,
    };

    this.inactiveStyle = this.props.styles != null && this.props.styles.inactiveStyle != null ? this.props.styles.inactiveStyle : {
      backgroundColor: '#fff'
    };

    this.textStyle = this.props.styles != null && this.props.styles.textStyle != null ? this.props.styles.textStyle : {
      fontSize: 16
    };

    this.activeTextStyle = this.props.styles != null && this.props.styles.activeTextStyle != null ? this.props.styles.activeTextStyle : {
      color: '#fff'
    };

    this.inactiveTextStyle = this.props.styles != null && this.props.styles.inactiveTextStyle != null ? this.props.styles.inactiveTextStyle : {
      color: '#00695C'
    }
  }

  handlePress(){
    //just call onPress with reversed value, let parent take care of state
    this.props.onPress(this.props.name, !this.props.value);
  }

  render(){

    let positionStyle;

    switch (this.props.position){
      case 'first':
        positionStyle = this.firstStyle;
        break;

      case 'last':
        positionStyle = this.lastStyle;
        break;

      case 'second-to-last':
        positionStyle = this.secondToLastStyle;
        break;

      default:
        positionStyle = this.middleStyle;
        break;
    }

    if(Platform.OS == 'android'){
      return (
        <TouchableNativeFeedback
          key={this.props.name}
          onPress={() => this.handlePress()}
          background={
            Platform.Version >= 21 ?
              TouchableNativeFeedback.Ripple('rgba(97,97,97, 0.2)', false) :
              TouchableNativeFeedback.SelectableBackground()
          }
          delayPressIn={0}
          style={{flex: 1}}
        >
          <View style={[
            this.style,
            positionStyle,
            this.props.value ? this.activeStyle : this.inactiveStyle,
          ]}>
            <Text style={[
              this.textStyle,
              this.props.value ? this.activeTextStyle : this.inactiveTextStyle,
            ]}>
              {this.props.text}
            </Text>
          </View>
        </TouchableNativeFeedback>
      )
    }
    //iOS
    else {
      return (
        <TouchableWithoutFeedback
          key={this.props.name}
          onPress={() => this.handlePress()}
          delayPressIn={0}
          style={{flex: 1}}
        >
          <View style={[
            this.style,
            this.props.value ? this.activeStyle : this.inactiveStyle,
            this.props.position == 'first' ? this.firstStyle : {},
            this.props.position == 'middle' ? this.middleStyle : {},
            this.props.position == 'last' ? this.lastStyle : {},
          ]}>
            <Text style={[
              this.textStyle,
              this.props.value ? this.activeTextStyle : this.inactiveTextStyle,
            ]}>
              {this.props.text}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }


  }

}

export default ToggleButton;
