import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('Invalid JSON format');
      }
      const res = await fetch('http://localhost:6000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
      setShowDropdown(true);
    } catch (err) {
      setError('Invalid JSON format');
      console.error(err);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    let result = {};
    if (selectedOptions.includes('Alphabets')) result.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) result.numbers = response.numbers;
    if (selectedOptions.includes('Highest alphabet')) result.highest_alphabet = response.highest_alphabet;

    return (
      <div>
        {Object.entries(result).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value.join(', ')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React JSON Processor</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='Enter JSON here, e.g., { "data": ["A","C","z"] }'
          />
          <button type="submit">Submit</button>
        </form>
        {error && <div className="error">{error}</div>}
        {showDropdown && (
          <select multiple={true} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest alphabet">Highest alphabet</option>
          </select>
        )}
        {renderResponse()}
      </header>
    </div>
  );
}

export default App;
