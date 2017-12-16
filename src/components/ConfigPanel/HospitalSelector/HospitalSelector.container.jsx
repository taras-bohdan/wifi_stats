import { connect } from 'react-redux';
import HospitalSelector from './HospitalSelector';
import { toggleHospital, showAllHospitals } from '../../../redux/actions/actionCreators';

const mapStateToProps = state => Object.assign({}, state.appState);

const mapDispatchToProps = dispatch => (
  {
    onFilterByHospital: (hospitals) => {
      dispatch(toggleHospital(hospitals));
    },
    onShowAllHospitals: (showAll) => {
      dispatch(showAllHospitals(showAll));
    },
  }
);

const HospitalSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(HospitalSelector);

export default HospitalSelectorContainer;
