import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import { teal, blueGrey } from 'material-ui/colors';
import reducer from './redux/reducers/index';
import App from './components/App';
import './shared/stylesheets/base.scss';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(reducer, preloadedState);

const StatisticsApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>
);

// Create a theme instance.
const theme = createMuiTheme({
  palette: createPalette({
    primary: teal,
    accent: blueGrey,
    type: 'light',
  }),
});

/* show theme properties only on dev environment */
if (process.env.NODE_ENV !== 'production') {
  console.log(theme);
}

ReactDOM.render(<StatisticsApp />, document.getElementById('app'));
