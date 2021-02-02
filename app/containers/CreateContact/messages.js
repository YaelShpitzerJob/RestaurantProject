/*
 * CreateContact Messages
 *
 * This contains all the text for the CreateContact container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CreateContact';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the CreateContact container!',
  },
});

export const messages = {
  toastcontact: 'Contact',
  toastsaved: 'saved',
  Add: 'Add',
  Edit: 'Edit',
  Firstname: 'Firstname',
  firstname: 'firstname',
  lastname: 'lastname',
  Lastname: 'Lastname',
  Phone: 'Phone',
  phone: 'phone',
  Address: 'Address',
  address: 'address',
  save: 'save',
  saving: 'saving...',
  url: '/update-contact',
  returncontactlist: 'return contact list',
};
