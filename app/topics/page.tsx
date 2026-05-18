"use client";

import { useState } from "react";

const modes = ["Beginner", "Student", "UPSC", "Quick Summary", "Deep Analysis"];

const sampleTopics = [
  "Waqf Amendment Bill",
  "Uniform Civil Code",
  "Article 370",
  "CAA - Citizenship Amendment Act",
  "India-Pakistan Relations",
  "Budget 2025",
  "Supreme Court Verdict on EVMs",
  "UPI New Guidelines",
];

export default function TopicsPage() {
  const [selectedMode, setSelectedMode] = useState("Beginner");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    const topic = customTopic || selectedTopic;
    if (!topic) return;
    setLoading(true);
    setExplanation("");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, mode: selectedMode }),
      });

      const data = await response.json();

      if (data.explanation) {
        setExplanation(data.explanation);
      } else {
        setExplanation(
          "Sorry, could not generate explanation. Please try again.",
        );
      }
    } catch {
      setExplanation("Error connecting to AI. Please try again.");
    } finally {
      setLoading(false);
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
              color: item.href === "/topics" ? "white" : "#94a3b8",
              background:
                item.href === "/topics"
                  ? "rgba(59,130,246,0.15)"
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

      {/* Main Content */}
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
            🤖 AI Topic Explainer
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Choose a topic and explanation style — AI will simplify it for you
          </p>
        </div>

        {/* Mode Selector */}
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "12px" }}
          >
            Select explanation mode:
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border:
                    selectedMode === mode
                      ? "none"
                      : "1px solid rgba(255,255,255,0.1)",
                  background: selectedMode === mode ? "#3b82f6" : "transparent",
                  color: selectedMode === mode ? "white" : "#94a3b8",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Grid */}
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "12px" }}
          >
            Pick a trending topic:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {sampleTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border:
                    selectedTopic === topic
                      ? "1px solid #3b82f6"
                      : "1px solid rgba(255,255,255,0.08)",
                  background:
                    selectedTopic === topic
                      ? "rgba(59,130,246,0.15)"
                      : "#1e293b",
                  color: selectedTopic === topic ? "#60a5fa" : "#94a3b8",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Topic Input */}
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "12px" }}
          >
            Or type your own topic:
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. MGNREGA scheme, One Nation One Election..."
              style={{
                flex: 1,
                padding: "12px 16px",
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              onClick={handleExplain}
              disabled={loading}
              style={{
                padding: "12px 32px",
                background: loading ? "#334155" : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Explaining..." : "Explain ✨"}
            </button>
          </div>
        </div>

        {/* Also explain selected topic button */}
        {selectedTopic && !customTopic && (
          <div style={{ marginBottom: "24px" }}>
            <button
              onClick={handleExplain}
              disabled={loading}
              style={{
                padding: "12px 32px",
                background: loading ? "#334155" : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Explaining..." : `Explain "${selectedTopic}" ✨`}
            </button>
          </div>
        )}

        {/* Explanation Output */}
        {loading && (
          <div
            style={{
              background: "#1e293b",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "16px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#60a5fa",
                fontSize: "24px",
                marginBottom: "12px",
              }}
            >
              🤖
            </div>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              AI is analyzing and simplifying this topic for you...
            </p>
          </div>
        )}

        {explanation && !loading && (
          <div
            style={{
              background: "#1e293b",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "16px",
              padding: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 12px",
                  background: "rgba(59,130,246,0.15)",
                  color: "#60a5fa",
                  borderRadius: "999px",
                }}
              >
                {selectedMode} Mode
              </span>
              <span style={{ color: "#64748b", fontSize: "12px" }}>
                Powered by AI
              </span>
            </div>
            <pre
              style={{
                color: "#e2e8f0",
                fontSize: "14px",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
                fontFamily: "sans-serif",
                margin: 0,
              }}
            >
              {explanation}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
