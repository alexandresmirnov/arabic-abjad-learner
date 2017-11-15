import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DrawerView from 'react-native-drawerview';

import { styles } from '../styles.js';
import CharManager from '../CharManager.js';
import Arabic from '../languages/Arabic.js';
import ControlPanel from '../ControlPanel.js';


const SETTINGS_FIELDS = [
  {
    name: 'includeForms',
    type: 'button-group',
    label: 'Forms:',
    config: {
      buttons: [
        {
          name: 'initial',
          text: 'Initial',
          defaultValue: false,
        },
        {
          name: 'medial',
          text: 'Medial',
          defaultValue: true
        },
        {
          name: 'final',
          text: 'Final',
          defaultValue: false,
        },
        {
          name: 'isolated',
          text: 'Isolated',
          defaultValue: false,
        },
        {
          name: 'trouble',
          text: 'Trouble',
          defaultValue: false,
        }
      ]
    }
  }
];

//this is also inside a tab
class ArabicCharsScreen extends Component {
  static navigationOptions = {
    title: 'Characters'
  };

  constructor(props) {
    super(props);

    this.state = {
      settings: {}
    }

    let field;
    for(index in SETTINGS_FIELDS){
      field = SETTINGS_FIELDS[index];
      this.state.settings[field.name] = SETTINGS_FIELDS[index].defaultValue;

      if(field.type == 'button-group'){
        this.state.settings[field.name] = {};
        for(let buttonIndex in field.config.buttons){
          let button = field.config.buttons[buttonIndex];

          this.state.settings[field.name][button.name] = button.defaultValue;
        }
      }
      else {

      }
    }
  }

  handleSettingsChange(s){
    this.setState({
      settings: s
    });
  }

  getCPHeight() {
    let cpContainer = StyleSheet.flatten([styles.cpContainer]);
    let cpField = StyleSheet.flatten([styles.cpField]);

    return (
      cpContainer.paddingTop +
      cpContainer.paddingBottom +
      (cpField.height * SETTINGS_FIELDS.length)
    )
  }

  validateSettings() {
    this._controlPanel.validateSettings();
  }

  render() {
    console.log('charsScreen: ', this.props.navigation.state);

    return (
      <DrawerView
        closedOffset={-1 * this.getCPHeight()}
        threshold={30}
      >
      <View
        style={[styles.cpView, {height: this.getCPHeight()}]}
      >
          <ControlPanel
            ref={(ref) => {this._controlPanel = ref}}
            onSettingsChange={(s) => {this.handleSettingsChange(s)}}
            fields = {SETTINGS_FIELDS}
          />
        </View>
        <View style={[styles.container,{elevation: 10}]}>
          <CharManager
            language={
              new Arabic({
                type: 'chars',
                settings: this.state.settings
              })
            }
            beforeGenerateNew={() => this.validateSettings()}
          />
        </View>
      </DrawerView>
    );
  }

}

export default ArabicCharsScreen;
