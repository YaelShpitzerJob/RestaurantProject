import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import {
  kitchenDetailsLoaded,
  kitchenDetailsLoadingError,
  ordersLoaded,
  ordersLoadingError,
  addOrderSuccess,
  addOrderError,
  getOrderSuccess,
  getOrderError
} from './actions';

import {  
  LOAD_KITCHEN_DETAILS,
  LOAD_ORDERS,
  ADD_ORDER,
  GET_ORDER
} from './constants';

const baseUrl = '/api';

export function* getkitchenDetails() {
  const requestURL = `${baseUrl}/kitchendetails`;
  try {
    const kitchenDetails = yield call(request, requestURL);
    yield put(kitchenDetailsLoaded(kitchenDetails.dishesMenu,kitchenDetails.chefsNumber));
  } catch (err) {
    yield put(kitchenDetailsLoadingError(err));
  }
}

export function* getOrders() {
  const requestURL = `${baseUrl}/orders`;
  try {
    const orders = yield call(request, requestURL);
    yield put(ordersLoaded(orders));
  } catch (err) {
    yield put(ordersLoadingError(err));
  }
}

export function* addOrder({order}) {
  const requestURL = `${baseUrl}/addorder`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  };
  try {
    const orders = yield call(request, requestURL, options);
    const order = orders.at(-1);
    yield put(addOrderSuccess(order,orders));
  } catch (err) {
    yield put(addOrderError(err));
  }
}

export function* getOrder(action) {
  const requestURL = `${baseUrl}/getorder/${action.orderId}`;
  try {
    const order = yield call(request, requestURL);
    yield put(getOrderSuccess(order));
  } catch (err) {
    yield put(getOrderError(err));
  }
}

export default function* contactListSaga() {
  yield takeLatest(LOAD_KITCHEN_DETAILS, getkitchenDetails);
  yield takeLatest(LOAD_ORDERS, getOrders);
  yield takeLatest(ADD_ORDER, addOrder);
  yield takeLatest(GET_ORDER, getOrder);
}