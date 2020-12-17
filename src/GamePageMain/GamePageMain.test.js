import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GamePageMain from './GamePageMain';
import './GamePageMain.css';

it('renders GamePageMain without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <GamePageMain />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});