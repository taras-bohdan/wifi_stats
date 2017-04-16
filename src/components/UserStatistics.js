import React, {Component} from 'react';

class UserStatistics extends Component {
	render() {
		let users = this.props.users;

		let usersCount = users.length;

		let age = {
			'<18': users.filter((user) => user.age === "<18" || user.age < 18).length,
			'25-50': users.filter((user) => user.age === "25-50" || (user.age > 25 && user.age < 50)).length,
			'>50': users.filter((user) => user.age === ">50" || user.age > 50).length,
			'na': users.filter((user) => user.age === undefined).length
		};

		function getPercent(value) {
			return Math.round(value / usersCount * 100);
		}

		return <div className="statistics">
			<div>Total users: {usersCount}</div>
			<div>Age:
				<div>less than 18: {age['<18']} user(s) - {getPercent(age['<18'])}%</div>
				<div>25-50: {age['25-50']} user(s) - {getPercent(age['25-50'])}%</div>
				<div>>50: {age['>50']} user(s) - {getPercent(age['>50'])}%</div>
				<div>age not specified: {age['na']} user(s) - {getPercent(age['na'])}%</div>
			</div>
		</div>
	}
}

export default UserStatistics;