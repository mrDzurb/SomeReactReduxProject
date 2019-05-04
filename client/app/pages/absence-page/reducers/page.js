import { createActions, handleActions } from 'redux-actions';

export const initialState = {
  reason: '',
  is_full_day: 'yes', // yes or no
  date_from: '', // start absence date
  date_to: '', // finish absence date
  notify_moscow: false,
  notify_kaluga: false,
  notify_penza: false,
  comment: '', // user comment
  mode: 'edit', // form view mode: edit/view/result
  saving: false,
  errors: [], // list data errors
  reasons: [
    { key: 'personal', name: 'По личным делам' },
    { key: 'work', name: 'По рабочим делам' },
    { key: 'holiday', name: 'Отпуск' },
    { key: 'business_trip', name: 'Командировка' }
  ]
};

const {
  page: {
    saveDataRequest,
    saveDataSuccess,
    saveDataFail,
    checkData,
    setViewMode,
    setEditMode,
    setResultMode,
    setData
  }
} = createActions({
  PAGE: {
    SAVE_DATA_REQUEST: null,
    SAVE_DATA_SUCCESS: null,
    SAVE_DATA_FAIL: null,
    CHECK_DATA: null,
    SET_VIEW_MODE: null,
    SET_EDIT_MODE: null,
    SET_RESULT_MODE: null,
    SET_DATA: null
  }
});

export default handleActions(
  {
    [setViewMode.toString()]: (state) => ({ ...state, mode: 'view' }),
    [setEditMode.toString()]: (state) => ({ ...state, mode: 'edit' }),
    [setResultMode.toString()]: (state) => ({ ...state, mode: 'result' }),
    [saveDataRequest.toString()]: (state) => ({ ...state, saving: true }),
    [saveDataSuccess.toString()]: (state) => ({ ...state, saving: false }),
    [saveDataFail.toString()]: (state, action) => ({
      ...state,
      saving: 'false',
      errors: action.payload
    }),
    [setData.toString()]: (state, action) => ({ ...state, ...action.payload })
  },
  initialState
);

export const actions = {
  saveDataRequest,
  saveDataSuccess,
  saveDataFail,
  checkData,
  setViewMode,
  setEditMode,
  setResultMode,
  setData
};
