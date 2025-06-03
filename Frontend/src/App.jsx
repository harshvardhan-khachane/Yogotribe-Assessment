import React, { useState } from 'react';
import './App.css';

function App() {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFact = async () => {
    setIsLoading(true);
    setError(null);
    setFact('');

    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFact(data.fact);
    } catch (e) {
      setError(e.message || 'Failed to fetch fact. Please try again.');
      console.error("Fetching fact failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🐾 Random Fact Generator</h1>
        <p className="subtitle">Discover an interesting tidbit with a single click!</p>
      </header>
      <main className="app-main">
        <button
          onClick={fetchFact}
          disabled={isLoading}
          className="fetch-button"
        >
          {isLoading ? 'Loading...' : 'Get Random Fact'}
        </button>

        {error && <p className="error-message">Error: {error}</p>}

        {fact && !isLoading && !error && (
          <div className="fact-container">
            <p className="fact-text">"{fact}"</p>
          </div>
        )}

        {!fact && !isLoading && !error && (
          <p className="placeholder-text">Click the button to fetch a fun fact!</p>
        )}
      </main>
    </div>
  );
}

export default App;