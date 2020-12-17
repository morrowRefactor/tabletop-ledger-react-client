import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GameTip from './GameTip';
import APIContext from '../APIContext';
import './GameTip.css';

it.only('renders GameTip without crashing', () => {
  const div = document.createElement('div');
  const user = { name: 'John Doe'};
  ReactDOM.render(
    <BrowserRouter>
      <GameTip 
        uid={`1`}
        tip={`Test tip text`}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});