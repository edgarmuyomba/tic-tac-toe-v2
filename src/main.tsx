import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Router from './Router/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Welcome /> */}
    <Router />
  </React.StrictMode>,
)
