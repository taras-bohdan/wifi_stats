import React, {Component} from 'react';
import styles from './MenuToggle.styles.scss';

export default class MenuToggle extends Component {
	constructor(props){
		super(props);

		this.toggleMenu = props.onMenuToggle;
	}

	render(){
		return(
			<div className={styles.container} onClick={this.toggleMenu}>
				<div className={styles.bar1}/>
				<div className={styles.bar2}/>
				<div className={styles.bar3}/>
			</div>
		)
	}
}