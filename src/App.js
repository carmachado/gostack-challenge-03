import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      title: 'New repository',
      url: 'https://github.com/rocketseat-education/bootcamp-gostack-desafios/',
      techs: ["Node.js", "..."]	,
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
      
    const newRepositories = repositories.filter((repo) => repo.id !== id);

    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => {
          return (
            <li key={id}>
              {title}

              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          )
        })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
