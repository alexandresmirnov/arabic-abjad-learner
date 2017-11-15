import React, { Component } from 'react';
import { Platform, View, Text, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import Ripple from 'react-native-material-ripple';
import PropTypes from 'prop-types';

import ToggleButton from './ToggleButton.js';

/*
  buttons: [
    {
      name: string,
      text: string,
      value: boolean,
      defaultValue: boolean
    },
    ...
  ]
*/

class ButtonGroup extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    buttons: PropTypes.array.isRequired,
    onButtonPress: PropTypes.func.isRequired,
    style: PropTypes.array, //container style
    buttonStyles: PropTypes.object //all the style props passed to ToggleButton children
  }

  constructor(props){
    super(props);

    this.style = this.props.style != null ? this.props.style : {flex: 1, flexDirection: 'row', justifyContent: 'center'};
  }

  onButtonPress(name, value){
    this.props.onButtonPress(name, value);
  }

  render(){

    let renderButtons = [];

    for(index in this.props.buttons){
      //console.log("generating button: ", button);

      let button = this.props.buttons[index];
      let position;

      if(this.props.buttons.length == 1){
        position = 'single';
      }
      else if(this.props.buttons.length == 2){
        if(index == 0){
          position = 'first';
        }
        else {
          position = 'last';
        }
      }
      else {
        if(index == 0){
          position = 'first';
        }
        else if(index == this.props.buttons.length-1){
          position = 'last';
        }
        else if(index == this.props.buttons.length-2){
          position = 'second-to-last';
        }
        else {
          position = 'middle';
        }
      }

      renderButtons = renderButtons.concat(
        <ToggleButton
          styles={this.props.buttonStyles}
          position={position}
          key={button.name}
          name={button.name}
          text={button.text}
          value={button.value}
          defaultValue={button.defaultValue}
          onPress={(name, value) => this.onButtonPress(name, value)}
        />
      );
    }


    return (
      <View style={this.style}>
        {renderButtons}
      </View>
    )
  }

}

export default ButtonGroup;
