/* Pieces of data required

- random deck of cards
- player's total
- dealer's total
- balance in £ sterling

Our state is:
- deck
- player's cards
- dealer's cards
- hand over
- game over
- dealer winner
- balance
- bet in progress
- next card

*/

import React, { Component } from 'react';
import logo from './logo.svg';
import c2 from  './cards/2c.gif';
import { Grid, Col, Image } from 'react-bootstrap';
import './App.css';

class Header extends Component {
  render() {
    return (
      <Col className='header'>Blackjack: <small>try to beat the house!</small></Col>
    );
  }
}

class Status extends Component {
  render() {
    return (
      <Col className='status'>{this.props.status}</Col>
    );
  }
}

class RenderDealerCards extends Component {
  render() {
    return (
      <div>
        <Col>Dealer:</Col>
        <Image className='cards' src={this.props.value} />
      </div>
    );
  }
}

class RenderPlayerCards extends Component {
  render() {
    return (
      <div>
        <Col>Player:</Col>
        <Image className='cards' src={this.props.value} />
      </div>
    );
  }
}

class Balance extends Component {
  render() {
    return (
      <div>
        <Col className='balance'>You have £ {this.props.money}</Col>
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
      deck: [],
      nextCard: null,
      dealerHand: [c2],
      playerHand: [c2],
      value: '', /* bet */
      balance: 500,
      startHand: true,
      handOver: false,
      gameOver: false,
      betInProgress: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit(e) {
    console.log('Bet entered: ' + this.state.value);
    e.preventDefault();
    const bet = this.state.value;
    const balance = this.state.balance;
    if (bet <= balance) {
      const playerHand = this.state.playerHand.slice();
      this.setState({
        value: bet,
        playerHand: playerHand,
        betInProgress: false,
        balance: balance - bet,
      });
    } else {
        alert('Illegal bet: ' + bet + ' > ' + balance);
    }
  }

  render() {
//    const deck = shuffleDeck(this.state); 
    const startHand = this.state.startHand;
    if (startHand) {
      dealFourCards(this.state);
    }
    const result = playHand(this.state);
    let status;
    if (result) {
      status = result;
    } else {
        status = 'Status';
    }

    return (
      <Grid className='grid'>
        <Header />
        <div className='card-panel'>
          <RenderDealerCards value={this.state.dealerHand} />
          <RenderPlayerCards value={this.state.playerHand} />
          <Status status={status} />
        </div>
        <div className='money-panel'>
          <Balance money={this.state.balance} />
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input className='enter'
              type='number'
              placeholder='Place your bet...'
              required
              value={this.state.value}
              onChange={this.handleChange}
              disabled={this.state.betOver}
              alt='Place your bet'
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

function dealFourCards(state) {
  //to do
  const len = state.deck.length;
  if (len <= 14) { //14 because unlikely for each player to have 7 cards
    state.deck = shuffleDeck(state);
  }
  for (var i=1; i<5; i++) {
    dealCard();
  }
}

function dealCard(state) {



}


function playHand(state) {
  //to do


}


function shuffleDeck(state) {
  console.log('Shuffling deck...');
  const clubs    = ['ac', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'tc', 'jc', 'qc', 'kc'];
  const diamonds = ['ad', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'td', 'jd', 'qd', 'kd'];
  const hearts   = ['ah', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'th', 'jh', 'qh', 'kh'];
  const spades   = ['as', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'ts', 'js', 'qs', 'ks'];

  var deck = state.deck;
  deck = clubs.concat(diamonds);
  deck = deck.concat(hearts);
  deck = deck.concat(spades);
  console.log(deck);
  return deck;
}




export default App;
