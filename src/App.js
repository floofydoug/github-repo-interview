import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle fetching repositories from the GitHub API
  const handleFetchRepos = async () => {
    setLoading(true);
    setError('');
    setRepos([]);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
        throw new Error('User not found or error fetching data');
      }
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>GitHub Repository Viewer</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleFetchRepos}>Fetch Repositories</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a> - {repo.description} ⭐ {repo.stargazers_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
