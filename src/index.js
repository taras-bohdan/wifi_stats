import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(counterApp, preloadedState);

const BasicExample = () => (
	<BrowserRouter store={store}>
		<App />
	</BrowserRouter>
);

ReactDOM.render(<BasicExample />, document.getElementById('app'));
