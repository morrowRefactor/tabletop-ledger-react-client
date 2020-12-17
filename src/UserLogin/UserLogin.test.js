import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserLogin from './UserLogin';
import './UserLogin.css';

it('renders UserLogin without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserLogin />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});