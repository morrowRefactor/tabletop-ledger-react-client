import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserReccoBlock from './UserReccoBlock';
import './UserReccoBlock.css';

it('renders UserReccoBlock without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserReccoBlock
        uid={1}
        recco={2}
        note={'some note text'}
      />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});