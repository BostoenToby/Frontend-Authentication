import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import AppRouter from './screens/'

import './assets/tailwind.css'

// npm i webfontloader
// npm i -D @types/webfontloader --> om de types te krijgen
import { load } from 'webfontloader'

load({
  google: {
    families: ['Playfair Display']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)