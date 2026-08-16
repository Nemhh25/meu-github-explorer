import { useState } from "react";
import "./App.css";
import RepoCard from "./components/RepoCard";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRepos([]);
    setProfile(null);

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos`),
      ]);

      if (!profileRes.ok || !reposRes.ok) {
        throw new Error("Usuário não encontrado");
      }

      const profileData = await profileRes.json();
      const reposData = await reposRes.json();

      setProfile(profileData);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Github Repo Explorer</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username do GitHub: </label>
        <input
          type="text"
          placeholder="ex: Nemhh25"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p className="loading-message">Carregando...</p>}
      {error && <p className="error-message">Erro: {error}</p>}
      {profile && (
        <div className="profile-card">
          <img
            src={profile.avatar_url}
            alt={`Avatar de ${profile.login}`}
            width="100"
          />
          <h2>{profile.name || profile.login}</h2>
          {profile.bio && <p>{profile.bio}</p>}
        </div>
      )}

      <ul>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
