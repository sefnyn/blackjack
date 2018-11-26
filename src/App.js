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
import drum  from './sound/drum.mp3';
import boo   from './sound/boo.mp3';
import cheer from './sound/cheer.mp3';

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

function Header() {
  return (
    <Col className='header'>Blackjack: <small>try to beat the house!</small></Col>
  );
}

function Welcome(props) {
  return (
    <div >
      <Image className='big-card' src={jc} />
      <Image className='big-card' src={cardback} />
      <Image className='big-card' src={cardback} />
      <Image className='big-card' src={js} />
      <RenderRulesEtc numCards={props.numCards} />
    </div>
  );
}

function Footer() {
  return (
    <div>
      <Col className='footer'>BJ v.0.91, a ReactJS app written by N Syrotiuk.</Col> <Image className='App-logo' alt='logo' src={logo}/>
    </div>
  );
}

function RenderRulesEtc(props) {
  return (
    <div>
      <Col className='rules'>House rules:</Col>
      <Col className='rules'>Dealer stays on 17.</Col>
      <Col className='rules'>Blackjack consists of Ace & 10/J/Q/K on first two cards only, and pays 3:2.</Col>
      <Col className='rules'>Double your bet on 9, 10 or 11 only.</Col>
      <Col className='rules'>Split not yet implemented.</Col>
      <Col className='rules'>Info: {props.numCards} cards in deck.</Col>
    </div>
  );
}

function Status(props) {
  return (
    <Col className='status'>{props.status}</Col>
  );
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

function PlayAgainButton(props) {
  return (
    <Button className='play-again' bsStyle='primary' bsSize='small' onClick={props.onClick}>
      Play again
    </Button>
  );
}
    
function RenderDealerCards(props) {
  const hand = props.cards;
  if (props.handInProgress || hand.length > 0) { //render if play in progress
    const cards = hand.map((card) =>
      <Image key={card} className='cards' src={card} />
    );
    return (
      <div>
        <Col>Dealer: </Col>
        {cards}
      </div>
    );
  }
  //render Welcome screen if zero cards in Dealer's hand
  return <Welcome numCards={props.numCards}/>;
}

function RenderPlayerCards(props) {
  const hand  = props.cards;
  if (props.handInProgress || hand.length > 0) { //render if play in progress
    const cards = hand.map((card) =>
      <Image key={card} className='cards' src={card} />
    );
    return (
      <div>
        <Col>Player: </Col>
        {cards}
      </div>
    );
  }
  return null;
}

function Balance(props) {
  const money = props.money;
  const handInProgress = props.handInProgress;
  if (money < 1 && !handInProgress) {
//      state.betting = false;
//      state.startingNewHand = false;
//      state.handInProgress = false;
    return (
      <Col>Sorry, out of money!</Col>
    );
  }
  return (
    <Col>You have £{money}</Col>
  );
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
      handInProgress: false,
      betting: true,
      status: '',
      playerPlaying: false,
      playerTotal: 0,
      dealerTotal: 0,
      playerAce: false,
      dealerAce: false,
      playerBlackjack: false,
      dealerBlackjack: false,
      double: false, //player chose to double
      split: false,  //player chose to split
      splitCardsImages: [],
      splitCardsValues: [],
      splitTotal: 0,
      playerBust: false,
      dealerBust: false,
      gameOver: false,
      doubleAllowed: false,
      splitAllowed: false,
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
    var bet = this.state.value;
    const balance = this.state.balance;

    //default bet is EVERYTHING
    //eslint-disable-next-line
    if (bet == 0 && balance != 0) {
      bet = balance;
    }

    //eslint-disable-next-line
    if (bet == 0 && balance == 0) {
      alert('Game over');
    } else if (bet > balance) {
        alert('Illegal bet: ' + bet + ' > ' + balance);
    } else if (bet < 0) {
        alert('Illegal bet: ' + bet + ' <= zero');
    } else {
       const playerCardsImages = this.state.playerCardsImages.slice();
       this.setState({
         value: bet,
         playerCardsImages: playerCardsImages,
         betting: false,
         playerPlaying: true,
         balance: balance - bet,
       });
    }
 }

  handleClickHit() {
    console.log('Hit....');
    const images = this.state.playerCardsImages.slice();
    const values = this.state.playerCardsValues.slice();
    const deck   = this.state.deck;
    const card   = deck.images.pop();
    const value  = deck.values.pop();
    let total    = this.state.playerTotal;
    images.push(card);
    values.push(value);
    total = total + value;
    if (value === 1) { this.setState({ playerAce: true }); }
    if (total > 21)  { 
      this.setState({ 
        playerBust: true,
        playerPlaying: false,
        handInProgress: false,
      }); 
    }
    this.setState({
      playerCardsImages: images,
      playerCardsValues: values,
      playerTotal: total,
      betting: false,
      startingNewHand: false,
    });
  }

  handleClickDouble() {
    console.log('Double...');
    const images = this.state.playerCardsImages.slice();
    const values = this.state.playerCardsValues.slice();
    const deck   = this.state.deck;
    const card   = deck.images.pop();
    const value  = deck.values.pop();
    let total = this.state.playerTotal;
    let bal      = this.state.balance;
    bal = bal - this.state.value;
    images.push(card);
    values.push(value);
    total = total + value;
    if (value === 1) { 
      this.setState({ playerAce: true });
      total = total + 10;
    }
    this.setState({
      double: true,
      doubleAllowed: false,
      playerCardsImages: images,
      playerCardsValues: values,
      playerTotal: total,
      balance: bal,
    });
    this.handleClickStand();
  }

  handleClickStand() {
    console.log('Stand...');
    const pt = this.state.playerTotal;
    this.setState({
      playerPlaying: false,
      betting: false,
      startingNewHand: false,
    });

    var bj = 0;
    if (this.state.playerAce && pt === 11 && this.state.playerCardsImages.length === 2) {
      this.setState({ 
        playerBlackjack: true,
        playerTotal: 'BJ',
      });
      bj = 1;
      console.log('player BJ');
    }

    if (this.state.playerAce && pt < 12) {
      this.setState({ playerTotal: pt + 10 });
    }
    console.log('player hand complete. total is ' + this.state.playerTotal);
    //state of player hand complete

    const images = this.state.dealerCardsImages.slice();
    const values = this.state.dealerCardsValues.slice();
    const deck   = this.state.deck;
    var dt       = this.state.dealerTotal;

    //dealer may not need a 2nd card
    if (bj === 1 && values[0] > 1 && values[0] < 10) {
       this.setState({
         handInProgress: false,
       });
       //dealer loses now
       return null;
    }

    //get dealer's 2nd card
    console.log('getting 2nd card for dealer...');
    const card   = deck.images.pop();
    const value  = deck.values.pop();
    if (value === 1) { 
      this.setState({ dealerAce: true });
    }

    images.push(card);
    values.push(value);
    dt = dt + value;
    console.log('var dt is ' + dt);
    this.setState({
      dealerCardsImages: images,
      dealerCardsValues: values,
      dealerTotal: dt,
    });

    var dealerAceFlag = 0; //off if dealer has an Ace
    if (values[0] === 1 || values[1] ===1) {
      dealerAceFlag = 1;
      console.log('yup, 1st or 2nd dealer card is an Ace');
      if (dt === 11) {
         this.setState({ 
           dealerBlackjack: true,
           dealerTotal: 'BJ',
           handInProgress: false,
         });
         console.log('dealer BJ');
         return null;
      } else if (bj === 1) { //player BJ
         this.setState({
           handInProgress: false,
         });
         //dealer loses now
         return null;
      } else if (dt > 6) {
         dt = dt + 10;
         this.setState({ 
           dealerTotal: dt,
           handInProgress: false,
         });
         console.log('dealer has 17, 18, 19 or 20');
         return null;
      }
    }

    //get more cards for dealer if hand total < hard 17
    var hand = dt;
//    if (flag === 1) { hand = hand + 10; }
    while (hand < 17 && !bj) {
      console.log('get another card for dealer...');
      const card   = deck.images.pop();
      const value  = deck.values.pop();
      dt = dt + value;
      images.push(card);
      values.push(value);
      this.setState({
        dealerCardsImages: images,
        dealerCardsValues: values,
        dealerTotal: dt,
      });

      if (value === 1) { 
        this.setState({ dealerAce: true }); 
        dealerAceFlag = 1;
      }
      if (dt > 21)  { 
        this.setState({ 
          dealerBust: true,
          playerPlaying: false,
          handInProgress: false,
        });
        return;
      } 

      if (dealerAceFlag === 1 && dt < 12) {
        dt = dt + 10;
        this.setState({ dealerTotal: dt });
      }
 
      hand = dt;
//      if (flag === 1) { hand = hand + 10; }
    }

    this.setState({
      handInProgress: false,
    });
  }
 
  handleClickPlayAgain() {
    if (this.state.deck.values.length < 10) {
      this.setState({
        deck: shuffleDeck()
      });
    }

    this.setState({
      startingNewHand: true,
      betting: true,
      value: '',
      playerCardsImages: [],
      playerCardsValues: [],
      playerTotal: 0,
      playerBust: false,
      playerAce: false,
      playerBlackjack: false,
      dealerCardsImages: [],
      dealerCardsValues: [],
      dealerTotal: 0,
      dealerBust: false,
      dealerAce: false,
      dealerBlackjack: false,
      handInProgress: false,
      double: false,
      split: false,
    });
  }

  renderButtons() {
    let hand     = this.state.playerCardsValues;
    let noPlay   = !this.state.playerPlaying;
    let noSplit  = !this.state.splitAllowed;
    let noDouble = !this.state.doubleAllowed;
    if (hand.length > 0) {
      return (
        <div className='actions'>
          <StandButton noPlay={noPlay}      onClick={() => this.handleClickStand()} />
          <SplitButton noSplit={noSplit} />
          <DoubleButton noDouble={noDouble} onClick={() => this.handleClickDouble()} />
          <HitButton noPlay={noPlay}        onClick={() => this.handleClickHit()} />
        </div>    
      );
    }
    return null;
  }

  renderPlayAgain() {
    let handInProgress = this.state.handInProgress;
    let startingNewHand = this.state.startingNewHand;
    if (startingNewHand || handInProgress) {
       return null;
    } else {
       return (
        <PlayAgainButton onClick={() => this.handleClickPlayAgain()} />
      );
    }
  }

  render() {
//    if (this.state.deck.images.length < 10) {

    const startingNewHand = this.state.startingNewHand;
    const betting   = this.state.betting;
    if (startingNewHand && !betting) {
      dealThreeCards(this.state);
    }
    const handInProgress = this.state.handInProgress;
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
          <RenderDealerCards cards={this.state.dealerCardsImages} total={this.state.dealerTotal} handInProgress={handInProgress} numCards={this.state.deck.images.length}/>
          <RenderPlayerCards cards={this.state.playerCardsImages} total={this.state.playerTotal} handInProgress={handInProgress}/>
          {this.renderButtons()}
          <Status status={status} />
          {this.renderPlayAgain()}
        </div>
        <div className='balance'>
          <Balance money={this.state.balance} handInProgress={handInProgress} />
        </div>
        <div className='bet'>
          <form onSubmit={this.handleSubmit}>
            <input className='enter'
              type='number'
              placeholder='Bet?'
              value={this.state.value}
              onChange={this.handleChange}
              disabled={!this.state.betting}
              alt='Bet?'
              autoFocus='autofocus'
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
  state.handInProgress = true;
  state.doubleAllowed = isDoubleAllowed(state);
  console.log('double allowed: ' + state.doubleAllowed);
}

function getPlayerCard(state) {
  const deck = state.deck;
  const card = deck.images.pop();
  const value = deck.values.pop();
  if (value === 1) { state.playerAce = true; }
  state.playerTotal = state.playerTotal + value;
  state.playerCardsImages.push(card);
  state.playerCardsValues.push(value);
  console.log('getting PlayerCard, value is ' + value);
  return null;
}

function getDealerCard(state) {
  const deck = state.deck;
  const card = deck.images.pop();
  const value = deck.values.pop();
  if (value === 1) { state.dealerAce = true; }
  state.dealerTotal = state.dealerTotal + value;
  state.dealerCardsImages.push(card);
  state.dealerCardsValues.push(value);
  console.log('getting DealerCard, value is ' + value);
  return null;
}

function calculateWinner(state) {
var audioCheer = new Audio(cheer);
var audioDrum = new Audio(drum);
var audioBoo = new Audio(boo);
 
if (!state.handInProgress && !state.betting) {
  if (state.playerBust) {
     audioBoo.play();
     return 'Player bust !';
  } else if (state.dealerBust) {
     if (state.double) {
        state.balance = state.balance + (Number(state.value) * 4);
     } else {
        state.balance = state.balance + (Number(state.value) * 2);
     }
     audioCheer.play();
     console.log('balance ' + state.balance);
     return 'Dealer bust! :)';
   } else if (state.playerBlackjack && state.dealerBlackjack) {
     state.balance = state.balance + Number(state.value);
     return 'Draw  :<|';
  } else if (state.playerBlackjack) {
     state.balance = state.balance + Number(state.value) + (Number(state.value) * 1.5);
     audioDrum.play();
     console.log('balance ' + state.balance);
     return 'Blackjack pays 3:2';
  } else if (state.dealerBlackjack) {
     audioBoo.play();
     return 'Dealer has Blackjack!';
  } else if (state.playerTotal === state.dealerTotal) {
     state.balance = state.balance + Number(state.value);
     console.log('balance ' + state.balance);
     return 'Draw  :<|';
  } else if (state.playerTotal > state.dealerTotal) {
     var winnings;
     if (state.double) {
        winnings = Number(state.value) * 4;
        state.balance = state.balance + winnings;
     } else {
        winnings = Number(state.value) * 2;
        state.balance = state.balance + winnings;
     }
     console.log('balance ' + state.balance);
     winnings = winnings / 2;
     audioCheer.play();
     return 'Player wins £' + winnings + '!';
  } else {
     audioBoo.play();
     return 'Dealer wins! :(';
  }
 } return null;
}

function isDoubleAllowed(state) {
  const total = state.playerCardsValues[0] + state.playerCardsValues[1];
  const balance = state.balance;
  const bet = state.value;
  if (   total >= 9 
      && total <= 11 
      && balance - bet >= 0
      && !state.playerAce
      && state.playerCardsValues.length === 2) {
    return true;
  }
  return false;
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
