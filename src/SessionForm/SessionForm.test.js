import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SessionForm from './SessionForm';
import './SessionForm.css';

it('renders SessionForm without crashing', () => {
  const div = document.createElement('div');
  const match = { params: { uid: 1 } };
  const location = { pathname: 'test' };
  ReactDOM.render(
    <BrowserRouter>
      <SessionForm 
        id={1}
        title={'Test Title'}
        yearPub={2020}
        match={match}
        location={location}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});