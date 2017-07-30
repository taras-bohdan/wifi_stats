import React, {Component} from 'react';
import DateSelectContainer from './DateSelect/DateSelect.container';
import TabsContainer from './Tabs/Tabs.container';

class Navbar extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(<nav className="navigation-bar">
			<TabsContainer/>
			<DateSelectContainer/>
		</nav>);
	}
}

export default Navbar;