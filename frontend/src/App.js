// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [response, setResponse] = useState(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    alphabets: false,
    numbers: false,
    highestAlphabet: false,
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(input);
      fetch("https://bajajfinserv-qualifier1-9.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success", data);
          setResponse(data);
          setError('');
        })
        .catch((error) => {
          console.error("There was a problem", error);
          setError('Failed to fetch data from the server.');
        });
    } catch (error) {
      setError('Invalid JSON format');
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div className="response-container">
        {filters.alphabets && response.alphabets && (
          <p><strong>Alphabets:</strong> {response.alphabets.join(', ')}</p>
        )}
        {filters.numbers && response.numbers && (
          <p><strong>Numbers:</strong> {response.numbers.join(', ')}</p>
        )}
        {filters.highestAlphabet && response.highest_alphabet && (
          <p><strong>Highest Alphabet:</strong> {response.highest_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1>Data Processor</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON here'
          className="text-input"
        />
        <button type='submit' className="submit-button">
          Submit
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {response && (
        <div className="filters-container">
          <label>
            <input
              type="checkbox"
              name="alphabets"
              checked={filters.alphabets}
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              name="numbers"
              checked={filters.numbers}
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              name="highestAlphabet"
              checked={filters.highestAlphabet}
              onChange={handleFilterChange}
            />
            Highest Alphabet
          </label>
        </div>
      )}
      {renderResponse()}
    </div>
  );
};

export default App;
