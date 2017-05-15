import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import reducer from './redux/reducers/reducer'
import {Provider} from 'react-redux'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(reducer, preloadedState);

const BasicExample = () => (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(<BasicExample/>, document.getElementById('app'));
