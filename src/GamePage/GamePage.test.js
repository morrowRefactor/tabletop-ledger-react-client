import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GamePage from './GamePage';
import './GamePage.css';

it('renders GamePage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <GamePage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});