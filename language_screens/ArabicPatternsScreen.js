import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { styles } from '../styles.js';
import CharManager from '../CharManager.js';
import Arabic from '../languages/Arabic.js';

//this is inside a tab
class ArabicPatternsScreen extends Component {

  static navigationOptions = {
    title: 'Patterns'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <CharManager
          hintText={[
            "Type the transliteration.",
            "To see the answer, type space.",
          ]}
          language={
            new Arabic({
              type: 'patterns',
              settings: {}
            })
          }
        />
      </View>
    );
  }
}

export default ArabicPatternsScreen;
