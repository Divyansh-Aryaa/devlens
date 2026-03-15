"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("username") || "");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // entrance animation
  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(wrapRef.current,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 1.4 }
    );

    // page-level orb + heading animations
    gsap.to(["#orb1", "#orb2", "#orb3"], { opacity: 1, duration: 1.8, stagger: 0.3, ease: "power2.out" });
    gsap.fromTo("#anim-badge", { opacity: 0, y: 18, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.5 });
    gsap.fromTo("#anim-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.8 });
    gsap.fromTo("#anim-sub", { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out", delay: 1.2 });
    gsap.fromTo("#anim-stats", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 1.7 });

    // idle orb float
    gsap.to("#orb1", { y: "-=18", duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5 });
    gsap.to("#orb2", { y: "+=14", duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
    gsap.to("#orb3", { x: "+=12", duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.2 });

    // mouse parallax on hero
    const hero = document.querySelector("main");
    const handleMouse = (e: MouseEvent) => {
      const rect = hero!.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to("#orb1", { x: cx * 30, y: cy * 25, duration: 1.2, ease: "power2.out" });
      gsap.to("#orb2", { x: cx * -20, y: cy * -18, duration: 1.4, ease: "power2.out" });
      gsap.to("#orb3", { x: cx * 14, y: cy * -12, duration: 1.0, ease: "power2.out" });
    };
    hero?.addEventListener("mousemove", handleMouse);
    return () => hero?.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    gsap.to(wrapRef.current, { scale: 1.015, duration: 0.25, ease: "power2.out" });
  };

  const handleBlur = () => {
    setIsFocused(false);
    gsap.to(wrapRef.current, { scale: 1, duration: 0.3, ease: "power2.inOut" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // button pop animation on submit
    gsap.fromTo(".search-btn", { scale: 0.95 }, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
    router.push(`/?username=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[580px]">
      <div ref={wrapRef} className="relative" style={{ opacity: 0 }}>
        
        {/* Glow ring */}
        <div ref={glowRef}
          className="absolute inset-[-1px] rounded-full pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: "linear-gradient(135deg, rgba(74,222,128,0.4), rgba(56,189,248,0.3), rgba(167,139,250,0.3))",
            opacity: isFocused ? 1 : 0
          }}
        />

        {/* Inner bar */}
        <div className="relative z-10 flex items-center gap-2.5 rounded-full px-5 py-2 backdrop-blur-sm transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${isFocused ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          <Search className="flex-shrink-0 w-4 h-4 transition-colors duration-200"
            style={{ color: isFocused ? "#4ade80" : "rgba(160,175,210,0.5)" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter a GitHub username…"
            className="flex-1 min-w-0 bg-transparent border-none outline-none py-3 text-sm font-mono"
            style={{ color: "#e2e8f0" }}
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="search-btn flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              boxShadow: "0 4px 20px rgba(34,197,94,0.35)",
              fontFamily: "'Syne', sans-serif"
            }}
          >
            Analyze
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </form>
  );
}