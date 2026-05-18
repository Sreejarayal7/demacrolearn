"use client";

import { useState } from "react";

const news = [
  {
    id: 1,
    title: "India successfully tests Agni-5 missile with MIRV technology",
    summary:
      "India joined an elite group of nations by testing multiple warhead missile technology, significantly boosting its nuclear deterrence capability.",
    category: "Defence",
    time: "2 hours ago",
    readTime: "3 min read",
    bias: "Neutral",
    source: "PIB India",
    hot: true,
    tags: ["DRDO", "Defence", "Nuclear"],
  },
  {
    id: 2,
    title: "RBI keeps repo rate unchanged at 6.5% for seventh consecutive time",
    summary:
      "The Reserve Bank of India maintained status quo on interest rates citing inflation concerns while keeping growth projections at 7% for FY25.",
    category: "Economy",
    time: "4 hours ago",
    readTime: "4 min read",
    bias: "Neutral",
    source: "RBI Press Release",
    hot: true,
    tags: ["RBI", "Economy", "Inflation"],
  },
  {
    id: 3,
    title: "Supreme Court grants bail to Delhi CM in excise policy case",
    summary:
      "The Supreme Court granted interim bail citing prolonged incarceration while trial is pending. Opposition calls it victory of democracy.",
    category: "Judiciary",
    time: "6 hours ago",
    readTime: "5 min read",
    bias: "Contested",
    source: "Supreme Court",
    hot: true,
    tags: ["Supreme Court", "Delhi", "Politics"],
  },
  {
    id: 4,
    title: "India's GDP grows at 8.2% in FY24, fastest among major economies",
    summary:
      "India retained its position as the fastest growing major economy with manufacturing and services sectors leading growth momentum.",
    category: "Economy",
    time: "8 hours ago",
    readTime: "3 min read",
    bias: "Neutral",
    source: "Ministry of Statistics",
    hot: false,
    tags: ["GDP", "Economy", "Growth"],
  },
  {
    id: 5,
    title: "Parliament passes Broadcasting Services Regulation Bill",
    summary:
      "The new bill regulates OTT platforms, digital news and streaming services bringing them under a unified regulatory framework.",
    category: "Parliament",
    time: "10 hours ago",
    readTime: "4 min read",
    bias: "Neutral",
    source: "Lok Sabha",
    hot: false,
    tags: ["OTT", "Media", "Regulation"],
  },
  {
    id: 6,
    title: "India-China disengage from last friction points in Eastern Ladakh",
    summary:
      "After 4 years of military standoff both countries completed disengagement from Depsang and Demchok marking a major diplomatic breakthrough.",
    category: "Foreign Policy",
    time: "12 hours ago",
    readTime: "5 min read",
    bias: "Neutral",
    source: "MEA India",
    hot: false,
    tags: ["China", "Ladakh", "Diplomacy"],
  },
];

const categories = [
  "All",
  "Economy",
  "Defence",
  "Judiciary",
  "Parliament",
  "Foreign Policy",
];

const biasColors: Record<string, { color: string; bg: string }> = {
  Neutral: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Contested: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Opinion: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
};

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? news
      : news.filter((n) => n.category === activeCategory);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        fontFamily: "sans-serif",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#1e293b",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "fixed",
          height: "100vh",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "32px",
            padding: "0 8px",
          }}
        >
          Demacro<span style={{ color: "#60a5fa" }}>Learn</span>
        </div>
        {[
          { icon: "🏠", label: "Home", href: "/dashboard" },
          { icon: "🤖", label: "AI Explainer", href: "/topics" },
          { icon: "⚖️", label: "Debates", href: "/debates" },
          { icon: "📜", label: "Bills", href: "/bills" },
          { icon: "📰", label: "Current Affairs", href: "/feed" },
          { icon: "🏆", label: "Leaderboard", href: "/leaderboard" },
          { icon: "👤", label: "Profile", href: "/profile" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: item.href === "/feed" ? "white" : "#94a3b8",
              background:
                item.href === "/feed" ? "rgba(59,130,246,0.15)" : "transparent",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </aside>

      {/* Main */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "32px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: "bold",
              margin: "0 0 8px",
            }}
          >
            📰 Current Affairs Feed
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Today&apos;s news simplified — with bias detection
          </p>
        </div>

        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                border:
                  activeCategory === cat
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                background: activeCategory === cat ? "#3b82f6" : "transparent",
                color: activeCategory === cat ? "white" : "#94a3b8",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News feed */}
        <div style={{ display: "grid", gap: "16px" }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
              }}
              onClick={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      background: "rgba(59,130,246,0.15)",
                      color: "#60a5fa",
                      borderRadius: "999px",
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      color: biasColors[item.bias]?.color,
                      background: biasColors[item.bias]?.bg,
                    }}
                  >
                    {item.bias === "Neutral"
                      ? "✅ Neutral"
                      : item.bias === "Contested"
                        ? "⚠️ Contested"
                        : "💭 Opinion"}
                  </span>
                  {item.hot && <span style={{ fontSize: "12px" }}>🔥</span>}
                </div>
                <span
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  {item.time}
                </span>
              </div>

              <h3
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  margin: "0 0 8px",
                  lineHeight: "1.4",
                }}
              >
                {item.title}
              </h3>

              {expandedId === item.id && (
                <div>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "14px",
                      lineHeight: "1.7",
                      margin: "0 0 16px",
                    }}
                  >
                    {item.summary}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "16px",
                    }}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          background: "rgba(255,255,255,0.05)",
                          color: "#64748b",
                          borderRadius: "999px",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      style={{
                        padding: "8px 20px",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      🤖 AI Explain
                    </button>
                    <button
                      style={{
                        padding: "8px 20px",
                        background: "transparent",
                        color: "#94a3b8",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "999px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      ⚖️ Debate This
                    </button>
                  </div>
                </div>
              )}

              {expandedId !== item.id && (
                <p style={{ color: "#64748b", fontSize: "13px", margin: "0" }}>
                  {item.readTime} • {item.source} • Click to read more
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
