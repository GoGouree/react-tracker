import { useState, useEffect } from "react";
import styled from "styled-components";

// Typed API Response Interface
interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string | null;
  location: string | null;
  company: string | null;
}

interface GitHubSearchResponse {
  items: GitHubUser[];
  total_count: number;
}

// Styled Components
const SearchContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #ee5ee7;
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #ee5ee7;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d43fd8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const UserCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const UserName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
`;

const UserLogin = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;

  a {
    color: #ee5ee7;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #555;

  > span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const UserBio = styled.p`
  margin: 1rem 0 0 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

const StatusMessage = styled.div<{ type: "loading" | "error" | "empty" }>`
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  color: ${(props) => {
    switch (props.type) {
      case "error":
        return "#d32f2f";
      case "loading":
        return "#1976d2";
      case "empty":
        return "#666";
      default:
        return "#555";
    }
  }};
`;

// Main Component
export const GitHubUserSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Async function to fetch GitHub users
  const fetchGitHubUsers = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      // GitHub API endpoint to search users
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=12`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GitHubSearchResponse = await response.json();

      // Fetch detailed info for each user (optional but shows additional concept)
      const detailedUsers = await Promise.all(
        data.items.slice(0, 12).map(async (user) => {
          const userResponse = await fetch(user.url, {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          });
          return userResponse.json() as Promise<GitHubUser>;
        })
      );

      setUsers(detailedUsers);
      setHasSearched(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch users";
      setError(errorMessage);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGitHubUsers(searchQuery);
  };

  return (
    <SearchContainer>
      <h2>🔍 GitHub User Search</h2>

      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search GitHub username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
        />
        <SearchButton type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </SearchButton>
      </SearchForm>

      {/* Status Messages */}
      {error && <StatusMessage type="error">❌ {error}</StatusMessage>}
      {loading && <StatusMessage type="loading">⏳ Loading users...</StatusMessage>}
      {hasSearched && !loading && users.length === 0 && !error && (
        <StatusMessage type="empty">No users found</StatusMessage>
      )}

      {/* Results Grid */}
      {users.length > 0 && (
        <ResultsContainer>
          {users.map((user) => (
            <UserCard key={user.id}>
              <AvatarImage src={user.avatar_url} alt={user.login} />
              <CardContent>
                <UserName>{user.login}</UserName>
                <UserLogin>
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile →
                  </a>
                </UserLogin>

                {user.bio && <UserBio>{user.bio}</UserBio>}
                {user.location && <p>📍 {user.location}</p>}
                {user.company && <p>🏢 {user.company}</p>}

                <UserInfo>
                  <span>👥 Followers: {user.followers.toLocaleString()}</span>
                  <span>📦 Repos: {user.public_repos}</span>
                </UserInfo>
              </CardContent>
            </UserCard>
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
};

export default GitHubUserSearch;
