import {
  UPDATE_CONTACT,ADD_CONTACT,
  GET_CONTACT,
  
  DELETE_CONTACT,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_ERROR,
  LOAD_CONTACT
} from './constants';

//GET CONTACT LIST

/**
 * Load the contacts, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_Contact
 */
export function loadContacts() {
  return {
    type: LOAD_CONTACT,
  };
}

/**
 * Dispatched when the contacts are loaded by the request saga
 *
 * @param  {array} contacts The contactsitory data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_Contact_SUCCESS passing the contacts
 */
export function contactsLoaded(contacts, username) {
  return {
    type: LOAD_CONTACT_SUCCESS,
    contacts,
    username,
  };
}

/**
 * Dispatched when loading the contacts fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_Contact_ERROR passing the error
 */
export function contactLoadingError(error) {
  return {
    type: LOAD_CONTACT_ERROR,
    error,
  };
}



//UPDATE CONTACT
export function updateContact(contact) {
  return {
    type: UPDATE_CONTACT,
    contact
  };
}


//ADD CONTACT
export function addContact(contact) {

  return {
    type: ADD_CONTACT,
    contact
  };
}