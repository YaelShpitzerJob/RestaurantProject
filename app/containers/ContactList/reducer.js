/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  UPDATE_CONTACT,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  ADD_CONTACT,
  LOAD_CONTACT,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_ERROR,
  GET_CONTACT,
  GET_CONTACT_SUCCESS,
  GET_CONTACT_ERROR,
  DELETE_FRIEND,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_ERROR,
  ADD_FRIEND,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_ERROR,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  NULL_CURRENTCONTACT,
  DELETE_CONTACT,
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_SUCCESS,
} from './constants';
export const initialState = {
  loading: false,
  error: false,
  currentContact: false,
  contacts: false,
};

const contactListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CONTACT:
        draft.loading = true;
        draft.error = false;
        draft.contacts = false;
        break;
      case GET_CONTACT:
        draft.loading = true;
        draft.error = false;
        draft.currentContact = false;
        break;
      case DELETE_FRIEND:
      case ADD_FRIEND:
      case UPDATE_CONTACT:
      case ADD_CONTACT:
      case DELETE_CONTACT:
        draft.loading = true;
        draft.error = false;
        break;
      case DELETE_FRIEND_ERROR:
      case ADD_FRIEND_ERROR:
      case UPDATE_CONTACT_ERROR:
      case ADD_CONTACT_ERROR:
      case DELETE_CONTACT_ERROR:
      case GET_CONTACT_ERROR:
      case LOAD_CONTACT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case DELETE_FRIEND_SUCCESS:
      case ADD_FRIEND_SUCCESS:
        draft.currentContact = action.contact;
        draft.contacts = action.contacts;
        draft.loading = false;
        break;
      case ADD_CONTACT_SUCCESS:
      case LOAD_CONTACT_SUCCESS:
      case DELETE_CONTACT_SUCCESS:
      case UPDATE_CONTACT_SUCCESS:
        draft.contacts = action.contacts;
        draft.loading = false;
        draft.currentContact = false;
        break;
      case GET_CONTACT_SUCCESS:
        draft.currentContact = action.contact;
        break;
      case NULL_CURRENTCONTACT:
        draft.currentContact = false;
        break;
      default:
        break;
    }
  });

export default contactListReducer;
