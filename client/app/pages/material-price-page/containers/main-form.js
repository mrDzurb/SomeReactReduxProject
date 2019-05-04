import { connect } from 'react-redux';
import MainForm from '../components/main-form';
import { actions as pageActions } from '../reducers/page';

const mapSateToProps = (state) => ({
  ...state.page
});

const mapDispatchToProps = {
  setData: pageActions.setData,
  getData: pageActions.getDataRequest
};

// connect to redux
export default connect(
  mapSateToProps,
  mapDispatchToProps
)(MainForm);
