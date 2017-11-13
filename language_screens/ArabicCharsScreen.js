import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DrawerView from 'react-native-drawerview';

import { styles } from '../styles.js';
import CharManager from '../CharManager.js';
import Arabic from '../languages/Arabic.js';
import ControlPanel from '../ControlPanel.js';


const SETTINGS_FIELDS = [
  {
    name: 'includeInitial',
    type: 'switch',
    label: 'Initial forms:',
    defaultValue: false,
    invalidValue: false,
    group: 'type'
  },
  {
    name: 'includeMedial',
    type: 'switch',
    label: 'Medial forms:',
    defaultValue: true,
    invalidValue: false,
    group: 'type'
  },
  {
    name: 'includeFinal',
    type: 'switch',
    label: 'Final forms:',
    defaultValue: false,
    invalidValue: false,
    group: 'type'
  },
  {
    name: 'includeIsolated',
    type: 'switch',
    label: 'Isolated forms:',
    defaultValue: false,
    invalidValue: false,
    group: 'type'
  },
  {
    name: 'includeTrouble',
    type: 'switch',
    label: 'Trouble forms:',
    defaultValue: false,
    invalidValue: false,
    group: 'type'
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
    }
  }

  handleSettingsChange(s){
    this.setState({
      settings: s
    });

    console.log('this.state.settings: ', this.state.settings);
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
    return (
      <DrawerView
        closedOffset={-1 * this.getCPHeight()}
        threshold={30}
      >
        <View style={{backgroundColor: '#fafafa', height: this.getCPHeight()}}>
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
