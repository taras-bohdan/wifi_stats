import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
	constructor(props) {
		super(props);
		this.filterByHospital = props.onFilterByHospital;
	}

	render() {
		return (
			<div className="tabs">
				<a className="tab-selector" onClick={() => this.filterByHospital(0)}>See All</a>
				<a className="tab-selector" onClick={() => this.filterByHospital(1)}>Hospital 1</a>
				<a className="tab-selector" onClick={() => this.filterByHospital(2)}>Hospital 2</a>
				<a className="tab-selector" onClick={() => this.filterByHospital(3)}>Hospital 3</a>
			</div>
		);
	}

}

Tabs.propTypes = {
	onFilterByHospital: PropTypes.func.isRequired
};

export default Tabs;