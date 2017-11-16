import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { styles } from '../styles.js';

import ArabicPatternsScreen from './ArabicPatternsScreen.js';
import ArabicWordsScreen from './ArabicWordsScreen.js';
import ArabicCharsScreen from './ArabicCharsScreen.js';


//this is the TabNavigator for moving between words and mf
const ArabicContent = TabNavigator({
  Patterns: {
    screen: ArabicPatternsScreen
  },
  Words: {
    screen: ArabicWordsScreen
  },
  Chars: {
    screen: ArabicCharsScreen
  }
},
{
  ...TabNavigator.Presets.AndroidTopTabs, //have android style tabs on iOS
  tabBarOptions: {
    style: {
      backgroundColor: 'white'
    },
    lazy: false,
    activeTintColor: '#009688',
    inactiveTintColor: '#aaa',
    indicatorStyle: {
      backgroundColor: '#009688'
    }
  }
});

//ArabicScreen screen (used inside top-level drawer), contains Words and MF
class ArabicScreenManager extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Arabic Abjad Learner',
    headerStyle: styles.stackHeader,
    headerTitleStyle: styles.stackHeaderTitle,
  });

  render() {
    return (
      <ArabicContent style={styles.container}/>
    );
  }
}

export default ArabicScreenManager;
