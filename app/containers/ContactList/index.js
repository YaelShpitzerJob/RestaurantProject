import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button } from 'react-bootstrap';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentContact, makeSelectcontacts } from './selectors';
import { loadContacts, getContact, deleteContact } from './actions';
import { messages } from './messages';
import Friends from './components/Friends';
import './ContactList.scss';
export function ContactList({
  onloadContacts,
  contacts,
  currentContact,
  onSelectContact,
  onDeleteContact,
  history,
}) {
  useInjectReducer({ key: 'contactList', reducer });
  useInjectSaga({ key: 'contactList', saga });
  const [isEdit, setIsEdit] = useState(false);

  // Initialize a contacts-list
  useEffect(() => {
    if (!contacts) onloadContacts();
    if (isEdit && currentContact) history.push('/update-contact');
  });

  // Data initialization
  function insertData() {
    let newcontact;
    const data = [];
    contacts.forEach(contact => {
      newcontact = {};
      newcontact.id = contact.id;
      newcontact.firstname = contact.firstname;
      newcontact.lastname = contact.lastname;
      newcontact.phone = contact.phone;
      newcontact.address = contact.address;
      data.push(newcontact);
    });
    return data;
  }

  // Columns initialization
  function insertColumns() {
    return [
      {
        show: false,
        Header: messages.Id,
        accessor: messages.id,
      },
      {
        Header: messages.Firstname,
        accessor: messages.firstname,
        className: 'singal-colum s',
        headerClassName: 'header-style s',
      },
      {
        Header: messages.Lastname,
        accessor: messages.lastname,
        className: 'singal-colum s',
        headerClassName: 'header-style s',
      },
      {
        Header: messages.Phone,
        accessor: messages.phone,
        className: 'singal-colum m',
        headerClassName: 'header-style m',
      },
      {
        Header: messages.Address,
        accessor: messages.address,
        className: 'singal-colum l',
        headerClassName: 'header-style l',
      },
      {
        headerClassName: 'header-style',
        className: 'singal-colum',
        Cell: row => (
          <div>
            <Button
              variant="outline-success"
              onClick={() => {
                rowSelected(row.row);
                setIsEdit(true);
              }}
            >
              {messages.editcontact}
            </Button>{' '}
            <Button
              variant="outline-danger"
              onClick={() => onDeleteContact(row.row.id)}
            >
              {messages.deletecontact}
            </Button>{' '}
            <Button
              variant="outline-secondary"
              onClick={() => rowSelected(row.row)}
            >
              {messages.viewfriends}
            </Button>
          </div>
        ),
      },
    ];
  }

  // Initialize a contact in global state
  function rowSelected(contact) {
    const { id = '' } = currentContact;
    if (contact.id !== id) onSelectContact(contact.id);
  }

  return (
    <div className="contactlist">
      <Helmet>
        <title>ContactList</title>
        <meta name="description" content="Description of ContactList" />
      </Helmet>
      <NavLink to="/create-contact" style={{ textDecoration: 'none' }}>
        <Button variant="success" className="buttoncreatecontact">
          {messages.addnewcontact}
        </Button>
      </NavLink>
      <div>{currentContact && !isEdit && <Friends />}</div>
      {contacts && (
        <ReactTable
          defaultPageSize={10}
          data={insertData()}
          columns={insertColumns()}
        />
      )}
    </div>
  );
}

ContactList.propTypes = {
  currentContact: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  contacts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSelectContact: PropTypes.func,
  onDeleteContact: PropTypes.func,
  onloadContacts: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentContact: makeSelectCurrentContact(),
  contacts: makeSelectcontacts(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectContact: contactId => dispatch(getContact(contactId)),
    onDeleteContact: contactId => dispatch(deleteContact(contactId)),
    onloadContacts: () => dispatch(loadContacts()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContactList);
