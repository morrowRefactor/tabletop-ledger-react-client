import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SessionPlayerForm from './SessionPlayerForm';
import './SessionPlayerForm.css';

it('renders SessionPlayerForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SessionPlayerForm />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});