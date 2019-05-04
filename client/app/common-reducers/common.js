import { createActions, handleActions } from 'redux-actions';

const initialState = {
  user: { fio: '' }, // current user
  menu: [], //  header menu
  currentPage: {}, // current user page
  users: [], // list of all users
  fetching: false, // current state
  msg: '',
  weekends: [] // all weekends
};

const {
  common: { getDataRequest, getDataSuccess, getDataFail }
} = createActions({
  COMMON: {
    GET_DATA_REQUEST: null,
    GET_DATA_SUCCESS: null,
    GET_DATA_FAIL: null
  }
});

export const actions = { getDataRequest, getDataSuccess, getDataFail };

export default handleActions(
  {
    [getDataRequest.toString()]: (state) => ({ ...state, fetching: true }),
    [getDataSuccess.toString()]: (state, action) => ({
      ...state,
      fetching: false,
      ...action.payload
    }),
    [getDataFail.toString()]: (state, action) => ({
      ...state,
      fetching: false,
      msg: action.payload
    })
  },
  initialState
);
