import React, { Component } from 'react';
import { Platform, StatusBar, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { styles } from './styles.js';

import ArabicScreenManager from './language_screens/ArabicScreenManager.js';

const ArabicAbjadLearner = StackNavigator({
  Arabic: {
    screen: ArabicScreenManager
  }
});


export default class App extends React.Component {
  render() {
    return (
      <ArabicAbjadLearner />
    );
  }
}
