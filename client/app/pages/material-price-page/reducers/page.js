import { createActions, handleActions } from 'redux-actions';

export const initialState = {
  _id: '',
  full_code: '',
  name: '',
  plan: {
    date: '',
    good_code_1c: '',
    price: 0,
    account: '',
    coef_si_div_iu: 0
  },
  fact: {
    date: '',
    good_code_1c: '',
    price: 0,
    account: '',
    coef_si_div_iu: 0
  },
  loading: false,
  search_order_number: '',
  search_material_key: '',
  errors: [] // list data errors
};

const {
  page: { getDataRequest, getDataSuccess, getDataFail, setData }
} = createActions({
  PAGE: {
    GET_DATA_REQUEST: null,
    GET_DATA_SUCCESS: null,
    GET_DATA_FAIL: null,
    SET_DATA: null
  }
});

export const actions = { getDataRequest, getDataSuccess, getDataFail, setData };

export default handleActions(
  {
    [getDataRequest.toString()]: (state) => ({ ...state, loading: true }),
    [getDataSuccess.toString()]: (state, action) => ({
      ...state,
      loading: false,
      ...action.payload
    }),
    [getDataFail.toString()]: (state, action) => ({
      ...state,
      loading: false,
      errors: action.payload
    }),
    [setData.toString()]: (state, action) => ({ ...state, ...action.payload })
  },
  initialState
);
