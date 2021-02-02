// View modal
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import '../ContactList.scss';

const { Header, Body, Title } = Modal;

function MyVerticallyCenteredModal(props) {
  return (
    <div className="buttonnnn">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Header closeButton>
          <Title id="contained-modal-title-vcenter" className="h1">
            {props.head}
          </Title>
        </Header>
        <Body>
          <div>{props.body}</div>
        </Body>
      </Modal>
    </div>
  );
}
MyVerticallyCenteredModal.propTypes = {
  head: PropTypes.string,
  body: PropTypes.object,
};
export default MyVerticallyCenteredModal;
