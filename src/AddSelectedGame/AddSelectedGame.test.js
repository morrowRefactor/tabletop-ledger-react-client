import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddSelectedGame from './AddSelectedGame';
import './AddSelectedGame.css';

it('renders AddSelectedGame without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddSelectedGame
        image={`https://www.someimage.com`}
        title={`Test Title`}
        yearPub={2020}
        desc={`Test description text`} 
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});