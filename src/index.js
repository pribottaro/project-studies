import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global-styles.css';
import Home from './templates/Home';

ReactDOM.render(
  <React.StrictMode>
    <Home prop-qualquer="Aqui é uma prop qualquer" />
  </React.StrictMode>,
  document.getElementById('root')
);

