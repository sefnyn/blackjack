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
import hangman0 from './images/145px-Hangman-0.png';
import { Button, Grid, Col, Image } from 'react-bootstrap';
import './App.css';

class Header extends Component {
  render() {
    return (
      <Col className='header'>Hangman: <small>Guess the mystery word!</small></Col>
    );
  }
}

class Computer extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

class MysteryWord extends Component {
  render() {
    return (
      <div>
        <Col className='word'>Mystery word:</Col>
        <Col className='word'>_ _ _ _ _ _ _ _</Col>
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
    };
  }

  handleClick(move) {
    console.log('Board array: ');
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
    const word = 'hangman';
    return (
      <Grid className='grid'>
        <Header />
        <div className='hangman-panel'>
         <Image className='hangman' src={hangman0} alt='hangman0'/>
        </div>
        <div className='word-panel'>
          <MysteryWord word={word} />
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
