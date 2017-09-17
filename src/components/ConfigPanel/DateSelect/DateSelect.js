import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styles from './DateSelect.styles.scss';

if (process.env.BROWSER) {
	require('react-datepicker/dist/react-datepicker.css');
}

class DateSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: props.dateRange.start,
			endDate: props.dateRange.end
		};
		this.handleChangeStart = props.onDateChangeStart;
		this.handleChangeEnd = props.onDateChangeEnd;
	}

	componentWillReceiveProps(nextProps){
		this.setState({startDate: nextProps.dateRange.start, endDate: nextProps.dateRange.end});
	}

	render() {
		return (
			<div className={styles.dateRangeSelect}>
				<span className={styles.datePickerLabel}>Start Date:</span>
				<DatePicker
					selected={this.state.startDate}
					selectsStart
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					onChange={this.handleChangeStart}
				/>
				<span className={styles.datePickerLabel}>End Date:</span>
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
	dateRange: PropTypes.object.isRequired,
	onDateChangeStart: PropTypes.func.isRequired,
	onDateChangeEnd: PropTypes.func.isRequired,
};

export default DateSelect;