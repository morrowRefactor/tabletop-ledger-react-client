import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserRegistration from './UserRegistration';
import './UserRegistration.css';

it('renders UserRegistration without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserRegistration />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});