"use client";

import { Star, GitFork, BookOpen, ExternalLink } from "lucide-react";
import { GitHubRepo } from "@/lib/github";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#888888",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

function getLanguageColor(language: string | null) {
  if (!language) return "#8b949e";
  return languageColors[language] || "#8b949e";
}

export default function RepoList({ repos }: { repos: GitHubRepo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 0, y: 28 });
      gsap.set(".repo-row", { opacity: 0, x: -16 });

      gsap.to(containerRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2,
      });
      gsap.to(".repo-row", {
        opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: "power2.out", delay: 0.4,
      });
    });
    return () => ctx.revert();
  }, []);

  if (repos.length === 0) {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <BookOpen className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(160,175,210,0.3)" }} />
        <h3
          className="text-base font-semibold"
          style={{ color: "rgba(160,175,210,0.6)", fontFamily: "'Syne', sans-serif" }}
        >
          No public repositories
        </h3>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "none",
        border: "none",
        marginLeft: "8px",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-center gap-3"
        style={{
          borderBottom: "none",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <Star className="w-4 h-4 fill-[#f1e05a] text-[#f1e05a]" />
        <h2
          className="text-base font-bold tracking-tight"
          style={{ color: "#f0f4ff", fontFamily: "'Syne', sans-serif" }}
        >
          Top Repositories
        </h2>
        <span
          className="ml-auto font-mono text-xs px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(74,222,128,0.1)",
            color: "#4ade80",
            border: "1px solid rgba(74,222,128,0.25)",
            padding: "3px 10px",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {repos.length} repos
        </span>
      </div>

      {/* Rows */}
      <div>
        {repos.map((repo, i) => (
          <div
            key={repo.id}
            className="repo-row group px-6 py-5"
            style={{
              //borderBottom: i < repos.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { backgroundColor: "rgba(255,255,255,0.04)", duration: 0.2 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { backgroundColor: "rgba(255,255,255,0)", duration: 0.2 });
            }}
          >
            {/* Name row */}
            <div className="flex items-center gap-2 mb-2">
              <a
              
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm hover:underline underline-offset-2 truncate"
                style={{ color: "#60a5fa", fontFamily: "'Syne', sans-serif" }}
              >
                {repo.name}
              </a>
              <ExternalLink
                className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                style={{ color: "#60a5fa" }}
              />
            </div>

            {/* Description */}
            {repo.description && (
              <p
                className="leading-relaxed mb-3 line-clamp-2"
                style={{
                  color: "rgba(180,195,225,0.8)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                }}
              >
                {repo.description}
              </p>
            )}

            {/* Meta: language · stars · forks */}
            <div className="flex flex-wrap items-center gap-4">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: getLanguageColor(repo.language),
                      boxShadow: `0 0 5px ${getLanguageColor(repo.language)}70`,
                    }}
                  />
                  <span
                    className="text-xs font-mono"
                    style={{ color: "rgba(200,215,240,0.9)" }}
                  >
                    {repo.language}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#f1e05a] text-[#f1e05a]" />
                <span className="text-xs font-mono" style={{ color: "rgba(200,215,240,0.9)" }}>
                  {repo.stargazers_count.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
                <span className="text-xs font-mono" style={{ color: "rgba(200,215,240,0.9)" }}>
                  {repo.forks_count.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}