import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles.js';

//logic behind the game, checks if input and answer match
class CharManager extends Component {

  static propTypes = {
    language: React.PropTypes.object.isRequired
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
      hint: 'Type the transliteration.\nTo see the answer, type space.\nPull down for settings.'
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

  render() {
    return (
      <CharView
        char={this.state.char}
        answer={this.state.answer}
        inputValue = {this.state.inputValue}
        hint={this.state.hint}
        onInput={(input) => this.handleInput(input)}
        onFocus = {() => this.onFocus()}
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
          placeHolder="test"
          onChangeText = {(text) => {
              this.props.onInput(text);
            }
          }
          onFocus = {() => {
            this.props.onFocus();
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
