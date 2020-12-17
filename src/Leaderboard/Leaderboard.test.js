import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import './Leaderboard.css';

it('renders Leaderboard without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Leaderboard />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});