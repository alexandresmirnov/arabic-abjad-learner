import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

import { styles } from './styles.js';

//logic behind the game, checks if input and answer match
class CharManager extends Component {

  static propTypes = {
    language: PropTypes.object.isRequired,
    hintText: PropTypes.array,
  }

  constructor(props){
    super(props);

    this.state = {
      char: '',
      answer: '',
      inputValue: '',
      hint: ''
    };

    this.onFocus = this.props.onFocus == null ? () => {} : this.props.onFocus;
    this.onInput = this.props.onInput == null ? () => {} : this.props.onInput;
    this.beforeGenerateNew = this.props.beforeGenerateNew == null ? () => {} : this.props.beforeGenerateNew;

    this.hintText = '';

    if(this.props.hintText == null){
      this.hintText = 'Type the transliteration.\nTo see the answer, type space.\nPull down for settings.';
    }
    else {
      for(let i = 0; i < this.props.hintText.length; i++){
        this.hintText = this.hintText + this.props.hintText[i] + "\n";
      }
    }

    //note that this.props contains settings object passed down from parent screen (e.g. ArabicWordsScreen)

  }


  generateNew() {
    this.beforeGenerateNew();

    let set = this.props.language.getNew();

    this.setState({
      char: set.char,
      answer: set.answer,
      inputValue: '',
      hint: ''
    });

  }

  componentDidMount() {
    this.generateNew();
    this.setState({
      hint: this.hintText
    })
  }

  handleInput(input){
    this.onInput();
    this.setState({
      inputValue: input
    });
    if(input == this.state.answer || input == 'x'){
      this.generateNew();
    }
    else if(input == ' '){
      this.setState({
        hint: this.state.answer,
        inputValue: ''
      });
    }
    else if(input.length >= this.state.answer.length){
      this.setState({
        hint: 'wrong'
      });
    }
    else {
      this.setState({
        hint: ''
      });
    }
  }

  handleEndEditing(){
    this.setState({
      hint: this.hintText,
      inputValue: ''
    })
  }

  render() {
    return (
      <CharView
        char={this.state.char}
        answer={this.state.answer}
        inputValue = {this.state.inputValue}
        hint={this.state.hint}
        onInput={(input) => this.handleInput(input)}
        onFocus = {() => this.onFocus()}
        onEndEditing = {() => this.handleEndEditing()}
      />
    )
  }
}

//responsible for generating all the visible components of the game
class CharView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.charView}>
        <CharDisplay char={this.props.char} />
        <CharInput
          inputValue={this.props.inputValue}
          onInput={(input) => this.props.onInput(input)}
          onFocus={() => this.props.onFocus()}
          onEndEditing={() => this.props.onEndEditing()}
        />
        <CharHint hint={this.props.hint} />
      </View>
    );
  }
}

// expects onInput prop to handle text change
export class CharInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={styles.charDisplay}>
        <TextInput
          style = {styles.input}
          value = {this.props.inputValue}
          autoCapitalize = 'none'
          autoCorrect = {false}
          onChangeText = {(text) => {
              this.props.onInput(text);
            }
          }
          onFocus = {() => {
            this.props.onFocus();
          }}
          onEndEditing = {() => {
            this.props.onEndEditing();
          }}
        />
      </View>
    );
  }
}

class CharDisplay extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let display = this.props.char;
    return (
      <Text style={styles.character}>{display}</Text>
    );
  }
}


class CharHint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.charHint}>{this.props.hint}</Text>
    );
  }
}

export default CharManager;
