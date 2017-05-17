import React, {Component} from 'react';

class UserStatistics extends Component {
	render() {
		let users = this.props.users;

		let usersCount = users.length;

		let age = {
			'<18': users.filter((user) => user.age === "<18" || user.age < 18).length,
			'18-21': users.filter((user) => user.age === "18-21" || (user.age >= 18 && user.age < 21)).length,
			'21+': users.filter((user) => user.age === "21+" || user.age >= 21).length,
			'na': users.filter((user) => user.age === undefined).length
		};

		function getPercent(value) {
			if(usersCount && value){
				return Math.round(value / usersCount * 100);
			}
			return 0;
		}

		return <div className="statistics">
			<div>Total users: {usersCount}</div>
			<div>Age:
				<div>less than 18: {age['<18']} user(s) - {getPercent(age['<18'])}%</div>
				<div>18-21: {age['18-21']} user(s) - {getPercent(age['18-21'])}%</div>
				<div>21+: {age['21+']} user(s) - {getPercent(age['21+'])}%</div>
				<div>age not specified: {age['na']} user(s) - {getPercent(age['na'])}%</div>
			</div>
		</div>
	}
}

export default UserStatistics;