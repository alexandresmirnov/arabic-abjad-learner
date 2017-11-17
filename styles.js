import { Platform, StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({

  //contains the game area
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 35
  },

  //text in foreign alphabet
  character: {
    fontSize: 50,
    height: 80,
    lineHeight: 80,
    textAlign: 'center',
  },

  //input field
  input: {
    height: 80,
    width: 150,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 30
  },

  charView: {
    height: 250,
  },

  //instruction / hint text
  charHint: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20
  },

  //stack header, contains language name
  stackHeader: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    elevation: 0, //removes shadow
    justifyContent: 'space-between',
  },

  //text in stack header, need to center it
  stackHeaderTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24, //default is 20,
    fontWeight: "400",
    color: '#004D40'
  },

  headerLeftButton: {
    width: 28,
    height: 28,
    marginLeft: 7,
  },

  stackHeaderMenu: {
    height: 60,
    width: 40,
  },


  //about screen
  aboutHeader: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    elevation: 3, //removes shadow
    justifyContent: 'space-between',
    height: 56
  },

  aboutHeaderTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24, //default is 20,
    fontWeight: "400",
    color: '#004D40'
  },

  aboutContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },

  aboutSection: {
    flex: 1,
    marginBottom: 20
  },

  aboutSectionTitle: {
    fontSize: 24
  },

  aboutSectionText: {
    fontSize: 16,
    lineHeight: 24
  },

  //ControlPanel

  cpContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10
  },

  cpView: {
    backgroundColor: '#fafafa'
  },

  cpField: {
    height: 50,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },

  cpFieldLabel: {
    height: 50,
    fontSize: 16,
    lineHeight: 35,
    textAlign: 'center',
    flex: 0.5,
    color: '#004D40',
  },

  cpFieldInput: {
    fontSize: 20,
    height: 50,
    flex: 0.5,
    textAlign: 'center',
  }



});
