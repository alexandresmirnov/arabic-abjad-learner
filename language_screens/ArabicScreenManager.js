import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { styles } from '../styles.js';

import ArabicWordsScreen from './ArabicWordsScreen.js';
import ArabicCharsScreen from './ArabicCharsScreen.js';


//this is the TabNavigator for moving between words and mf
const ArabicContent = TabNavigator({
  Words: {
    screen: ArabicWordsScreen
  },
  Chars: {
    screen: ArabicCharsScreen
  }
},
{
  tabBarOptions: {
    style: {
      backgroundColor: 'white'
    },
    lazy: false,
    activeTintColor: 'black',
    inactiveTintColor: '#aaa'
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
