import React, {Component} from 'react';
import styles from './MenuToggle.styles.scss';

export default class MenuToggle extends Component {
	constructor(props){
		super(props);

		this.menuToggled = props.menuToggled;
		this.toggleMenu = props.onMenuToggle;
	}

	componentWillReceiveProps(newProps){
		this.menuToggled = newProps.menuToggled;
	}

	render(){
		return(
			<div className={`${styles.container} ${this.menuToggled ? styles.change : ''}`} onClick={this.toggleMenu}>
				<div className={styles.bar1}/>
				<div className={styles.bar2}/>
				<div className={styles.bar3}/>
			</div>
		)
	}
}