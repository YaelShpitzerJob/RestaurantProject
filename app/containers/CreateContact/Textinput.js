import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ name, label, onChange, placeholder, value }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event, name)}
      />
    </div>
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default TextInput;
