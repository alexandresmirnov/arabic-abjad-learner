import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';

import { styles } from './styles.js';

class AboutScreen extends Component {

  static navigationOptions = {
    title: 'About',
    headerStyle: styles.aboutHeader,
    headerTitleStyle: styles.aboutHeaderTitle,
    headerRight: (<View></View>)
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.aboutContainer}>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutSectionTitle}>What is this for?</Text>
          <Text style={styles.aboutSectionText}>
          When learning Arabic, the writing system is probably one of the largest challenges would-be learners face.  [app name] intends to streamline the process of learning to read the Arabic abjad by providing a convenient way to practice reading one word at a time.  Whenever you have a free moment, do a couple words; over time, it will become more and more effortless.
          </Text>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutSectionTitle}>Patterns</Text>
          <Text style={styles.aboutSectionText}>
          Patterns generates a word that fits into one of the common noun/adjective vowel patterns in Arabic.  This way, you can get used to common word shapes you will often encounter.
          </Text>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutSectionTitle}>Words</Text>
          <Text style={styles.aboutSectionText}>
          This generates random words of configurable length to practice being able to read any word you might come across.
          </Text>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutSectionTitle}>Characters</Text>
          <Text style={styles.aboutSectionText}>
          Drill individual characters in all their different forms (initial, medial, final, and isolated) as well as a subset of the forms that I've called "trouble" forms.  Characters in this group are differentiated from other characters purely by dot placement and location in their initial and medial forms (or in the case of alif and laam, whether or not they connect to following letters), so they need extra attention to learn well.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default AboutScreen;
