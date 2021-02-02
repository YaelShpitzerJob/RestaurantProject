import React, { memo, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { makeSelectCurrentContact } from '../selectors';
import { deleteFriend } from '../actions';
import { messages } from '../messages';
import Modal from './Modal';
import AddFriend from './AddFriend';

export function Friends({ onDeleteFriend, currentContact }) {
  const [showModal, setShowModal] = useState(true);
  const [addFriends, setAddFriends] = useState(false);

  // Returns a list of friends to each contact
  function viewFriends() {
    const newfriends = [...currentContact.friends];
    return (
      <div>
        {newfriends.length > 0 ? (
          newfriends.map(friend => (
            <div key={friend.id}>
              <Button
                className="friendbutton"
                variant="outline-danger"
                onClick={() => {
                  onDeleteFriend(friend.id, { ...currentContact });
                }}
              >
                Delete
              </Button>
              <div className="textfriend">
                {friend.firstname} {friend.lastname}
              </div>
            </div>
          ))
        ) : (
          <div> no friends...:( </div>
        )}
        <Button
          variant="outline-success"
          onClick={() => {
            setAddFriends(true);
          }}
        >
          Add friends
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Modal
        body={viewFriends()}
        head={messages.myfriendsheader}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
      {addFriends && (
        <AddFriend
          close={() => {
            setAddFriends(false);
          }}
        />
      )}
    </div>
  );
}
Friends.propTypes = {
  currentContact: PropTypes.object,
  onDeleteFriend: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentContact: makeSelectCurrentContact(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDeleteFriend: (friendId, contact) =>
      dispatch(deleteFriend(friendId, contact)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Friends);
