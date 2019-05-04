import { connect } from 'react-redux';
import MainForm from '../components/main-form';
import { actions as pageActions } from '../reducers/page';

const mapStateToProps = (state) => ({
  weekends: state.common.weekends,
  ...state.page
});

const mapDispatchToProps = {
  setData: pageActions.setData,
  saveData: pageActions.saveDataRequest,
  previewData: pageActions.checkData
};

// connect to redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
