// RadioInput.js
import React from 'react';
import './radioInput.css';

const RadioInput = ({ label, checked, onChange, name, value }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (onChange) {
      onChange({ name, value });
    }
  };

  return (
    <label className="radio-input-container">
      <input
        type="radio"
        checked={checked}
        onChange={handleChange}
        name={name}
        value={value}
      />
      <span className="radio-checkmark"></span>
      {label}
    </label>
  );
};

export default RadioInput;
