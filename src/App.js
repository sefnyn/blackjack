/* Pieces of data required

- game status: not started, started, game over, match over
- score
- current player
- computer move
- player move
- game winner
- match winner
- moves/objects = [rock, paper, scissors]

Our state is:
- game started
- game over
- match over
- score [player, computer, draw]
- current player
- board [playerMove, computerMove]
- game winner (calculated)
- match winner (calculated)

*/

import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Grid, Col, Image } from 'react-bootstrap';
import './App.css';

class Header extends Component {
  render() {
    return (
      <Col className='header'>Roshambo <small>Rock, paper, scissors</small></Col>
    );
  }
}

class Computer extends Component {
  render() {
    return (
      <div>
         <Button bsSize='small' disabled>{this.props.value}</Button>
      </div>
    );
  }
}

class Player extends Component {
  render() {
    return (
      <div>
        <Button className='player-button' bsSize='small' onClick={() => this.props.onClick()}>
          {this.props.value}
        </Button>
      </div>
    );
  }
}

function Status(props) {
  console.log('Score ' + props.score);
  return (
    <div className='status'>
      <Col>Computer: {props.score[1]}</Col>
      <Col>Player: {props.score[0]}</Col>
      <Col>Draw: {props.score[2]}</Col>
      <Col className='result'>{props.status}</Col>
    </div>
  );
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
      board: [null, '?'],
      score: [0, 0, 0],
      computerIsNext: false,
      result: null
    };
  }

  handleClick(move) {
    const board = this.state.board.slice();
    board[0] = move;
    this.setState({
      board: board,
      computerIsNext: !this.state.computerIsNext,
    });
    console.log('Board array: ' + this.state.board);
  }

  render() {
    const score = this.state.score;
    generateMove(this.state.board);
    const result = calculateWinner(this.state);
    let status;
    if (result) {
      status = result;
    } else {
      status = 'Next move: ' + (this.state.computerIsNext ? 'Computer' : 'Player');
    }

    return (
      <Grid className='grid'>
        <Header />
        <div className='computer'>
          <Col>Computer: {this.state.board[1]}</Col>
          <Computer value={this.state.board[1]} />
        </div>
        <div className='player'>
          <Col>Player: {this.state.board[0]}</Col>
          <Player value={'Rock'}     onClick={() => this.handleClick('Rock')}/>
          <Player value={'Paper'}    onClick={() => this.handleClick('Paper')}/>
          <Player value={'Scissors'} onClick={() => this.handleClick('Scissors')}/>
        </div>
        <Status score={score} status={status}/>
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
    /* generate random move */
    var random = Math.floor(Math.random() * 3);
    board[1] = objects[random];
    return board;
  }
}

export default App;
