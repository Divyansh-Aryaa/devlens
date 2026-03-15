const shimmer = `
  relative overflow-hidden
  before:absolute before:inset-0
  before:-translate-x-full
  before:animate-[shimmer_1.6s_infinite]
  before:bg-gradient-to-r
  before:from-transparent
  before:via-white/[0.06]
  before:to-transparent
`;

// Add this to your globals.css:
// @keyframes shimmer { 100% { transform: translateX(100%); } }

function SkeletonBox({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-md ${shimmer} ${className ?? ""}`}
      style={{ background: "rgba(255,255,255,0.07)", ...style }}
    />
  );
}

export function ProfileSkeleton() {
  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Avatar circle */}
      <div className="shrink-0 mx-auto md:mx-0">
        <div
          className={`w-28 h-28 md:w-36 md:h-36 rounded-full ${shimmer}`}
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>

      <div className="flex flex-col flex-1 w-full">
        {/* Name + handle */}
        <div className="mb-5 flex flex-col items-center md:items-start gap-2">
          <SkeletonBox className="h-7 w-48" />
          <SkeletonBox className="h-4 w-28" />
        </div>

        {/* Bio lines */}
        <div className="space-y-2 mb-6">
          <SkeletonBox className="h-3.5 w-full max-w-xl" />
          <SkeletonBox className="h-3.5 w-4/6 max-w-md" />
        </div>

        {/* Stat pills */}
        <div
          className="flex flex-wrap gap-3 mt-auto pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <SkeletonBox className="w-4 h-4 rounded-full" />
              <div className="space-y-1.5">
                <SkeletonBox className="h-3.5 w-10" />
                <SkeletonBox className="h-2.5 w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RepoListSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <SkeletonBox className="h-4 w-4 rounded-full" />
        <SkeletonBox className="h-4 w-36" />
        <SkeletonBox className="ml-auto h-5 w-16 rounded-full" />
      </div>

      {/* Rows */}
      <div>
        {[1, 2, 3, 4, 5].map((i, idx) => (
          <div
            key={i}
            className="px-6 py-5 flex flex-col sm:flex-row justify-between gap-4"
            style={{
              borderBottom: idx < 4 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <div className="flex-1 space-y-2.5">
              <SkeletonBox className="h-4 w-1/3" />
              <SkeletonBox className="h-3 w-2/3" />
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <SkeletonBox className="h-3.5 w-16 rounded-full" />
              <SkeletonBox className="h-3.5 w-10" />
              <SkeletonBox className="h-3.5 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LanguageChartSkeleton() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col h-full min-h-[350px]"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-6 pb-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <SkeletonBox className="h-4 w-4 rounded-full" />
        <SkeletonBox className="h-4 w-32" />
        <SkeletonBox className="ml-auto h-5 w-14 rounded-full" />
      </div>

      {/* Bars */}
      <div className="flex-1 flex flex-col justify-around py-2">
        {[100, 82, 65, 48, 30].map((pct, i) => (
          <div key={i} className="flex items-center gap-4">
            <SkeletonBox className="h-3.5 w-16 shrink-0" />
            <SkeletonBox
              className="h-5 rounded"
              style={{ width: `${pct}%`, borderRadius: "0 6px 6px 0" }}
            />
          </div>
        ))}
      </div>

      {/* Legend pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[60, 45, 70, 50, 55].map((w, i) => (
          <SkeletonBox key={i} className="h-6 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <ProfileSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <RepoListSkeleton />
        </div>
        <div className="lg:col-span-1 h-full">
          <LanguageChartSkeleton />
        </div>
      </div>
    </div>
  );
}