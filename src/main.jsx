import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1063466341006-bqkllilhr3l6v41q9qgfn76b6dmdfll4.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
)
