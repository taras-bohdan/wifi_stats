import React, {Component} from 'react';
import List from './List';

class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, {this.props.name}!</h1>
				<List users={this.props.users}/>
			</div>
		)
	}
}

export default App;