import React, {Component} from 'react';
import DateSelectContainer from './DateSelect/DateSelect.container';
import HospitalSelectorContainer from './HospitalSelector/HospitalSelector.container';
import styles from './ConfigPanel.scss';

class ConfigPanel extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="config-panel">
			<div className={styles.menuToggle}>
				<span/>
				<span/>
				<span/>
			</div>
			<div>
				<HospitalSelectorContainer/>
				<DateSelectContainer/>
			</div>
		</div>);
	}
}

export default ConfigPanel;