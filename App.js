import React, { Component } from 'react';
import { Platform, StatusBar, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { styles } from './styles.js';

import ArabicScreenManager from './language_screens/ArabicScreenManager.js';
import AboutScreen from './AboutScreen.js';


//TODO: add info screen and transliteration reference screen, make headermenu
const ArabicAbjadLearner = StackNavigator({
  Arabic: {
    screen: ArabicScreenManager
  },
  About: {
    screen: AboutScreen
  }
});


export default class App extends React.Component {
  render() {
    return (
      <ArabicAbjadLearner />
    );
  }
}
