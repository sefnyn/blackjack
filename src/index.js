import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const R = 'r';
const P = 'p';
const S = 's';
const state = {
   board: [R, P, S, null, null, S, R, null, null],
};

console.log('mounting React...');
ReactDOM.render(<App {...state}/>, document.getElementById('root'));
registerServiceWorker();
