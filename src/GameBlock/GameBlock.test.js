import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GameBlock from './GameBlock';
import './GameBlock.css';

it('renders GameBlock without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <GameBlock
        id={1}
        title={`Test Title`}
        image={`https://www.someimage.com`}
        playCount={10}
        bggRating={9.2}
        description={`Test description test`}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});