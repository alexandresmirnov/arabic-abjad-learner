import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Slider } from 'react-native';

import PropTypes from 'prop-types';

import { styles } from './styles.js';

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

  resetGroup(settings, group){

    let delta = settings;

    for(index in this.props.fields){
      let field = this.props.fields[index];
      if(field.group == group){
        delta[field.name] = this.props.fields[index].defaultValue;
      }

    }

    return delta;
  }

  //called by parent container; after this, all groups should be valid
  //TODO: add valid ranges for numbers
  validateSettings(){
    /*
    groupValidities: {
      systems: false,
      blah: true,
      ...
    }
    */

    let newSettings = this.state.settings;

    let groupValidities = {}

    //all false by default
    for(let index in this.props.fields){
      let field = this.props.fields[index];
      if(groupValidities[field.group] == null){
        groupValidities[field.group] = false;
      }
    }

    //set valid groups to true
    for(let index in this.props.fields){
      let field = this.props.fields[index];
      if(this.state.settings[field.name] != field.invalidValue){
        //valid value means group is valid
        groupValidities[field.group] = true;
      }
    }

    //fix all the invalid groups
    for(let name in groupValidities){
      let validity = groupValidities[name];
      if(validity == false){
        newSettings = this.resetGroup(newSettings, name);
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
