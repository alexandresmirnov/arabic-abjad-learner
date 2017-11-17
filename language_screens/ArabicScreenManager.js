import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Menu, { MenuItem } from 'react-native-material-menu';

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

//expects 'navigation' prop
class HeaderMenu extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Menu
        ref={(ref) => this.menu = ref}
        button={
          <TouchableOpacity
            onPress={() => this.menu.show()}
            style={{
              height: 52,
              width: 42,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={require('../assets/ic_more_vert_black_48dp_2x.png')}
              style={{
                height: 26,
                width: 26
              }}
            />
          </TouchableOpacity>
        }
      >
        <MenuItem
          onPress={() => {
            console.log(this.props.navigation);
            this.props.navigation.navigate('Arabic');
          }}
          textStyle = {{
            fontSize: 16
          }}
        >
          About
        </MenuItem>
        <MenuItem
          onPress={() => {
            console.log(this.props.navigation);
            this.props.navigation.navigate('Arabic');
          }}
          textStyle = {{
            fontSize: 16
          }}
        >
          Reference
        </MenuItem>
      </Menu>
    )
  }
}

//ArabicScreen screen (used inside top-level drawer), contains Words and MF
class ArabicScreenManager extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Arabic Abjad Learner',
    headerStyle: styles.stackHeader,
    headerTitleStyle: styles.stackHeaderTitle,
    headerLeft: (<View></View>),
    headerRight: (<HeaderMenu navigation={navigation} />)
  });

  render() {
    return (
      <View style={{flex: 1}}>

        <ArabicContent style={styles.container}/>
      </View>
    );
  }
}

export default ArabicScreenManager;
