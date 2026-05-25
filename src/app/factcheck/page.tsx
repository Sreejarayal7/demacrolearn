"use client";

import { useState } from "react";

export default function FactCheckPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    verdict: string;
    confidence: number;
    explanation: string;
    facts: string[];
    sources: string[];
    rating: "TRUE" | "FALSE" | "PARTIAL" | "MISLEADING" | "UNVERIFIED";
  } | null>(null);

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/factcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: input }),
      });
      const data = await response.json();
      if (data.result) setResult(data.result);
    } catch (error) {
      console.error("Fact check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const ratingConfig = {
    TRUE: {
      color: "#10b981",
      bg: "rgba(16,185,129,0.15)",
      icon: "✅",
      label: "TRUE",
    },
    FALSE: {
      color: "#ef4444",
      bg: "rgba(239,68,68,0.15)",
      icon: "❌",
      label: "FALSE",
    },
    PARTIAL: {
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
      icon: "⚠️",
      label: "PARTIALLY TRUE",
    },
    MISLEADING: {
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
      icon: "🔍",
      label: "MISLEADING",
    },
    UNVERIFIED: {
      color: "#64748b",
      bg: "rgba(100,116,139,0.15)",
      icon: "❓",
      label: "UNVERIFIED",
    },
  };

  const sampleClaims = [
    "India has the largest army in the world",
    "Onion prices crossed ₹100 per kg in 2023",
    "India became the most populous country in 2023",
    "WhatsApp is reading all your private messages",
    "India banned TikTok permanently",
    "Voting in India is mandatory by law",
  ];

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
          { icon: "🔍", label: "Fact Checker", href: "/factcheck" },
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
              color: item.href === "/factcheck" ? "white" : "#94a3b8",
              background:
                item.href === "/factcheck"
                  ? "rgba(239,68,68,0.15)"
                  : "transparent",
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
            🔍 Fake News Detector
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Paste any WhatsApp forward, news headline or claim — AI will fact
            check it
          </p>
        </div>

        {/* Input */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b, #1e1b4b)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "24px",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste any claim, WhatsApp message, or news headline here...&#10;&#10;Example: 'India has made voting mandatory for all citizens above 18'"
            rows={5}
            style={{
              width: "100%",
              padding: "16px",
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              color: "white",
              fontSize: "14px",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
              lineHeight: "1.6",
              fontFamily: "sans-serif",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <span style={{ color: "#475569", fontSize: "12px" }}>
              {input.length} characters
            </span>
            <button
              onClick={handleCheck}
              disabled={loading || !input.trim()}
              style={{
                padding: "12px 32px",
                background: loading
                  ? "#334155"
                  : "linear-gradient(135deg, #ef4444, #f97316)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Checking... 🔍" : "Fact Check This →"}
            </button>
          </div>
        </div>

        {/* Sample claims */}
        {!result && !loading && (
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              Try these examples:
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {sampleClaims.map((claim) => (
                <button
                  key={claim}
                  onClick={() => setInput(claim)}
                  style={{
                    padding: "8px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "999px",
                    color: "#94a3b8",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  {claim}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            style={{
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>🔍</div>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                marginBottom: "16px",
              }}
            >
              AI is fact-checking this claim against verified sources...
            </p>
            <div
              style={{ display: "flex", gap: "8px", justifyContent: "center" }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#ef4444",
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div>
            {/* Verdict banner */}
            <div
              style={{
                background: ratingConfig[result.rating].bg,
                border: `1px solid ${ratingConfig[result.rating].color}`,
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ fontSize: "48px" }}>
                {ratingConfig[result.rating].icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: ratingConfig[result.rating].color,
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  {ratingConfig[result.rating].label}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "14px" }}>
                  Confidence: {result.confidence}%
                </div>
              </div>
              {/* Confidence meter */}
              <div style={{ width: "120px" }}>
                <div
                  style={{
                    height: "8px",
                    background: "#334155",
                    borderRadius: "999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${result.confidence}%`,
                      background: ratingConfig[result.rating].color,
                      borderRadius: "999px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  margin: "0 0 12px",
                }}
              >
                📋 Explanation
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  lineHeight: "1.8",
                  margin: 0,
                }}
              >
                {result.explanation}
              </p>
            </div>

            {/* Facts */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "0 0 16px",
                  }}
                >
                  🔑 Key Facts
                </h3>
                {result.facts.map((fact, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#60a5fa",
                        marginTop: "6px",
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        margin: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      {fact}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "0 0 16px",
                  }}
                >
                  📚 Verify at Sources
                </h3>
                {result.sources.map((source, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#10b981",
                        marginTop: "6px",
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{ color: "#60a5fa", fontSize: "13px", margin: 0 }}
                    >
                      {source}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Check another */}
            <button
              onClick={() => {
                setResult(null);
                setInput("");
              }}
              style={{
                padding: "12px 32px",
                background: "transparent",
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              ← Check Another Claim
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
