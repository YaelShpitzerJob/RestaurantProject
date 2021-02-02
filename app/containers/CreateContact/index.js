import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-bootstrap-icons';
import { messages } from './messages';
import ContactForm from './ContactForm';
import { UseTitleName } from '../UseTitleName/index';
import {
  updateContact,
  addContact,
  nullifyCurrentcontact,
} from '../ContactList/actions';
import { makeSelectCurrentContact } from '../ContactList/selectors';
import saga from './saga';
import './CreateCotact.scss';

export function CreateContact({
  onAddContact,
  currentContact,
  history,
  onUpdateContact,
  onNullifyCurrentcontact,
}) {
  useInjectSaga({ key: 'createContact', saga });
  const empty = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    friends: [],
  };
  const url = history.location.pathname;
  const isUrlUpdateContactPage = url === messages.url;
  const [addOrEditContact, setAddOrEditContact] = useState(
    isUrlUpdateContactPage ? currentContact : empty,
  );

  const addOrEditContactType = UseTitleName(url);
  const [saving, setSaving] = useState(false);

  // After each character is added we add to the new object-contact
  function handleChange(event, name) {
    setAddOrEditContact({ ...addOrEditContact, [name]: event.target.value });
  }

  // Clicking Save will add or update a new contact
  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    if (addOrEditContactType === messages.Add) onAddContact(addOrEditContact);
    else onUpdateContact(addOrEditContact);
    history.push('/contact-list');
    const contact = { ...addOrEditContact };
    const name = `${contact.firstname} ${contact.lastname}`;
    toast.success(`${messages.toastcontact} ${name} ${messages.toastsaved}`);
  }

  return (
    <div className="createcontact">
      <Helmet>
        <title>CreateContact</title>
        <meta name="description" content="Description of CreateContact" />
      </Helmet>
      <NavLink to="/contact-list" style={{ textDecoration: 'none' }}>
        <Button
          variant="success"
          className="contactlistbutton"
          onClick={() => onNullifyCurrentcontact()}
        >
          <ArrowLeft color="red" size={46} />
          {messages.returncontactlist}
        </Button>
      </NavLink>
      <ContactForm
        contactType={addOrEditContactType}
        contact={addOrEditContact}
        onChange={handleChange}
        saving={saving}
        onSave={handleSave}
      />
    </div>
  );
}

CreateContact.propTypes = {
  onAddContact: PropTypes.func,
  currentContact: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  history: PropTypes.object,
  onUpdateContact: PropTypes.func,
  onNullifyCurrentcontact: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentContact: makeSelectCurrentContact(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUpdateContact: contact => dispatch(updateContact(contact)),
    onAddContact: contact => dispatch(addContact(contact)),
    onNullifyCurrentcontact: () => dispatch(nullifyCurrentcontact()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateContact);
