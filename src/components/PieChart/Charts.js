import React, {Component} from 'react';
import Piechart from './PieChart';

class Charts extends Component {
	constructor(props) {
		super(props);
		// this.data = this.props.data;
		const users = props.data.length ? props.data : [];

		this.ageStats = [
			{
				label: '<18',
				value: users.filter((user) => user.age === "<18" || user.age < 18).length
			},
			{
				label: '25-50',
				value: users.filter((user) => user.age === "25-50" || (user.age > 25 && user.age < 50)).length
			},
			{
				label: '>50',
				value: users.filter((user) => user.age === ">50" || user.age > 50).length
			},
			{
				label: 'na',
				value: users.filter((user) => user.age === undefined).length
			}
		];
	}

	componentWillReceiveProps(newProps) {
		const users = newProps.data;
		this.ageStats = [
			{
				label: '<18',
				value: users.filter((user) => user.age === "<18" || user.age < 18).length
			},
			{
				label: '25-50',
				value: users.filter((user) => user.age === "25-50" || (user.age > 25 && user.age < 50)).length
			},
			{
				label: '>50',
				value: users.filter((user) => user.age === ">50" || user.age > 50).length
			},
			{
				label: 'na',
				value: users.filter((user) => user.age === undefined).length
			}
		];
	}

	render() {
		let
			innRadius = 50,
			outRadius = 100,
			x = 100,
			y = 100;
		return (
			<div>
				<Piechart data={this.ageStats}
						  innerRadius={innRadius}
						  outerRadius={outRadius}
						  x={x}
						  y={y}/>
			</div>
		)
	}
}

export default Charts;