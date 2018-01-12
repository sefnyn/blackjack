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
- betting
- dealer total
- player total
- split
- double

*/

import React, { Component } from 'react';
import logo from './logo.svg';
import { Grid, Col, Image, Button } from 'react-bootstrap';
import './App.css';
import cardback from './cards/b.gif';

//clubs
import c2 from  './cards/2c.gif';
import c3 from  './cards/3c.gif';
import c4 from  './cards/4c.gif';
import c5 from  './cards/5c.gif';
import c6 from  './cards/6c.gif';
import c7 from  './cards/7c.gif';
import c8 from  './cards/8c.gif';
import c9 from  './cards/9c.gif';
import tc from  './cards/tc.gif';
import jc from  './cards/jc.gif';
import qc from  './cards/qc.gif';
import kc from  './cards/kc.gif';
import ac from  './cards/ac.gif';

//diamonds
import d2 from  './cards/2d.gif';
import d3 from  './cards/3d.gif';
import d4 from  './cards/4d.gif';
import d5 from  './cards/5d.gif';
import d6 from  './cards/6d.gif';
import d7 from  './cards/7d.gif';
import d8 from  './cards/8d.gif';
import d9 from  './cards/9d.gif';
import td from  './cards/td.gif';
import jd from  './cards/jd.gif';
import qd from  './cards/qd.gif';
import kd from  './cards/kd.gif';
import ad from  './cards/ad.gif';

//hearts
import h2 from  './cards/2h.gif';
import h3 from  './cards/3h.gif';
import h4 from  './cards/4h.gif';
import h5 from  './cards/5h.gif';
import h6 from  './cards/6h.gif';
import h7 from  './cards/7h.gif';
import h8 from  './cards/8h.gif';
import h9 from  './cards/9h.gif';
import th from  './cards/th.gif';
import jh from  './cards/jh.gif';
import qh from  './cards/qh.gif';
import kh from  './cards/kh.gif';
import ah from  './cards/ah.gif';

//spades
import s2 from  './cards/2s.gif';
import s3 from  './cards/3s.gif';
import s4 from  './cards/4s.gif';
import s5 from  './cards/5s.gif';
import s6 from  './cards/6s.gif';
import s7 from  './cards/7s.gif';
import s8 from  './cards/8s.gif';
import s9 from  './cards/9s.gif';
import ts from  './cards/ts.gif';
import js from  './cards/js.gif';
import qs from  './cards/qs.gif';
import ks from  './cards/ks.gif';
import as from  './cards/as.gif';

class Header extends Component {
  render() {
    return (
      <Col className='header'>Blackjack: <small>try to beat the house!</small></Col>
    );
  }
}

function Welcome() {
  return (
    <div >
      <Image className='big-card' src={jc} />
      <Image className='big-card' src={cardback} />
      <Image className='big-card' src={cardback} />
      <Image className='big-card' src={js} />
    </div>
  );
}

class Status extends Component {
  render() {
    return (
      <Col className='status'>{this.props.status}</Col>
    );
  }
}

function StandButton(props){
  return (
    <Button bsStyle='primary' bsSize='small' disabled={props.noPlay} onClick={props.onClick}>
      Stand
    </Button>
  );
}

function SplitButton(props) {
  return (
    <Button bsStyle='primary' bsSize='small' disabled={props.noSplit} onClick={props.onClick}>
      Split
    </Button>
  );
}

function DoubleButton(props) {
  return (
    <Button bsStyle='primary' bsSize='small' disabled={props.noDouble} onClick={props.onClick}>
      Double
    </Button>
  );
}

function HitButton(props) {
  return (
    <Button bsStyle='primary' bsSize='small' disabled={props.noPlay} onClick={props.onClick}>
      Hit
    </Button>
  );
}

function RenderDealerCards(props) {
  const hand = props.cards;
  if (hand.length > 0) {
    const cards = hand.map((card) =>
      <Image key={card} className='cards' src={card} />
    );
    return (
      <div>
        <Col>Dealer: {props.total}</Col>
        {cards}
      </div>
    );
  }
  //render Welcome screen if zero cards in Dealer's hand
  return <Welcome />;
}

function RenderPlayerCards(props) {
  const hand  = props.cards;
  if (hand.length > 0) {
    const cards = hand.map((card) =>
      <Image key={card} className='cards' src={card} />
    );
    return (
      <div>
        <Col>Player: {props.total}</Col>
        {cards}
      </div>
    );
  }
  return null;
}

class Balance extends Component {
  render() {
    return (
      <div>
        <Col>You have £ {this.props.money}.</Col>
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
      deck: shuffleDeck(), //returns object { images, values }
      dealerCardsImages: [],
      playerCardsImages: [],
      dealerCardsValues: [],
      playerCardsValues: [],
      value: '', /* bet */
      balance: 500,
      startingNewHand: true,
      handOver: false,
      gameOver: false,
      betting: true,
      status: '',
      playerPlaying: false,
      playerTotal: 0,
      dealerTotal: 0,
      playerAce: false,
      dealerAce: false,
      double: false,
      split: false,
      splitCardsImages: [],
      splitCardsValues: [],
      splitTotal: 0,
      playerBust: false,
      dealerBust: false,
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
      const playerCardsImages = this.state.playerCardsImages.slice();
      this.setState({
        value: bet,
        playerCardsImages: playerCardsImages,
        betting: false,
        playerPlaying: true,
        balance: balance - bet,
      });
    } else {
        alert('Illegal bet: ' + bet + ' > ' + balance);
    }
  }

  handleClickHit() {
    const images = this.state.playerCardsImages.slice();
    const values = this.state.playerCardsValues.slice();
    const deck = this.state.deck;
    const card = deck.images.pop();
    const value  = deck.values.pop();
    let total = this.state.playerTotal;
    images.push(card);
    values.push(value);
    total = total + value;
    if (value === 1) { this.setState({ playerAce: true }); }
    if (value > 21)  { this.setState({ playerBust: true }); }
    this.setState({
      playerCardsImages: images,
      playerCardsValues: values,
      playerTotal: total,
      betting: false,
      startingNewHand: false,
    });
  }

  handleClickStand() {
    this.setState({
      playerPlaying: false,
      betting: false,
      startingNewHand: false,
    });
  }

  renderButtons() {
    let hand     = this.state.playerCardsValues;
    let noPlay   = !this.state.playerPlaying;
    let noSplit  = !this.state.split;
    let noDouble = !this.state.double;
    if (hand.length > 0) {
      return (
        <div className='actions'>
          <StandButton noplay={noPlay}      onClick={() => this.handleClickStand()}/>
          <SplitButton noSplit={noSplit} />
          <DoubleButton noDouble={noDouble} />
          <HitButton noPlay={noPlay}        onClick={() => this.handleClickHit()}/>
        </div>    
      );
    }
    return null;
  }

  render() {
    const startingNewHand = this.state.startingNewHand;
    const betting   = this.state.betting;
    if (startingNewHand && !betting) {
      dealThreeCards(this.state);
    }
    const result = calculateWinner(this.state);
    let status;
    if (result) {
       status = result;
    } else {
       status = '';
    }

    return (
      <Grid className='grid'>
        <Header />
        <div className='card-panel'>
          <RenderDealerCards cards={this.state.dealerCardsImages} total={this.state.dealerTotal}/>
          <RenderPlayerCards cards={this.state.playerCardsImages} total={this.state.playerTotal}/>
          {this.renderButtons()}
          <Status status={status} />
        </div>
        <div className='balance'>
          <Balance money={this.state.balance} />
        </div>
        <div className='bet'>
          <form onSubmit={this.handleSubmit}>
            <input className='enter'
              type='number'
              placeholder='Bet?'
              required
              value={this.state.value}
              onChange={this.handleChange}
              disabled={!this.state.betting}
              alt='Bet?'
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

function dealThreeCards(state) {
  getPlayerCard(state);
  getDealerCard(state);
  getPlayerCard(state);
}

function getPlayerCard(state) {
  const deck = state.deck;
  const card = deck.images.pop();
  const value = deck.values.pop()
  state.playerTotal = state.playerTotal + value;
  state.playerCardsImages.push(card);
  state.playerCardsValues.push(value);
  console.log('getting PlayerCard, value is ' + value);
  return [card, value];
}

function getDealerCard(state) {
  const deck = state.deck;
  const card = deck.images.pop();
  const value = deck.values.pop();
  state.dealerTotal = state.dealerTotal + value;
  state.dealerCardsImages.push(card);
  state.dealerCardsValues.push(value);
  console.log('getting DealerCard, value is ' + value);
  return [card, value];
}

function calculateWinner(state) {
  //to do


}


function shuffleDeck() {
/* Returns array shuffledDeck */
  console.log('Shuffling deck...');
  const clubs    = [ac, c2, c3, c4, c5, c6, c7, c8, c9, tc, jc, qc, kc];
  const diamonds = [ad, d2, d3, d4, d5, d6, d7, d8, d9, td, jd, qd, kd];
  const hearts   = [ah, h2, h3, h4, h5, h6, h7, h8, h9, th, jh, qh, kh];
  const spades   = [as, s2, s3, s4, s5, s6, s7, s8, s9, ts, js, qs, ks];

  var deck = clubs;
  deck = deck.concat(diamonds);
  deck = deck.concat(hearts);
  deck = deck.concat(spades);

  const valuesOrdered = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  var deckValues = valuesOrdered;
  deckValues = deckValues.concat(valuesOrdered);
  deckValues = deckValues.concat(valuesOrdered);
  deckValues = deckValues.concat(valuesOrdered);

//  console.log(deck);
  
  var images = [];
  var values = [];
  for (var index=52; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * index);

    //process image
    var card = deck[randomIndex];
    images.push(card);
    deck.splice(randomIndex, 1); //remove card

    //process value
    var val = deckValues[randomIndex];
    values.push(val);
    deckValues.splice(randomIndex, 1); //remove card
  }
  console.log('shuffled images length ' + images.length);
  console.log('shuffled values length ' + values.length);
  return { images, values };
}


export default App;