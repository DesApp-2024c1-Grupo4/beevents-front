import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material';

import { customMuiTheme } from './config/customMuiTheme';

import { App } from './App';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={customMuiTheme}>
      <App />
    </ThemeProvider>
  </Provider>
)
