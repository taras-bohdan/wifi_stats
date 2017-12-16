import { connect } from 'react-redux';
import moment from 'moment';
import DateSelect from './DateSelect';
import { dateChangeStart, dateChangeEnd } from '../../../redux/actions/actionCreators';

const mapStateToProps = (state) => {
  const dateRange = state.stats.dateRange ? {
    start: moment(state.stats.dateRange.start),
    end: moment(state.stats.dateRange.end),
  } : {
    start: moment().startOf('month'),
    end: moment().endOf('month'),
  };

  const newState = Object.assign({}, state.stats);
  newState.dateRange = dateRange;

  return newState;
};

const mapDispatchToProps = dispatch => ({
  onDateChangeStart: (event) => {
    const date = moment(event.target.value);
    dispatch(dateChangeStart(date));
  },
  onDateChangeEnd: (event) => {
    const date = moment(event.target.value);
    dispatch(dateChangeEnd(date));
  },
});

const DateSelectContainer = connect(mapStateToProps, mapDispatchToProps)(DateSelect);

export default DateSelectContainer;
