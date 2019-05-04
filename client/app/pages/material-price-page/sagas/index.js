import { takeLatest, all } from 'redux-saga/effects';

import * as commonSagas from 'commonSagas/common';
import { actions as commonActions } from 'commonReducers/common';
import { actions as pageActions } from '../reducers/page';
import * as pageSagas from './page';

export default function* rootSaga() {
  yield all([
    takeLatest(commonActions.getDataRequest.toString(), commonSagas.getData),
    takeLatest(pageActions.getDataRequest.toString(), pageSagas.getData)
  ]);
}
