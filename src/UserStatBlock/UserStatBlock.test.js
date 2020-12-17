import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserStatBlock from './UserStatBlock';
import './UserStatBlock.css';

it('renders UserStatBlock without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserStatBlock 
        board={'test text'}
        wins={1}
        sessions={10}
        ratio={.10}
        name={'test name'}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});