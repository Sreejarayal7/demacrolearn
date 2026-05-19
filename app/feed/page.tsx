"use client";

import { useState, useEffect } from "react";

type NewsItem = {
  id: number;
  title: string;
  summary: string;
  source: string;
  url: string;
  time: string;
  category: string;
  hot: boolean;
  bias: string;
  tags: string[];
};

const categories = ["All", "Current Affairs"];

const biasColors: Record<string, { color: string; bg: string }> = {
  Neutral: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Contested: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Opinion: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
};

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [summaries, setSummaries] = useState<Record<number, string>>({});
  const [loadingSummary, setLoadingSummary] = useState<number | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleSummarize = async (
    id: number,
    title: string,
    content: string,
  ) => {
    if (summaries[id]) return;
    setLoadingSummary(id);
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
      if (data.summary) {
        setSummaries((prev) => ({ ...prev, [id]: data.summary }));
      }
    } catch (error) {
      console.error("Summary error:", error);
    } finally {
      setLoadingSummary(null);
    }
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div>
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
              Live news from India — simplified with AI
            </p>
          </div>
          <button
            onClick={fetchNews}
            style={{
              padding: "8px 20px",
              background: "transparent",
              color: "#60a5fa",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "999px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>
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

        {/* Loading state */}
        {loadingNews && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>📰</div>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Fetching latest news from India...
            </p>
          </div>
        )}

        {/* News feed */}
        {!loadingNews && (
          <div style={{ display: "grid", gap: "16px" }}>
            {news.map((item) => (
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
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
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
                    <div
                      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSummarize(item.id, item.title, item.summary);
                        }}
                        disabled={loadingSummary === item.id}
                        style={{
                          padding: "8px 20px",
                          background:
                            loadingSummary === item.id ? "#334155" : "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor:
                            loadingSummary === item.id
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        {loadingSummary === item.id
                          ? "Summarizing... 🤖"
                          : "🤖 AI Explain"}
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          padding: "8px 20px",
                          background: "transparent",
                          color: "#94a3b8",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "999px",
                          fontSize: "12px",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        🔗 Read Full Article
                      </a>
                    </div>

                    {summaries[item.id] && (
                      <div
                        style={{
                          marginTop: "16px",
                          background: "#0f172a",
                          border: "1px solid rgba(59,130,246,0.2)",
                          borderRadius: "12px",
                          padding: "16px",
                        }}
                      >
                        <p
                          style={{
                            color: "#60a5fa",
                            fontSize: "12px",
                            fontWeight: "600",
                            margin: "0 0 8px",
                          }}
                        >
                          🤖 AI Summary
                        </p>
                        <pre
                          style={{
                            color: "#e2e8f0",
                            fontSize: "13px",
                            lineHeight: "1.8",
                            whiteSpace: "pre-wrap",
                            fontFamily: "sans-serif",
                            margin: 0,
                          }}
                        >
                          {summaries[item.id]}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {expandedId !== item.id && (
                  <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                    {item.source} • Click to read more
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
