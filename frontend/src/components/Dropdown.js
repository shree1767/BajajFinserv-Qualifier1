// src/components/Dropdown.js
import React from 'react';

const Dropdown = ({ options, onChange }) => {
  return (
    <select multiple onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;