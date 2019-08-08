//
// function createDomElement() {
//   const dom = document.createElement('div');
//   dom.innerHTML = "webpack4 react babel7 ";
//   // dom.className = 'box';
//
//   dom.classList.add('box');
//   return dom;
// }
//
// const divDom = createDomElement();
//
// document.body.appendChild(divDom);

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style/a.css';
import './style/index.scss';
let a = 1;
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     console.log('accepted lib')
//     const App = require('./App').default
//     ReactDOM(App)
//   })
// }
