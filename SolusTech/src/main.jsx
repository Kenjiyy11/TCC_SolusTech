import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

import "bootstrap/dist/js/bootstrap.bundle.min"
import Login from './Pages/Home/login/Login.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Login/>
  </StrictMode>,
)
