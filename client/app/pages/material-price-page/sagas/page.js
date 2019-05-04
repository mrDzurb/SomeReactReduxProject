import { select, call, put } from 'redux-saga/effects';

import { fetchPageData } from './api';
import { actions } from '../reducers/page';

/**
 * @desc validate state data
 */
const validateData = (data) => {
  const result = [];

  if (!data.search_material_key) {
    result.push({
      key: 'search_material_key',
      header: 'Ошибка!',
      msg: 'Введите код материала.'
    });
  } else if (data.search_material_key.split('.').length < 2) {
    result.push({
      key: 'search_material_key',
      header: 'Ошибка!',
      msg: 'Неверный формат кода материала.'
    });
  }
  if (
    data.search_order_number &&
    data.search_order_number.split('.').length !== 3
  ) {
    result.push({
      key: 'search_order_number',
      header: 'Ошибка!',
      msg: 'Неверный формат номера заказа.'
    });
  }
  return result;
};

/**
 * Get data from server
 */
export function* getData() {
  try {
    // get current page state from store
    const data = yield select((state) => state.page);
    data.errors = validateData(data);
    if (data.errors.length > 0) {
      data.loading = false;
      yield put(actions.setData(data));
    } else {
      const serverResult = yield call(
        fetchPageData,
        JSON.stringify({
          search_material_key: data.search_material_key,
          search_order_number: data.search_order_number
        })
      );

      if (serverResult.status === 'ok') {
        yield put(actions.getDataSuccess({ ...serverResult.data }));
      } else {
        yield put(
          actions.getDataFail([
            { key: 'get_data', header: 'Ошибка! ', msg: serverResult.msg }
          ])
        );
      }
    }
  } catch (err) {
    yield put(
      actions.getDataFail([
        { key: 'get_data', header: 'Ошибка сервера! ', msg: err.msg }
      ])
    );
  }
}
