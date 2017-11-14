import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Slider } from 'react-native';

import PropTypes from 'prop-types';

import { styles } from './styles.js';
import ToggleButton from './ToggleButton.js';

/*

TODO: make into a list

props.fields format:
{
  name: ...,
  type: ...,
  label: ...,
  defaultValue: ...,
}
*/

class ControlPanel extends Component {

  static propTypes = {
    fields: PropTypes.array.isRequired,
    onSettingsChange: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);

    this.state = {
      settings: {},
      sliderValues: {} //track curr slider values for real-time updates
    }


    let fields = this.props.fields;

    let field;
    //populate settings with defaults and groupValidities with true
    for(index in fields){
      field = fields[index];
      this.state.settings[field.name] = field.defaultValue;
      if(field.type == 'slider'){
        this.state.sliderValues[field.name] = field.defaultValue;
      }
      else if(field.type == 'button-group'){
        let buttonGroupSettings = {};
        for(index in field.config.buttons){
          let button = field.config.buttons[index];

          buttonGroupSettings[button.name] = button.defaultValue;
        }

        this.state.settings[field.name] = buttonGroupSettings;
      }
    }

  }
  /*
  update parent's settings with initial, default values
  note that the first word to be served will actually be generated with
  the screen's settings object
  */
  componentDidMount(){
    this.setSettings(this.state.settings);
  }

  resetButtonGroup(settings, name){

    for(index in this.props.fields){
      let field = this.props.fields[index];
      if(field.name == name){
        let resetGroup = {};
        for(buttonIndex in field.config.buttons){
          let button = field.config.buttons[buttonIndex];
          resetGroup[button.name] = button.defaultValue;
        }
        settings[field.name] = resetGroup;
      }

    }

    return settings;
  }

  //called by parent container; after this, all button groups should be valid
  validateSettings(){
    /*
    groupValidities: {
      systems: false,
      blah: true,
      ...
    }
    */

    let newSettings = this.state.settings;

    let buttonGroupValidities = {}

    //all false by default
    for(let index in this.props.fields){
      let field = this.props.fields[index];
      if(field.type == 'button-group' && buttonGroupValidities[field.name] == null){
        buttonGroupValidities[field.name] = false;
      }
    }

    //set valid groups to true
    for(let index in this.props.fields){
      let field = this.props.fields[index];
      if(field.type == 'button-group'){
        for(let buttonIndex in field.config.buttons){
          let button = field.config.buttons[buttonIndex];
          if(this.state.settings[field.name][button.name] == true){
            //true value means group is valid
            buttonGroupValidities[field.name] = true;
          }
        }

      }

    }

    //fix all the invalid groups
    for(let name in buttonGroupValidities){
      let validity = buttonGroupValidities[name];
      if(validity == false){
        newSettings = this.resetButtonGroup(newSettings, name);
      }
    }

    this.setState({settings: newSettings});
    this.props.onSettingsChange(newSettings);
  }

  //convenience wrapper for settings change
  setSettings(s){

    //set settings in CP
    this.setState({
      settings: s
    });

    //now call parent's settings change handler so that it can update *its* settings
    this.props.onSettingsChange(s);
  }

  updateSetting(name, value){
    let delta = this.state.settings;
    delta[name] = value;
    this.setSettings(delta);
  }

  updateButtonGroup(groupName, buttonName, value){
    let delta = this.state.settings;
    delta[groupName][buttonName] = value;
    this.setSettings(delta);
  }

  generateField(field){

    let name = field.name;
    let type = field.type;
    let label = field.label;
    let defaultValue = field.defaultValue;
    let config = field.config;

    switch(type){
      case 'number':
        return (
          <View
            key={name}
            style={styles.cpField}
          >
            <Text style={styles.cpFieldLabel}>
              {label}
            </Text>
            <TextInput
              ref={(input) => { this.lengthInput = input; }}
              keyboardType = 'numeric'
              style = {styles.cpFieldInput}
              value = {this.state.settings[name] == null ? "" : this.state.settings[name].toString()}
              onChangeText = {(text) => this.updateSetting(name, text)}
              onEndEditing = {() => {
                if(this.state.settings[name] == ""){
                  this.updateSetting(name, defaultValue);
                }
              }}
            />
          </View>
        );
        break;

      case 'switch':
        return (
          <View
            key={name}
            style={styles.cpField}
          >
            <Text style={styles.cpFieldLabel}>
              {label}
            </Text>
            <View style = {{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
              <Switch
                onValueChange={(value) => this.updateSetting(name, value)}
                value={ this.state.settings[name] }
              />
            </View>
          </View>
        );
        break;

      case 'slider':
        return (
          <View
            key={name}
            style={styles.cpField}
          >
            <Text style={styles.cpFieldLabel}>
              {label}{config.displayValue(this.state.sliderValues[name])}
            </Text>
            <View style = {{flex: 0.5, flexDirection: 'column', justifyContent: 'center'}}>
              <Slider
                minimumValue = {config.minimumValue}
                maximumValue = {config.maximumValue}
                step = {config.step}
                onSlidingComplete = {(value) => this.updateSetting(name, value)}
                onValueChange = {(value) => {
                  let newSliderValues = this.state.sliderValues;
                  newSliderValues[name] = value;
                  this.setState({
                    sliderValues: newSliderValues
                  })
                }}
                value = {defaultValue}
              />
            </View>
          </View>
        );
        break;

      case 'button-group':

        let buttons = [];

        for(index in config.buttons){
          let button = config.buttons[index];

          let position;

          if(index == 0){
            position = 'first';
          }
          else if(index == config.buttons.length-1){
            position = 'last';
          }
          else {
            position = 'middle';
          }

          //console.log("generating button: ", button);
          buttons = buttons.concat(
            <ToggleButton
              position={position}
              key={button.name}
              name={button.name}
              text={button.text}
              value={this.state.settings[name][button.name]}
              defaultValue={button.defaultValue}
              onPress={(buttonName, value) => {
                this.updateButtonGroup(name, buttonName, value)
              }}
            />
          );
        }

        return (
          <View
            key={name}
            style={styles.cpField}
          >
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              {buttons}
            </View>
          </View>
        );
        break;
    }

  }

  render() {

    let fields = this.props.fields;
    let renderFields = fields.map((field) => this.generateField(field));

    return (
      <View style={styles.cpContainer}>
        {renderFields}
      </View>
    )
  }
}

export default ControlPanel;
