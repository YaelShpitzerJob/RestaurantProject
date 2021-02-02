import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import {
  contactLoaded,
  contactLoadingError,
  getContactSuccess,
  getContactError,
  deleteContactSuccess,
  deleteContactError,
  addContactSuccess,
  addContactError,
  updateContactSuccess,
  updateContactError,
  addFriendSuccess,
  addFriendError,
  deleteFriendSuccess,
  deleteFriendError,
} from './actions';

import {
  ADD_CONTACT,
  LOAD_CONTACT,
  GET_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  ADD_FRIEND,
  DELETE_FRIEND,
} from './constants';

const baseUrl = '/api';
export function* getList() {
  const requestURL = `${baseUrl}/list`;
  try {
    const list = yield call(request, requestURL);
    yield put(contactLoaded(list));
  } catch (err) {
    yield put(contactLoadingError(err));
  }
}

export function* getContact(action) {
  const requestURL = `${baseUrl}/get/${action.contactId}`;

  try {
    const list = yield call(request, requestURL);
    yield put(getContactSuccess(list));
  } catch (err) {
    yield put(getContactError(err));
  }
}

export function* deleteContact(action) {
  const requestURL = `${baseUrl}/delete/${action.contactId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
  };
  try {
    const list = yield call(request, requestURL, options);
    yield put(deleteContactSuccess(list));
  } catch (err) {
    yield put(deleteContactError(err));
  }
}

export function* addContact(action) {
  const requestURL = `${baseUrl}/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.contact),
  };
  try {
    const list = yield call(request, requestURL, options);
    yield put(addContactSuccess(list));
  } catch (err) {
    yield put(addContactError(err));
  }
}

export function* update(action) {
  const requestURL = `${baseUrl}/update`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.contact),
  };
  try {
    const list = yield call(request, requestURL, options);
    yield put(updateContactSuccess(list));
  } catch (err) {
    yield put(updateContactError(err));
  }
}

export function* addFriend(action) {
  const requestURL = `${baseUrl}/addchilditem/${action.contact.id}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.friend),
  };
  try {
    const list = yield call(request, requestURL, options);
    const newitem = list.find(item => item.id === action.contact.id);
    yield put(addFriendSuccess(newitem, list));
  } catch (err) {
    yield put(addFriendError(err));
  }
}

export function* deleteFriend(action) {
  const requestURL = `${baseUrl}/deletechilditem/${action.contact.id}/${
    action.friendId
  }`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const list = yield call(request, requestURL, options);
    const newitem = list.find(item => item.id === action.contact.id);
    yield put(deleteFriendSuccess(newitem, list));
  } catch (err) {
    yield put(deleteFriendError(err));
  }
}

export default function* contactListSaga() {
  yield takeLatest(LOAD_CONTACT, getList);
  yield takeEvery(GET_CONTACT, getContact);
  yield takeEvery(DELETE_CONTACT, deleteContact);
  yield takeEvery(ADD_CONTACT, addContact);
  yield takeEvery(UPDATE_CONTACT, update);
  yield takeEvery(ADD_FRIEND, addFriend);
  yield takeEvery(DELETE_FRIEND, deleteFriend);
}
