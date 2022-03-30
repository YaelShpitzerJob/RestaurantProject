import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ type = "string", name, label, onChange, placeholder, value }) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event, name)}
      />
    </div>
  </>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextInput;
