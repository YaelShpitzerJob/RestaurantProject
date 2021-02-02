import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import TextInput from './Textinput';
import './CreateCotact.scss';
import { messages } from './messages';
const ContactForm = ({
  contact,
  contactType,
  onSave,
  onChange,
  saving = false,
}) => (
  <div>
    <form onSubmit={onSave} className="form">
      <h1 className="h1">
        <strong>
          {contactType !== messages.Add ? messages.Edit : messages.Add} contact
        </strong>
      </h1>
      <TextInput
        name={messages.firstname}
        label={messages.Firstname}
        value={contact.firstname}
        onChange={onChange}
      />
      <TextInput
        name={messages.lastname}
        label={messages.Lastname}
        value={contact.lastname}
        onChange={onChange}
      />
      <TextInput
        name={messages.phone}
        label={messages.Phone}
        value={contact.phone}
        onChange={onChange}
      />
      <TextInput
        name={messages.address}
        label={messages.Address}
        value={contact.address}
        onChange={onChange}
      />
      <Button
        className="buttonsave"
        onClick={onSave}
        variant="success"
        disabled={saving}
      >
        {saving ? messages.saving : messages.save}
      </Button>
    </form>
  </div>
);

ContactForm.propTypes = {
  contact: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  contactType: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ContactForm;
