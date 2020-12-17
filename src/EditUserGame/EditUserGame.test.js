import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditUserGame from './EditUserGame';
import './EditUserGame.css';

it('renders EditUserGame without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditUserGame />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});