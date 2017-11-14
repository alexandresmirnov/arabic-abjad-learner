import React, { Component } from 'react';
import { Platform, View, Text, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import Ripple from 'react-native-material-ripple';
import PropTypes from 'prop-types';

import { styles } from './styles.js';

//stateless component; value managed by parent through value prop
class ToggleButton extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    defaultValue: PropTypes.bool.isRequired,
    value: PropTypes.bool.isRequired
  }

  constructor(props){
    super(props);

    let mainColor = '#00796B';
    let borderColor = mainColor;
    let borderWidth = 1;

    this.style = {
      height: 40,
      marginTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: borderColor,
    };

    this.firstStyle = {
      borderWidth: borderWidth,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    };

    this.middleStyle = {
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
      borderRightWidth: borderWidth,
    };

    this.lastStyle = {
      borderWidth: borderWidth,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      marginLeft: -1 * borderWidth
    };

    this.activeStyle = {
      backgroundColor: mainColor,
    };

    this.inactiveStyle = {
      backgroundColor: '#fafafa'
    };

    this.textStyle = {
      fontSize: 16
    };

    this.activeTextStyle = {
      color: '#fff'
    };

    this.inactiveTextStyle = {
      color: mainColor
    }
  }

  handlePress(){
    //just call onPress with reversed value, let parent take care of state
    this.props.onPress(this.props.name, !this.props.value);
  }

  render(){
    return (
      <TouchableNativeFeedback
        key={this.props.name}
        onPress={() => this.handlePress()}
        background={
          Platform.Version >= 21 ?
            TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)', false) :
            TouchableNativeFeedback.SelectableBackground()
        }
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

      </TouchableNativeFeedback>
    )
  }

}

export default ToggleButton;
