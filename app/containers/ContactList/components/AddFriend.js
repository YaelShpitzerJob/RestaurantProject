import React, { useState, memo } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { addFriend } from '../actions';
import Modal from './Modal';
import { messages } from '../messages';
import { makeSelectCurrentContact } from '../selectors';

function Friends({ onAddFriend, currentContact, ...props }) {
  const [ShowModal, setShowModal] = useState(true);
  const [newFriend, setNewFriend] = useState({ firstname: '', lastname: '' });

  // enter here after every letter and update new contact
  function handleChange(event, name) {
    setNewFriend({ ...newFriend, [name]: event.target.value });
  }

  // save a new contact in contacts-list
  function handleSave() {
    onAddFriend({ ...newFriend }, currentContact);
    setShowModal(false);
    props.close();
  }

  // Return add new friend form
  function body() {
    return (
      <div className="form">
        <label htmlFor="firstname">Firstname</label>
        <div>
          <input
            required
            type="text"
            value={newFriend.firstname}
            onChange={event => {
              handleChange(event, messages.firstname);
            }}
          />
        </div>
        <label htmlFor="lastname">Lastname</label>
        <div>
          <input
            required
            type="text"
            value={newFriend.lastname}
            onChange={event => handleChange(event, messages.lastname)}
          />
        </div>
        <Button variant="outline-success" onClick={handleSave}>
          Save
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Modal
        body={body()}
        head="New friend"
        show={ShowModal}
        onHide={() => {
          setShowModal(false);
          props.close();
        }}
      />
    </div>
  );
}

Friends.propTypes = {
  onAddFriend: PropTypes.func,
  close: PropTypes.func,
  currentContact: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch) {
  return {
    onAddFriend: (friend, contact) => dispatch(addFriend(friend, contact)),
  };
}

const mapStateToProps = createStructuredSelector({
  currentContact: makeSelectCurrentContact(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Friends);
