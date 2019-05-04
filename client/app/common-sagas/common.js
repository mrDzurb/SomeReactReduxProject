import { call, put } from 'redux-saga/effects';
import { actions } from 'commonReducers/common';
import { fetchCommonData } from './api';

export function* getData(obj) {
  try {
    const data = yield call(fetchCommonData, obj.pageKey);
    if (data.status === 'ok') {
      yield put(actions.getDataSuccess({ ...data.data }));
    } else {
      yield put(actions.getDataFail(data.msg));
    }
  } catch (e) {
    yield put(actions.getDataFail(e.message));
  }
}
