import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DrawerView from 'react-native-drawerview';

import { styles } from '../styles.js';
import CharManager from '../CharManager.js';
import Arabic from '../languages/Arabic.js';
import ControlPanel from '../ControlPanel.js';


const SETTINGS_FIELDS = [
  {
    name: 'length',
    type: 'slider',
    label: "Length: ",
    defaultValue: 2,
    config: {
      minimumValue: 1,
      maximumValue: 5,
      step: 1,
      displayValue: (value) => {
        return (<Text style={{fontWeight: 'bold'}}>{value.toFixed(0)} syllables</Text>);
      }
    }
  },
  {
    name: 'daChance',
    type: 'slider',
    label: "Def. article: ",
    defaultValue: 0.3,
    config: {
      minimumValue: 0,
      maximumValue: 1,
      step: 0.1,
      displayValue: (value) => {
        return (<Text style={{fontWeight: 'bold'}}>{(value.toFixed(1) * 100) + '%'}</Text>);
      }
    }
  },
  {
    name: 'tmChance',
    type: 'slider',
    label: "Taa marbutah: ",
    defaultValue: 0.3,
    config: {
      minimumValue: 0,
      maximumValue: 1,
      step: 0.1,
      outputPrecision: 1,
      displayValue: (value) => {
        return (<Text style={{fontWeight: 'bold'}}>{(value.toFixed(1) * 100) + '%'}</Text>);
      }
    }
  },
]

//this is inside a tab
class ArabicPatternsScreen extends Component {

  static navigationOptions = {
    title: 'Patterns'
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

  render() {
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
            onFinishGeneration = {(height) => {this.setCPHeight(height)}}
            fields = {SETTINGS_FIELDS}
          />
        </View>
        <View style={[styles.container,{elevation: 10}]}>
          <CharManager
            language={
              new Arabic({
                type: 'patterns',
                settings: this.state.settings
              })
            }
          />
        </View>
      </DrawerView>
    );
  }
}

export default ArabicPatternsScreen;
