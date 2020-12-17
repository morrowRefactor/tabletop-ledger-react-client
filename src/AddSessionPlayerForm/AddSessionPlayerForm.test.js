import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddSessionPlayerForm from './AddSessionPlayerForm';
import './AddSessionPlayerForm.css';

it('renders AddSessionPlayerForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddSessionPlayerForm
            id={1}
       />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});