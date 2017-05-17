import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import {SERVER_HOST} from '../../config';
import StatsContainer from './containers/StatsContainer';

class Statistics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users || []
		};
	}

	render() {
		return (
			<StatsContainer/>
		)
	}
}

Statistics.requestInitialData = () => {
	return fetch(SERVER_HOST + '/users')
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
		});
};

export default Statistics;