import {
  ADD_FRIEND,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_ERROR,
  DELETE_FRIEND,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_ERROR,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_ERROR,
  GET_CONTACT,
  GET_CONTACT_SUCCESS,
  GET_CONTACT_ERROR,
  UPDATE_CONTACT,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  LOAD_CONTACT,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_ERROR,
  NULL_CURRENTCONTACT,
  ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
} from './constants';

// GET CONTACTS
export function loadContacts() {
  return {
    type: LOAD_CONTACT,
  };
}
export function contactLoaded(contacts) {
  return {
    type: LOAD_CONTACT_SUCCESS,
    contacts,
  };
}
export function contactLoadingError(error) {
  return {
    type: LOAD_CONTACT_ERROR,
    error,
  };
}

// DELETE CONTACT
export function deleteContact(contactId) {
  return {
    type: DELETE_CONTACT,
    contactId,
  };
}
export function deleteContactSuccess(contacts) {
  return {
    type: DELETE_CONTACT_SUCCESS,
    contacts,
  };
}
export function deleteContactError(error) {
  return {
    type: DELETE_CONTACT_ERROR,
    error,
  };
}

// DELETE FRIEND
export function deleteFriend(friendId, contact) {
  return {
    type: DELETE_FRIEND,
    friendId,
    contact,
  };
}
export function deleteFriendSuccess(contact, contacts) {
  return {
    type: DELETE_FRIEND_SUCCESS,
    contact,
    contacts,
  };
}
export function deleteFriendError(error) {
  return {
    type: DELETE_FRIEND_ERROR,
    error,
  };
}

// GET SPECIFIC CONTACT
export function getContact(contactId) {
  return {
    type: GET_CONTACT,
    contactId,
  };
}
export function getContactSuccess(contact) {
  return {
    type: GET_CONTACT_SUCCESS,
    contact,
  };
}
export function getContactError(error) {
  return {
    type: GET_CONTACT_ERROR,
    error,
  };
}

// UPDATE CONTACT
export function updateContact(contact) {
  return {
    type: UPDATE_CONTACT,
    contact,
  };
}
export function updateContactSuccess(contacts) {
  return {
    type: UPDATE_CONTACT_SUCCESS,
    contacts,
  };
}
export function updateContactError(error) {
  return {
    type: UPDATE_CONTACT_ERROR,
    error,
  };
}

// ADD CONTACT
export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact,
  };
}
export function addContactSuccess(contacts) {
  return {
    type: ADD_CONTACT_SUCCESS,
    contacts,
  };
}
export function addContactError(error) {
  return {
    type: ADD_CONTACT_ERROR,
    error,
  };
}

// ADD FRIEND
export function addFriend(friend, contact) {
  return {
    type: ADD_FRIEND,
    friend,
    contact,
  };
}
export function addFriendSuccess(contact, contacts) {
  return {
    type: ADD_FRIEND_SUCCESS,
    contact,
    contacts,
  };
}
export function addFriendError(error) {
  return {
    type: ADD_FRIEND_ERROR,
    error,
  };
}

// Reset variable
export function nullifyCurrentcontact() {
  return {
    type: NULL_CURRENTCONTACT,
  };
}
