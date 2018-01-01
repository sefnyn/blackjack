/* Pieces of data required

- random word
- body parts
- guessed letters


Our state is:
- currentLetter
- mysteryWord


*/

import React, { Component } from 'react';
import logo from './logo.svg';
import { Grid, Col, Image } from 'react-bootstrap';
import hangman0 from './images/145px-Hangman-0.png';
import hangman1 from './images/145px-Hangman-1.png';
import hangman2 from './images/145px-Hangman-2.png';
import hangman3 from './images/145px-Hangman-3.png';
import hangman4 from './images/145px-Hangman-4.png';
import hangman5 from './images/145px-Hangman-5.png';
import hangman6 from './images/145px-Hangman-6.png';
import './App.css';

class Header extends Component {
  render() {
    return (
      <Col className='header'>Hangman: <small>Guess the mystery word!</small></Col>
    );
  }
}

class DrawHangman extends Component {
  render() {
    return (
      <Image className='hangman' src={this.props.value} alt={this.props.value} />
    );
  }
}

class MysteryWord extends Component {
  render() {
    return (
      <div>
        <Col className='word'>Mystery word: {this.props.word}</Col>
        <Col className='word'>{this.props.mystery}</Col>
      </div>
    );
  }
}

class Guesses extends Component {
  render() {
    return (
      <div>
        <Col className='guesses'>Guesses: {this.props.letters}</Col>
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div>
        <Col className='footer'>Written by N Syrotiuk. Powered by React</Col>
        <Image className='App-logo' alt='logo' src={logo}/>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: 'hangman',
      mystery: '_ _ _ _ _ _ _',
      letters: ['e', 'o', 'u'],
      value: '',
      drawingIndex: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value.toUpperCase()});
  }

  handleSubmit(e) {
    console.log('letter entered: ' + this.state.value);
    e.preventDefault();
  }

  render() {
/*    const score = this.state.score;
    generateMove(this.state.board);
    const result = calculateWinner(this.state);
    let status;
    if (result) {
      status = result;
    } else {
      status = 'Next move: ' + (this.state.computerIsNext ? 'Computer' : 'Player');
    }
*/
    const word = this.state.word;
    const mystery = this.state.mystery;
    const letters = this.state.letters;
    const drawings = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6];
    return (
      <Grid className='grid'>
        <Header />
        <div className='hangman-panel'>
          <DrawHangman value={drawings[this.state.drawingIndex]} /> 
        </div>
        <div className='word-panel'>
          <MysteryWord word={word} mystery={mystery} />
          <Guesses letters={letters} />
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input className='enter'
              type='text'
              placeholder='Please enter one letter...'
              maxLength='1'
              required
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </div>
        <Footer />
      </Grid>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}
/*
function calculateWinner(state) {
  const playerMove = state.board[0];
  const computerMove = state.board[1];
  if ((playerMove == null) && (computerMove === '?')) {
    return null;
  } else {
    if (playerMove === computerMove) {
      state.score[2]++;
      return 'Draw';
    } else {
      if (((playerMove === 'Rock') && (computerMove === 'Scissors')) ||
          ((playerMove === 'Paper') && (computerMove === 'Rock')) ||
          ((playerMove === 'Scissors') && (computerMove === 'Paper'))) {
        state.score[0]++;
        return 'Player wins';
      } else {
        state.score[1]++;
        return 'Computer wins';
      }
    }
  }
}

function generateMove(board) {

  const objects = ['Rock', 'Paper', 'Scissors'];
  if (board[0] == null) {
    return null;
  } else {
    var random = Math.floor(Math.random() * 3);
    board[1] = objects[random];
    return board;
  }
}

*/

export default App;
