import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SessionNotesBlock from './SessionNotesBlock';
import './SessionNotesBlock.css';

it('renders SessionNotesBlock without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SessionNotesBlock
        name={'Test Name'}
        note={'Test note text'}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});