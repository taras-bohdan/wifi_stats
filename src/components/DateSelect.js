import React, {Component, PropTypes} from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

if (process.env.BROWSER) {
	require('react-datepicker/dist/react-datepicker.css');
}

class DateSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: props.dates.start,
			endDate: props.dates.end
		};
		this.handleChangeStart = props.startDateChange;
		this.handleChangeEnd = props.endDateChange;
	}

	componentWillReceiveProps(nextProps){
		this.setState({startDate: nextProps.dates.start, endDate: nextProps.dates.end});
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

DateSelect.propTypes = {
	dates: PropTypes.object.required,
	startDateChange: PropTypes.func.required,
	endDateChange: PropTypes.func.required,
};

export default DateSelect;