import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserDemo from './UserDemo';
import './UserDemo.css';

it('renders UserDemo without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserDemo />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});