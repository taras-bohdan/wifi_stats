import React, {Component} from 'react';
import DateSelectContainer from './DateSelect/DateSelect.container';
import HospitalSelectorContainer from './HospitalSelector/HospitalSelector.container';
import styles from './ConfigPanel.styles.scss';

export default class ConfigPanel extends Component {
	constructor(props) {
		super(props);
		this.menuToggled = props.menuToggled;
	}

	componentWillReceiveProps(newProps){
		this.menuToggled = newProps.menuToggled;
	}

	render() {
		return (
			<div className={`${styles.configPanel} ${this.menuToggled ? styles.active : ''}`}>
				<div className={styles.innerContainer}>
					<HospitalSelectorContainer/>
					<DateSelectContainer/>
				</div>
			</div>
		);
	}
}