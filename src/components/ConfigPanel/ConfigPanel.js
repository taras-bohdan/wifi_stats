import React, {Component} from 'react';
import DateSelectContainer from './DateSelect/DateSelect.container';
import HospitalSelectorContainer from './HospitalSelector/HospitalSelector.container';
import styles from './ConfigPanel.styles.scss';
import Drawer from 'material-ui/Drawer';


class ConfigPanel extends Component {
	constructor(props) {
		super(props);
		this.menuToggled = props.menuToggled;
		this.toggleMenu = props.onMenuToggle;
	}

	componentWillReceiveProps(newProps){
		this.menuToggled = newProps.menuToggled;
	}

	render() {
		return (
			<Drawer open={this.menuToggled} onRequestClose={this.toggleMenu}>
				<div tabIndex={0} role="button" onClick={this.toggleMenu}>
					<div className={styles.configPanel}>
						<HospitalSelectorContainer/>
						<DateSelectContainer/>
					</div>
				</div>
			</Drawer>
		);
	}
}

export default ConfigPanel;