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

    this.defaultStyles = {
      style: {
        height: 40,
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: borderColor,
      },
      firstStyle: {
        borderWidth: borderWidth,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      },
      middleStyle: {
        borderTopWidth: borderWidth,
        borderBottomWidth: borderWidth,
        borderRightWidth: borderWidth,
      },
      secondToLastStyle: {
        borderTopWidth: borderWidth,
        borderBottomWidth: borderWidth,
      },
      lastStyle: {
        borderWidth: borderWidth,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        //marginLeft: -1 * borderWidth
      },
      singleStyle: {
        borderWidth: borderWidth,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      },
      activeStyle: {
        backgroundColor: mainColor,
      },
      inactiveStyle: {
        backgroundColor: '#fff'
      },
      textStyle: {
        fontSize: 16
      },
      activeTextStyle: {
        color: '#fff'
      },
      inactiveTextStyle: {
        color: '#00695C'
      }
    }

/*
    this.style = this.props.styles != null && this.props.styles.style != null ? this.props.styles.style : ;

    this.firstStyle = this.props.styles != null && this.props.styles.firstStyle != null ? this.props.styles.firstStyle : {

    };

    this.middleStyle = this.props.styles != null && this.props.styles.middleStyle != null ? this.props.styles.middleStyle : {

    };

    this.secondToLastStyle = this.props.styles != null && this.props.styles.secondToLastStyle != null ? this.props.styles.secondToLastStyle : {

    };

    this.lastStyle = this.props.styles != null && this.props.styles.lastStyle != null ? this.props.styles.lastStyle : {

    };

    this.activeStyle = this.props.styles != null && this.props.styles.activeStyle != null ? this.props.styles.activeStyle : {

    };

    this.inactiveStyle = this.props.styles != null && this.props.styles.inactiveStyle != null ? this.props.styles.inactiveStyle : {

    };

    this.textStyle = this.props.styles != null && this.props.styles.textStyle != null ? this.props.styles.textStyle : {

    };

    this.activeTextStyle = this.props.styles != null && this.props.styles.activeTextStyle != null ? this.props.styles.activeTextStyle : {

    };

    this.inactiveTextStyle = this.props.styles != null && this.props.styles.inactiveTextStyle != null ? this.props.styles.inactiveTextStyle : {

    }
  */
  }

  handlePress(){
    //just call onPress with reversed value, let parent take care of state
    this.props.onPress(this.props.name, !this.props.value);
  }

  render(){

    //style

    let defaultStyle = this.defaultStyles.style;
    let style = this.props.styles != null && this.props.styles.style != null ? this.props.styles.style : {};

    //positionStyle
    let defaultPositionStyle;
    let positionStyle;

    switch (this.props.position){
      case 'first':
        defaultPositionStyle = this.defaultStyles.firstStyle;
        positionStyle = this.props.styles != null && this.props.styles.firstStyle != null ? this.props.styles.firstStyle : {};
        break;

      case 'last':
        defaultPositionStyle = this.defaultStyles.lastStyle;
        positionStyle = this.props.styles != null && this.props.styles.lastStyle != null ? this.props.styles.lastStyle : {};
        break;

      case 'second-to-last':
        defaultPositionStyle = this.defaultStyles.secondToLastStyle;
        positionStyle = this.props.styles != null && this.props.styles.secondToLastStyle != null ? this.props.styles.secondToLastStyle : {};
        break;

      case 'middle':
        defaultPositionStyle = this.defaultStyles.middleStyle;
        positionStyle = this.props.styles != null && this.props.styles.middleStyle != null ? this.props.styles.middleStyle : {};
        break;

      case 'single':
        defaultPositionStyle = this.defaultStyles.singleStyle;
        positionStyle = this.props.styles != null && this.props.styles.singleStyle != null ? this.props.styles.singleStyle : {};
        break;


    }

    //activeStyle, inactiveStyle
    let defaultActiveStyle = this.defaultStyles.activeStyle;
    let defaultInactiveStyle = this.defaultStyles.inactiveStyle;
    let activeStyle = this.props.styles != null && this.props.styles.activeStyle != null ? this.props.styles.activeStyle : {};
    let inactiveStyle = this.props.styles != null && this.props.styles.inactiveStyle != null ? this.props.styles.inactiveStyle : {};


    //textStyle
    let defaultTextStyle = this.defaultStyles.textStyle;
    let textStyle = this.props.styles != null && this.props.styles.textStyle != null ? this.props.styles.textStyle : {};

    //activeTextStyle, inactiveTextStyle
    let defaultActiveTextStyle = this.defaultStyles.activeTextStyle;
    let defaultInactiveTextStyle = this.defaultStyles.inactiveTextStyle;
    let activeTextStyle = this.props.styles != null && this.props.styles.activeTextStyle != null ? this.props.styles.activeTextStyle : {};
    let inactiveTextStyle = this.props.styles != null && this.props.styles.inactiveTextStyle != null ? this.props.styles.inactiveTextStyle : {};

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
            defaultStyle,
            style,
            defaultPositionStyle,
            positionStyle,
            this.props.value ? defaultActiveStyle : defaultInactiveStyle,
            this.props.value ? activeStyle : inactiveStyle,
          ]}>
            <Text style={[
              defaultTextStyle,
              textStyle,
              this.props.value ? defaultActiveTextStyle : defaultInactiveTextStyle,
              this.props.value ? activeTextStyle : inactiveTextStyle,
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
            defaultStyle,
            style,
            defaultPositionStyle,
            positionStyle,
            this.props.value ? defaultActiveStyle : defaultInactiveStyle,
            this.props.value ? activeStyle : inactiveStyle,
          ]}>
            <Text style={[
              defaultTextStyle,
              textStyle,
              this.props.value ? defaultActiveTextStyle : defaultInactiveTextStyle,
              this.props.value ? activeTextStyle : inactiveTextStyle,
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
