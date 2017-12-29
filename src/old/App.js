import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';
import './App.css';



class App extends Component {
startGame() {
  console.log('start button clicked');
}
render() {
  return (
    <Grid className='grid'>
      <Row className='header'>
         <Col>Roshambo <small>Rock, paper, scissors</small></Col>
      </Row>
      <Row className='computer'>
         <Col>Computer's move</Col>
         <Button bsSize='small'>?</Button>
      </Row>
      <Row className='player'>
         <Col>Player's move</Col>
         <Button bsSize='small'>Rock</Button>
         <Button bsSize='small'>Paper</Button>
         <Button bsSize='small'>Scissors</Button>
      </Row>
      <Row className='status'>
         <Col className='score'>Computer:&nbsp;&nbsp; 0</Col>
         <Col className='score'>Player:&nbsp;&nbsp; 0</Col>
         <Button className='startbutton' bsSize='small' onClick={this.startGame}>Start game</Button>
      </Row>
      <Row>
        <Col className='footer'>Powered by React</Col>
        <Image className='App-logo' alt='logo' src={logo}/>
      </Row>
    </Grid>
   );
}
}

export default App;
