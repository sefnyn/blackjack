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
import card0 from './cards/jc.gif';
import { Grid, Col, Image } from 'react-bootstrap';
import './App.css';

class Header extends Component {
  render() {
    return (
      <Col className='header'>Blackjack: <small>try to beat the house!</small></Col>
    );
  }
}

class RenderCards extends Component {
  render() {
    return (
      <Image className='cards' src={this.props.value} />
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
      nextCard: null,
      dealerHand: [],
      playerHand: [],
      value: '', /* bet */
      balance: 500,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const dealerHand = this.state.dealerHand.slice();
    const playerHand = this.state.playerHand.slice();
    this.setState({
      value: e.target.value.toUpperCase(),
      dealerHand: dealerHand,
      playerHand: playerHand,
    });
  }

  handleSubmit(e) {
    console.log('number entered: ' + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <Grid className='grid'>
        <Header />
        <div className='card-panel'>
          <RenderCards value={card0}/>
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

export default App;
