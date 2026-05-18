"use client";

import { useState } from "react";

const debates = [
  {
    id: 1,
    title: "Should India have a Uniform Civil Code?",
    category: "Law & Constitution",
    participants: 1247,
    arguments: 89,
    timeLeft: "2 days",
    hot: true,
    sides: { for: 58, against: 42 },
  },
  {
    id: 2,
    title: "Is reservation system still needed in 2025?",
    category: "Social Policy",
    participants: 2341,
    arguments: 156,
    timeLeft: "5 days",
    hot: true,
    sides: { for: 45, against: 55 },
  },
  {
    id: 3,
    title: "Should voting age be reduced to 16?",
    category: "Elections",
    participants: 876,
    arguments: 67,
    timeLeft: "1 day",
    hot: false,
    sides: { for: 62, against: 38 },
  },
  {
    id: 4,
    title: "Should India ban Chinese apps permanently?",
    category: "Technology",
    participants: 3102,
    arguments: 201,
    timeLeft: "3 days",
    hot: true,
    sides: { for: 71, against: 29 },
  },
  {
    id: 5,
    title: "Is free speech absolute in a democracy?",
    category: "Rights",
    participants: 654,
    arguments: 43,
    timeLeft: "6 days",
    hot: false,
    sides: { for: 49, against: 51 },
  },
  {
    id: 6,
    title: "Should UPSC exams be conducted in regional languages?",
    category: "Education",
    participants: 1893,
    arguments: 112,
    timeLeft: "4 days",
    hot: false,
    sides: { for: 66, against: 34 },
  },
];

type BiasResult = {
  type: string;
  score: number;
  feedback: string;
  suggestion: string;
};

export default function DebatesPage() {
  const [activeDebate, setActiveDebate] = useState<number | null>(null);
  const [argument, setArgument] = useState("");
  const [side, setSide] = useState<"for" | "against">("for");
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [biasResult, setBiasResult] = useState<BiasResult | null>(null);

  const handleSubmit = async () => {
    if (!argument.trim()) return;
    setAnalyzing(true);
    setBiasResult(null);
    try {
      const response = await fetch("/api/bias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ argument }),
      });
      const data = await response.json();
      if (data.analysis) {
        setBiasResult(data.analysis);
        setSubmitted(true);
        setArgument("");
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Bias detection error:", error);
    } finally {
      setAnalyzing(false);
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
              color: item.href === "/debates" ? "white" : "#94a3b8",
              background:
                item.href === "/debates"
                  ? "rgba(139,92,246,0.15)"
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
            ⚖️ Debate Arena
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Anonymous debates on India&apos;s most important issues
          </p>
        </div>

        {/* Debate List */}
        {!activeDebate && (
          <div style={{ display: "grid", gap: "16px" }}>
            {debates.map((debate) => (
              <div
                key={debate.id}
                style={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          background: "rgba(139,92,246,0.15)",
                          color: "#a78bfa",
                          borderRadius: "999px",
                        }}
                      >
                        {debate.category}
                      </span>
                      {debate.hot && (
                        <span style={{ fontSize: "12px" }}>🔥</span>
                      )}
                    </div>
                    <h3
                      style={{
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        margin: "0 0 12px",
                      }}
                    >
                      {debate.title}
                    </h3>
                    <div style={{ marginBottom: "12px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#10b981", fontSize: "12px" }}>
                          For {debate.sides.for}%
                        </span>
                        <span style={{ color: "#ef4444", fontSize: "12px" }}>
                          Against {debate.sides.against}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: "6px",
                          background: "#334155",
                          borderRadius: "999px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${debate.sides.for}%`,
                            background:
                              "linear-gradient(90deg, #10b981, #3b82f6)",
                            borderRadius: "999px",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <span style={{ color: "#64748b", fontSize: "12px" }}>
                        👥 {debate.participants.toLocaleString()} participants
                      </span>
                      <span style={{ color: "#64748b", fontSize: "12px" }}>
                        💬 {debate.arguments} arguments
                      </span>
                      <span style={{ color: "#64748b", fontSize: "12px" }}>
                        ⏱️ {debate.timeLeft} left
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveDebate(debate.id)}
                    style={{
                      marginLeft: "24px",
                      padding: "10px 24px",
                      background: "#8b5cf6",
                      color: "white",
                      border: "none",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Join Debate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Active Debate View */}
        {activeDebate && (
          <div>
            <button
              onClick={() => {
                setActiveDebate(null);
                setBiasResult(null);
              }}
              style={{
                marginBottom: "24px",
                padding: "8px 16px",
                background: "transparent",
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              ← Back to debates
            </button>

            <div
              style={{
                background: "#1e293b",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  margin: "0 0 8px",
                }}
              >
                {debates.find((d) => d.id === activeDebate)?.title}
              </h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                You are anonymous in this debate. Argue based on facts, not
                emotions.
              </p>
            </div>

            {/* Side selector */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <button
                onClick={() => setSide("for")}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "12px",
                  border:
                    side === "for"
                      ? "2px solid #10b981"
                      : "1px solid rgba(255,255,255,0.08)",
                  background:
                    side === "for" ? "rgba(16,185,129,0.1)" : "#1e293b",
                  color: side === "for" ? "#10b981" : "#94a3b8",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                👍 Argue FOR
              </button>
              <button
                onClick={() => setSide("against")}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "12px",
                  border:
                    side === "against"
                      ? "2px solid #ef4444"
                      : "1px solid rgba(255,255,255,0.08)",
                  background:
                    side === "against" ? "rgba(239,68,68,0.1)" : "#1e293b",
                  color: side === "against" ? "#ef4444" : "#94a3b8",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                👎 Argue AGAINST
              </button>
            </div>

            {/* Argument input */}
            <div style={{ marginBottom: "16px" }}>
              <textarea
                value={argument}
                onChange={(e) => setArgument(e.target.value)}
                placeholder="Type your argument here. Be factual, respectful, and clear..."
                rows={5}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Bias Result */}
            {biasResult && (
              <div
                style={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    fontWeight: "600",
                    margin: "0 0 12px",
                  }}
                >
                  🤖 AI Bias Analysis:
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "600",
                      background:
                        biasResult.type === "Fact-Based"
                          ? "rgba(16,185,129,0.15)"
                          : biasResult.type === "Opinion"
                            ? "rgba(59,130,246,0.15)"
                            : biasResult.type === "Emotional"
                              ? "rgba(245,158,11,0.15)"
                              : "rgba(239,68,68,0.15)",
                      color:
                        biasResult.type === "Fact-Based"
                          ? "#10b981"
                          : biasResult.type === "Opinion"
                            ? "#60a5fa"
                            : biasResult.type === "Emotional"
                              ? "#f59e0b"
                              : "#ef4444",
                    }}
                  >
                    {biasResult.type === "Fact-Based"
                      ? "✅"
                      : biasResult.type === "Opinion"
                        ? "💭"
                        : biasResult.type === "Emotional"
                          ? "⚠️"
                          : "🚫"}{" "}
                    {biasResult.type}
                  </span>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      background: "rgba(255,255,255,0.05)",
                      color: "#94a3b8",
                    }}
                  >
                    Quality Score: {biasResult.score}/10
                  </span>
                </div>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    margin: "0 0 8px",
                  }}
                >
                  💡 {biasResult.feedback}
                </p>
                <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                  🔄 Counter-argument: {biasResult.suggestion}
                </p>
              </div>
            )}

            {submitted && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  borderRadius: "10px",
                  color: "#10b981",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                ✅ Argument submitted anonymously!
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={analyzing}
              style={{
                padding: "12px 32px",
                background: analyzing ? "#334155" : "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: analyzing ? "not-allowed" : "pointer",
              }}
            >
              {analyzing ? "Analyzing... 🤖" : "Submit Argument 🗣️"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
