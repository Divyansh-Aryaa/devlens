import { Suspense } from "react";
import SearchForm from "@/components/SearchForm";
import ProfileCard from "@/components/ProfileCard";
import RepoList from "@/components/RepoList";
import LanguageChart from "@/components/LanguageChart";
import { DashboardSkeleton } from "@/components/Skeletons";
import { fetchGitHubUser, fetchUserRepos, getTopRepos, getLanguageStats } from "@/lib/github";
import { Github } from "lucide-react";

async function Dashboard({ username }: { username: string }) {
  const user = await fetchGitHubUser(username);

  if (!user) {
    return (
      <div className="border p-6 rounded-xl text-center animate-in fade-in zoom-in duration-300"
        style={{
          background: "rgba(239,68,68,0.08)",
          borderColor: "rgba(239,68,68,0.25)",
          color: "#fca5a5"
        }}
      >
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          User not found
        </h2>
        <p className="text-sm font-mono" style={{ color: "rgba(252,165,165,0.75)" }}>
          Could not find a GitHub user with the username &quot;{username}&quot;. Please check the spelling and try again.
        </p>
      </div>
    );
  }

  const allRepos = await fetchUserRepos(username);
  const topRepos = getTopRepos(allRepos, 5);
  const languageStats = getLanguageStats(allRepos);

  return (
    <div className="space-y-8">
      <ProfileCard user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <RepoList repos={topRepos} />
        </div>
        <div className="lg:col-span-1 h-full">
          <LanguageChart data={languageStats} />
        </div>
      </div>
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const username =
    typeof resolvedSearchParams?.username === "string"
      ? resolvedSearchParams.username
      : null;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "#060912", fontFamily: "'Syne', sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      {/* ── Gradient mesh ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 20% 30%, rgba(46,200,120,0.13) 0%, transparent 65%),
            radial-gradient(ellipse 55% 50% at 80% 70%, rgba(56,120,255,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 60% 45% at 55% 10%, rgba(120,60,255,0.09) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Grid lines ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Floating orbs ── */}
      <div id="orb1" className="pointer-events-none absolute -top-20 -left-14 w-80 h-80 rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, rgba(46,200,120,0.25), transparent 70%)", filter: "blur(60px)" }}
      />
      <div id="orb2" className="pointer-events-none absolute -bottom-16 -right-10 w-64 h-64 rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, rgba(56,120,255,0.2), transparent 70%)", filter: "blur(60px)" }}
      />
      <div id="orb3" className="pointer-events-none absolute top-[40%] left-[60%] w-52 h-52 rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, rgba(180,80,255,0.18), transparent 70%)", filter: "blur(60px)" }}
      />

      {/* ── Corner accents ── */}
      <div className="pointer-events-none absolute top-4 left-4 w-14 h-14 opacity-30"
        style={{ borderTop: "1px solid rgba(74,222,128,0.5)", borderLeft: "1px solid rgba(74,222,128,0.5)", borderRadius: "4px 0 0 0" }}
      />
      <div className="pointer-events-none absolute bottom-4 right-4 w-14 h-14 opacity-30"
        style={{ borderBottom: "1px solid rgba(56,189,248,0.5)", borderRight: "1px solid rgba(56,189,248,0.5)", borderRadius: "0 0 4px 0" }}
      />

      {/* ── Page content ── */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Hero header — only shown when no search yet */}
        {!username && (
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">

            {/* Badge */}
            <div
              id="anim-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 font-mono text-xs tracking-wider opacity-0"
              style={{
                background: "rgba(46,200,120,0.1)",
                borderColor: "rgba(46,200,120,0.25)",
                color: "#4ade80",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
              />
              github · analyzer · v2.0
            </div>

            {/* Heading */}
            <h1
              id="anim-heading"
              className="font-black leading-tight tracking-tight text-[#f0f4ff] mb-4 opacity-0"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
            >
              Decode any{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #4ade80 0%, #38bdf8 50%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                GitHub profile
              </span>
              {" "}instantly
            </h1>

            {/* Subtext */}
            <p
              id="anim-sub"
              className="font-mono text-sm mb-10 tracking-wide opacity-0"
              style={{ color: "rgba(160,175,210,0.75)" }}
            >
              &gt; repos · languages · stars · contributions
            </p>
          </div>
        )}

        {/* Compact header shown after search */}
        {username && (
          <div className="flex items-center gap-3 mb-8">
            <Github className="w-6 h-6" style={{ color: "#4ade80" }} />
            <span className="font-mono text-sm" style={{ color: "rgba(160,175,210,0.6)" }}>
              github · analyzer
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
              {username}
            </span>
          </div>
        )}

        {/* Search form */}
        <Suspense
          fallback={
            <div className="h-14 w-full max-w-[580px] mx-auto mb-8 rounded-full animate-pulse"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          }
        >
          <SearchForm />
        </Suspense>

        {/* Stats row — only on landing */}
        {!username && (
          <div
            id="anim-stats"
            className="flex items-center justify-center gap-6 mt-8 opacity-0"
          >
            {["Public API · No key needed", "Results in < 1s", "Live data"].map((label, i) => (
              <div key={i} className="flex items-center gap-2 font-mono text-xs"
                style={{ color: "rgba(160,175,210,0.55)" }}>
                {i > 0 && <div className="w-px h-4 mr-1" style={{ background: "rgba(255,255,255,0.1)" }} />}
                {label}
              </div>
            ))}
          </div>
        )}

        {/* Dashboard results */}
        {username && (
          <div className="mt-8">
            <Suspense key={username} fallback={<DashboardSkeleton />}>
              <Dashboard username={username} />
            </Suspense>
          </div>
        )}
      </div>

      {/* ── GSAP animations (client-side only via inline script) ── */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              if (typeof gsap === 'undefined') return;
              gsap.to(['#orb1','#orb2','#orb3'], { opacity: 1, duration: 1.8, stagger: 0.3, ease: 'power2.out' });
              gsap.fromTo('#anim-badge',  { opacity:0, y:18, scale:0.9 }, { opacity:1, y:0, scale:1, duration:0.6, ease:'power3.out', delay:0.5 });
              gsap.fromTo('#anim-heading',{ opacity:0, y:30 },            { opacity:1, y:0, duration:0.7, ease:'power3.out', delay:0.8 });
              gsap.fromTo('#anim-sub',    { opacity:0, x:-12 },           { opacity:1, x:0, duration:0.5, ease:'power3.out', delay:1.2 });
              gsap.fromTo('#anim-stats',  { opacity:0, y:14 },            { opacity:1, y:0, duration:0.5, ease:'power3.out', delay:1.7 });
              gsap.to('#orb1', { y:'-=18', duration:4, ease:'sine.inOut', yoyo:true, repeat:-1, delay:0.5 });
              gsap.to('#orb2', { y:'+=14', duration:3.5, ease:'sine.inOut', yoyo:true, repeat:-1, delay:1 });
              gsap.to('#orb3', { x:'+=12', duration:5, ease:'sine.inOut', yoyo:true, repeat:-1, delay:0.2 });
              document.querySelector('main')?.addEventListener('mousemove', function(e) {
                var rect = e.currentTarget.getBoundingClientRect();
                var cx = (e.clientX - rect.left) / rect.width - 0.5;
                var cy = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to('#orb1', { x: cx*30, y: cy*25, duration:1.2, ease:'power2.out' });
                gsap.to('#orb2', { x: cx*-20, y: cy*-18, duration:1.4, ease:'power2.out' });
                gsap.to('#orb3', { x: cx*14, y: cy*-12, duration:1.0, ease:'power2.out' });
              });
            });
          `,
        }}
      />
    </main>
  );
}