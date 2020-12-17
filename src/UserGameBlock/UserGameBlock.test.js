import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserGameBlock from './UserGameBlock';
import './UserGameBlock.css';

it('renders UserGameBlock without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserGameBlock 
        title={'Some Game'}
        gameID={1}
        bggRating={8.2}
        playCount={22}
        info={'some info text'}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});