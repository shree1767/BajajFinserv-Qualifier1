// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import TextInput from './components/TextInput';
import Dropdown from './components/Dropdown';

const App = () => {
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleFormSubmit = async (inputData) => {
    try {
      const parsedData = JSON.parse(inputData);
      const res = await axios.post('https://bajajfinserv-qualifier1-9.onrender.com/bfhl', parsedData);
      setResponse(res.data);
    } catch (error) {
      console.error('API call failed');
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (response) {
      return (
        <div>
          {selectedOptions.includes('alphabets') && response.alphabets && (
            <div>Alphabets: {response.alphabets.join(', ')}</div>
          )}
          {selectedOptions.includes('numbers') && response.numbers && (
            <div>Numbers: {response.numbers.join(', ')}</div>
          )}
          {selectedOptions.includes('highest_alphabet') && response.highest_alphabet && (
            <div>Highest Alphabet: {response.highest_alphabet.join(', ')}</div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <TextInput onSubmit={handleFormSubmit} />
      <Dropdown
        options={[
          { value: 'alphabets', label: 'Alphabets' },
          { value: 'numbers', label: 'Numbers' },
          { value: 'highest_alphabet', label: 'Highest Alphabet' }
        ]}
        onChange={handleDropdownChange}
      />
      {renderResponse()}
    </div>
  );
};

export default App;

