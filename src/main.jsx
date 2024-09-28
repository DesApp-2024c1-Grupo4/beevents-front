import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material';

import { customMuiTheme } from './config/customMuiTheme';

import { App } from './App';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={customMuiTheme}>
    <App />
  </ThemeProvider>
)
