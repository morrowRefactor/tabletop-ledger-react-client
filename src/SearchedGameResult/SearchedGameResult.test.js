import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchedGameResult from './SearchedGameResult';
import './SearchedGameResult.css';

it('renders SearchedGameResult without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SearchedGameResult 
        id={1}
        title={'Test Title'}
        yearPub={2020}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});