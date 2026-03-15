export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface LanguageStat {
  name: string;
  count: number;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  // Fetch up to 100 recent repos to get a good sample for languages and stars
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error(`Failed to fetch repos: ${res.statusText}`);
  }

  return res.json();
}

export function getTopRepos(repos: GitHubRepo[], count: number = 5): GitHubRepo[] {
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, count);
}

export function getLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const languageCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  // Convert to array and sort by count descending
  return Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 languages
}
