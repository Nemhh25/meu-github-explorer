function RepoCard({ repo }) {
    return (
        <li>
            <h3>{repo.name}</h3>

            {repo.description && <p>{repo.description}</p>}

            <p>Linguagem: {repo.language}</p>

            <p>⭐ {repo.stargazers_count}</p>

            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
        </li>
    )
}
export default RepoCard