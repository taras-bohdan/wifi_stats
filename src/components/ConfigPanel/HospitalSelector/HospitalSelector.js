import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './HospitalSelector.styles.scss';

class HospitalSelector extends Component {
	constructor(props) {
		super(props);
		this.filterByHospital = props.onFilterByHospital;
	}

	render() {
		return (
			<div className={styles.tabs}>
				<div className={styles.tabSelector} onClick={() => this.filterByHospital(0)}>See All</div>
				<div className={styles.tabSelector} onClick={() => this.filterByHospital(1)}>Hospital 1</div>
				<div className={styles.tabSelector} onClick={() => this.filterByHospital(2)}>Hospital 2</div>
				<div className={styles.tabSelector} onClick={() => this.filterByHospital(3)}>Hospital 3</div>
			</div>
		);
	}

}

HospitalSelector.propTypes = {
	onFilterByHospital: PropTypes.func.isRequired
};

export default HospitalSelector;