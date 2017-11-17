/* @flow */

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Slider } from 'react-native';

import PropTypes from 'prop-types';

import { styles } from './styles.js';
import ButtonGroup from './ButtonGroup.js';
import ToggleButton from './ToggleButton.js';


/*
TODO: make into a list

field types:
*/

type NumberField = {
  type: 'number',
  name: string,
  label: string,
  defaultValue: string
};

type SwitchField = {
  type: 'switch',
  name: string,
  label: string,
  defaultValue: string
};

type SliderField = {
  type: 'slider',
  name: string,
  label: string,
  defaultValue: string,
  config: SliderFieldConfig
};

type SliderFieldConfig = {
  minimumValue: number,
  maximumValue: number,
  step: number,
  displayValue: Function
};

type ButtonGroupField = {
  type: 'button-group',
  name: string,
  label: string,
  config: ButtonGroupConfig
};

type ButtonGroupConfig = {
  buttons: Array<Button>
};

type Button = {
  name: string,
  text: string,
  defaultValue: boolean,
  value: boolean,
};

type Field = NumberField | SwitchField | SliderField | ButtonGroupField;

type Props = {
  fields: Array<Field>,
  onSettingsChange: Function
};

type State = {
  settings: {},
  sliderValues: {}
};

class ControlPanel extends Component<Props, State> {

  constructor(props: Props){
    super(props);

    this.state = {
      settings: {},
      sliderValues: {} //track curr slider values for real-time updates
    }

    let fields = this.props.fields;
    let field: Field;

    //populate settings with defaults
    for(let i = 0; i < fields.length; i++){
      field = fields[i];

      if(field.type === 'slider'){
        this.state.sliderValues[field.name] = field.defaultValue;
      }
      else if(field.type === 'button-group'){
        let buttonGroupSettings = {};
        for(let j = 0; j < field.config.buttons.length; j++){
          let button = field.config.buttons[j];

          buttonGroupSettings[button.name] = button.defaultValue;
        }

        this.state.settings[field.name] = buttonGroupSettings;
      }
      else {
        this.state.settings[field.name] = field.defaultValue;
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

  resetButtonGroup(settings: {}, name: string){

    //find button group in props.field
    for(let i = 0; i < this.props.fields.length; i++){
      let field = this.props.fields[i];
      if(field.name === name && field.type === 'button-group'){
        let resetGroup = {};
        //populate the new, reset group with default values
        for(let j = 0; j < field.config.buttons.length; j++){
          let button = field.config.buttons[j];
          resetGroup[button.name] = button.defaultValue;
        }
        //update setting
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
    for(let i = 0; i < this.props.fields.length; i++){
      let field = this.props.fields[i];
      if(field.type === 'button-group' && buttonGroupValidities[field.name] == null){
        buttonGroupValidities[field.name] = false;
      }
    }

    //set valid groups to true
    for(let i = 0; i < this.props.fields.length; i++){
      let field = this.props.fields[i];
      if(field.type === 'button-group'){
        for(let j = 0; j < field.config.buttons.length; j++){
          let button = field.config.buttons[j];
          if(this.state.settings[field.name][button.name] == true){
            //true value means group is valid
            buttonGroupValidities[field.name] = true;
          }
        }

      }

    }

    console.log('invalid groups:',buttonGroupValidities);

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
  setSettings(s: {}){

    //set settings in CP
    this.setState({
      settings: s
    });

    //now call parent's settings change handler so that it can update *its* settings
    this.props.onSettingsChange(s);
  }

  updateSetting(name: string, value: mixed){
    let delta = this.state.settings;
    delta[name] = value;
    this.setSettings(delta);
  }

  updateButton(groupName: string, buttonName: string, value: boolean){
    let delta = this.state.settings;
    delta[groupName][buttonName] = value;
    this.setSettings(delta);
  }

  generateField(field: Field){

    let name = field.name;
    let type = field.type;
    let label = field.label;

    if(field.type === 'number'){
      let defaultValue = field.defaultValue;
      return (
        <View
          key={name}
          style={styles.cpField}
        >
          <Text style={styles.cpFieldLabel}>
            {label}
          </Text>
          <TextInput
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
    }
    else if(field.type === 'switch'){
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
    }
    else if(field.type === 'slider'){
      let defaultValue = field.defaultValue;
      let config = field.config;
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
    }
    else if(field.type === 'button-group'){
      let buttonsWithValues = field.config.buttons;

      for(let i = 0; i < buttonsWithValues.length; i++){
        let button = buttonsWithValues[i];
        buttonsWithValues[i].value = this.state.settings[name][button.name];
      }

      return (
        <View
          key={name}
          style={styles.cpField}
        >
          <ButtonGroup
            name={name}
            buttons = {buttonsWithValues}
            onButtonPress = {(buttonName, value) => {
              this.updateButton(name, buttonName, value)
            }}
          />
        </View>
      );
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
