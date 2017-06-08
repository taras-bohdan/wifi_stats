import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class DateSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: moment(),
			endDate: moment()
		};
		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChangeEnd = this.handleChangeEnd.bind(this);
	}

	handleChangeStart(date) {
		console.log(date);
		this.setState({
			startDate: date
		});
	}

	handleChangeEnd(date) {
		console.log(date);
		this.setState({
			endDate: date
		});
	}

	render() {
		return (
			<div>
				<DatePicker
					selected={this.state.startDate}
					selectsStart
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					onChange={this.handleChangeStart}
				/>

				<DatePicker
					selected={this.state.endDate}
					selectsEnd
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					onChange={this.handleChangeEnd}
				/>
			</div>
		);
	}
}

export default DateSelect;