import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

const BasicExample = () => (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

ReactDOM.render(<BasicExample />, document.getElementById('app'));
