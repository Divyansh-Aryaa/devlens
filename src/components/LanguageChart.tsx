"use client";

import { PieChart } from "lucide-react";
import { LanguageStat } from "@/lib/github";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ── colors unchanged ──
const COLORS = [
  "#4ade80",
  "#38bdf8",
  "#a78bfa",
  "#f1e05a",
  "#f97316",
  "#ec4899",
  "#2dd4bf",
  "#fb923c",
  "#818cf8",
  "#34d399",
];

export default function LanguageChart({ data }: { data: LanguageStat[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  if (data.length === 0) {
    return (
      <div
        className="rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[300px]"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <PieChart className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(160,175,210,0.3)" }} />
        <h3
          className="text-base font-semibold"
          style={{ color: "rgba(160,175,210,0.6)", fontFamily: "'Syne', sans-serif" }}
        >
          No language data
        </h3>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="rounded-2xl p-6 flex flex-col h-full min-h-[350px]"
      style={{
        background: "transparent",
        border: "none",
        marginTop: "40px",
        opacity: 0, // GSAP animates in
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 mb-6 pb-4"
        style={{ 
          borderBottom: "none", 
          paddingLeft: "8px" ,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <PieChart className="w-4 h-4" style={{ color: "#4ade80" }} />
        <h2
          className="text-base font-bold tracking-tight"
          style={{ color: "#f0f4ff", fontFamily: "'Syne', sans-serif" }}
        >
          Top Languages
        </h2>
        <span
          className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(74,222,128,0.1)",
            color: "#4ade80",
            border: "1px solid rgba(74,222,128,0.25)",
            //fontSize: "10px",
            padding: "3px 10px",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.length} langs
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              vertical={true}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis type="number" hide={true} />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(160,175,210,0.75)",
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              width={90}
            />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                contentStyle={{
                  background: "rgba(6,9,18,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: "#f0f4ff",
                }}
                labelStyle={{ color: "#4ade80" }}
                itemStyle={{ color: "rgba(160,175,210,0.8)" }}
                formatter={(value) => [`${value} repos`, "count"]}
              />

<Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  opacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend dots */}
      <div className="mt-4 flex flex-wrap gap-2">
        {data.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center gap-1.5 rounded-full"
            style={{
              background: `${COLORS[index % COLORS.length]}15`,
              border: `1px solid ${COLORS[index % COLORS.length]}30`,
              width: "120px",
              justifyContent: "center",
              padding: "5px 10px",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: COLORS[index % COLORS.length],
                boxShadow: `0 0 5px ${COLORS[index % COLORS.length]}80`,
              }}
            />
            <span
              className="text-[10px] font-mono"
              style={{ color: "rgba(160,175,210,0.8)" }}
            >
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}