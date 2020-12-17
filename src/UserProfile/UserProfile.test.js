import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProfile from './UserProfile';
import './UserProfile.css';

it('renders UserProfile without crashing', () => {
  const div = document.createElement('div');
  const match = {params: { uid: 1 }};
  ReactDOM.render(
    <BrowserRouter>
      <UserProfile 
        match={match}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});