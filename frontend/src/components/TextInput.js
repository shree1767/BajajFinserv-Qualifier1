import React, { useState } from 'react';

const TextInput = ({ onSubmit }) => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      JSON.parse(inputData); 
      onSubmit(inputData);
      setError('');
    } catch {
      setError('Invalid JSON format');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          placeholder='Enter JSON here'
        />
        <button type='submit' style={{ backgroundColor: 'blue', color: 'white' }}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextInput;