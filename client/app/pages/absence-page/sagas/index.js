import { takeLatest, all } from 'redux-saga/effects';

import * as commonSagas from 'commonSagas/common';
import { types as commonTypes } from 'commonReducers/common';
import { actions as pageActions } from '../reducers/page';
import { checkForReadyPreviewMode, commonDataUpdated, saveData } from './page';

export default function* rootSaga() {
  yield all([
    takeLatest(commonTypes.GET_DATA_REQUEST, commonSagas.getData),
    takeLatest(commonTypes.GET_DATA_SUCCESS, commonDataUpdated),
    takeLatest(pageActions.saveDataRequest.toString(), saveData),
    takeLatest(pageActions.checkData.toString(), checkForReadyPreviewMode)
  ]);
}
