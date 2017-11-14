import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

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

    this.activeStyle = {
      backgroundColor: 'orange'
    };

    this.inactiveStyle = {
      backgroundColor: 'green'
    }
  }

  handlePress(){
    //just call onPress with reversed value, let parent take care of state
    this.props.onPress(this.props.name, !this.props.value);
  }

  render(){
    return (
      <TouchableHighlight
        key={this.props.name}
        onPress={() => this.handlePress()}
        style={this.props.value ? this.activeStyle : this.inactiveStyle}
      >
        <Text>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }

}

export default ToggleButton;
