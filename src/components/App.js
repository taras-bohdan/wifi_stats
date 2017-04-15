import React, {Component} from 'react';
import List from './List';
import Statistics from './statistics';

class App extends Component {
	render() {
		return (
			<div>
				<List users={this.props.users}/>
				<Statistics users={this.props.users}/>
			</div>
		)
	}
}

export default App;