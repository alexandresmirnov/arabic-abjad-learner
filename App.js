import React, { Component } from 'react';
import { Platform, StatusBar, Text, TextInput, View } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, DrawerItems } from 'react-navigation';

import { MenuContext } from 'react-native-popup-menu';


import { styles } from './styles.js';

import ArabicScreenManager from './language_screens/ArabicScreenManager.js';
import JapaneseScreenManager from './language_screens/JapaneseScreenManager.js';


const ArabicAbjadLearner = StackNavigator({
  Arabic: {
    screen: ArabicScreenManager
  }
});


export default class App extends React.Component {
  render() {
    return (
      <MenuContext style={{ flex: 1 }}>
        <ArabicAbjadLearner />
      </MenuContext>
    );
  }
}
