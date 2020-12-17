import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SessionPlayerBlock from './SessionPlayerBlock';
import './SessionPlayerBlock.css';

it('renders SessionPlayerBlock without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SessionPlayerBlock />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});