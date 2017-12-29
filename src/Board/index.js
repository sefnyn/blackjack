import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './board.css';

const Message = () => (
  <Col xs={12} className="message">
    <span>a message</span>
  </Col>
);

const Board = () => (
  <Grid className="board">
    <Row>
      <span>just some space</span>
    </Row>
  </Grid>
);

export const BoardPanel = () => (
  <Grid className="panel">
    <Row>
      <Message />
    </Row>
    <Row>
      <Board />
    </Row>
  </Grid>
);


