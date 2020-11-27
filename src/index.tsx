import './wdyr'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'

import reportWebVitals from './reportWebVitals'
import App from './App'

require('@fortawesome/fontawesome-svg-core/styles.css')

ReactModal.setAppElement('#root')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
