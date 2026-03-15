"use client";

import { Users, UserPlus, FileCode, Link2 } from "lucide-react";
import { GitHubUser } from "@/lib/github";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProfileCard({ user }: { user: GitHubUser }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 32, scale: 0.98 });
      gsap.set(avatarRef.current, { opacity: 0, scale: 0.75 });
      gsap.set(".stat-item", { opacity: 0, y: 16 });

      gsap.to(cardRef.current, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
      });
      gsap.to(avatarRef.current, {
        opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.25,
      });
      gsap.to(".stat-item", {
        opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power2.out", delay: 0.45,
      });
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: <Users className="w-4 h-4" />,
      value: user.followers.toLocaleString(),
      label: "Followers",
      color: "#4ade80",
      bg: "rgba(74,222,128,0.1)",
      border: "rgba(74,222,128,0.25)",
    },
    {
      icon: <UserPlus className="w-4 h-4" />,
      value: user.following.toLocaleString(),
      label: "Following",
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.1)",
      border: "rgba(56,189,248,0.25)",
    },
    {
      icon: <FileCode className="w-4 h-4" />,
      value: user.public_repos.toLocaleString(),
      label: "Repos",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.1)",
      border: "rgba(167,139,250,0.25)",
    },
  ];

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 overflow-hidden"
      style={{
        //background: "rgba(255,255,255,0.04)",
        background: "none",
        //border: "1px solid rgba(255,255,255,0.10)",
        border: "none",
      }}
    >
      {/* Inner glow */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(74,222,128,0.07), transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* ── Avatar ── */}
      <div ref={avatarRef} className="flex-shrink-0 flex justify-center md:justify-start">
        <div
          className="rounded-full p-[3px] w-16 h-16 md:w-20 md:h-20"
          style={{ 
            background: "linear-gradient(135deg, #4ade80, #38bdf8, #a78bfa)",
            width: "200px",   // ← change this number to resize
            height: "200px",  // ← change this number to resize
            minWidth: "80px",
            minHeight: "80px",

          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 min-w-0 text-center md:text-left">

        {/* Name + handle */}
        <div className="mb-3">
          <h1
            className="font-black tracking-tight mb-1"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontFamily: "'Syne', sans-serif",
              color: "#f0f4ff",
            }}
          >
            {user.name || user.login}
          </h1>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm inline-flex items-center gap-1.5 w-fit mx-auto md:mx-0"
            style={{ color: "#4ade80" }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              gsap.to(e.currentTarget, { x: 3, duration: 0.2 });
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              gsap.to(e.currentTarget, { x: 0, duration: 0.2 });
            }}
          >
            <Link2 className="w-3.5 h-3.5" />
            @{user.login}
          </a>
        </div>

        {/* Bio */}
        {user.bio && (
          <p
            className="text-sm leading-relaxed mb-5 max-w-xl mx-auto md:mx-0"
            style={{
              color: "rgba(160,175,210,0.85)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {user.bio}
          </p>
        )}

        {/* Stats row */}
        <div
          className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-auto pt-5"
          style={{ 
            //borderTop: "1px solid rgba(255,255,255,0.08)",
            borderTop: "none",
            paddingTop: "8px",
            marginTop: "8px",
           }}
        >
          {stats.map(({ icon, value, label, color, bg, border }) => (
            <div
              key={label}
              className="stat-item flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-default"
              style={{ 
                background: bg, 
                border: `1px solid ${border}`,
                width: "120px",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -2, scale: 1.04, duration: 0.2, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.2, ease: "power2.out" });
              }}
            >
              <div style={{ color }}>{icon}</div>
              <div>
                <p
                  className="text-sm font-bold leading-none mb-1"
                  style={{ color: "#f0f4ff", fontFamily: "'Syne', sans-serif" }}
                >
                  {value}
                </p>
                <p
                  className="text-[10px] uppercase tracking-widest leading-none"
                  style={{ color: "rgba(160,175,210,0.55)" }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}