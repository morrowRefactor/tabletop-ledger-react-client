import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SessionPage from './SessionPage';
import './SessionPage.css';

it('renders SessionPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SessionPage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});