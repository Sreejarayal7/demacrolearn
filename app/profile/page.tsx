"use client";

import { useState } from "react";

const userStats = {
  name: "Sreeja Rayal",
  username: "@sreejarayal7",
  city: "Vijayawada, AP",
  joinedDate: "May 2026",
  credibilityScore: 340,
  rank: 42,
  streak: 7,
  topicsLearned: 12,
  debatesJoined: 5,
  argumentsPosted: 18,
  badgesEarned: 3,
};

const earnedBadges = [
  { icon: "📚", name: "Civic Learner", desc: "Completed 10+ explainers" },
  { icon: "🔥", name: "7 Day Streak", desc: "Active 7 days in a row" },
  { icon: "🎯", name: "Fact Checker", desc: "3 fact-based arguments" },
];

const recentActivity = [
  {
    type: "topic",
    text: "Learned about Waqf Amendment Bill",
    time: "2h ago",
    icon: "🤖",
  },
  {
    type: "debate",
    text: "Argued FOR Uniform Civil Code",
    time: "5h ago",
    icon: "⚖️",
  },
  {
    type: "badge",
    text: "Earned 7 Day Streak badge",
    time: "1d ago",
    icon: "🔥",
  },
  {
    type: "topic",
    text: "Learned about Article 370",
    time: "1d ago",
    icon: "🤖",
  },
  {
    type: "debate",
    text: "Argued AGAINST Chinese app ban",
    time: "2d ago",
    icon: "⚖️",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

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
              color: item.href === "/profile" ? "white" : "#94a3b8",
              background:
                item.href === "/profile"
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

      {/* Main */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "32px" }}>
        {/* Profile header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b, #1e1b4b)",
            border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "28px",
              flexShrink: 0,
            }}
          >
            S
          </div>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 4px",
              }}
            >
              {userStats.name}
            </h1>
            <p
              style={{ color: "#64748b", fontSize: "14px", margin: "0 0 12px" }}
            >
              {userStats.username} • {userStats.city} • Joined{" "}
              {userStats.joinedDate}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "4px 12px",
                  background: "rgba(59,130,246,0.15)",
                  color: "#60a5fa",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                🏆 Rank #{userStats.rank}
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  background: "rgba(239,68,68,0.15)",
                  color: "#f87171",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                🔥 {userStats.streak} day streak
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  background: "rgba(16,185,129,0.15)",
                  color: "#10b981",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                ⭐ {userStats.credibilityScore} credibility
              </span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            {
              label: "Topics Learned",
              value: userStats.topicsLearned,
              color: "#3b82f6",
              icon: "🤖",
            },
            {
              label: "Debates Joined",
              value: userStats.debatesJoined,
              color: "#8b5cf6",
              icon: "⚖️",
            },
            {
              label: "Arguments Posted",
              value: userStats.argumentsPosted,
              color: "#10b981",
              icon: "💬",
            },
            {
              label: "Badges Earned",
              value: userStats.badgesEarned,
              color: "#f59e0b",
              icon: "🎖️",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["overview", "badges", "activity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                border:
                  activeTab === tab
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                background: activeTab === tab ? "#3b82f6" : "transparent",
                color: activeTab === tab ? "white" : "#94a3b8",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {tab === "overview"
                ? "📊 Overview"
                : tab === "badges"
                  ? "🎖️ Badges"
                  : "📋 Activity"}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
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
                margin: "0 0 20px",
              }}
            >
              Credibility Score Breakdown
            </h3>
            {[
              { label: "Fact-based arguments", value: 75, color: "#10b981" },
              { label: "Debate participation", value: 60, color: "#3b82f6" },
              { label: "Topic completion", value: 85, color: "#8b5cf6" },
              { label: "Community rating", value: 70, color: "#f59e0b" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: item.color,
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {item.value}%
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
                      width: `${item.value}%`,
                      background: item.color,
                      borderRadius: "999px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Badges tab */}
        {activeTab === "badges" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {earnedBadges.map((badge) => (
              <div
                key={badge.name}
                style={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>
                  {badge.icon}
                </div>
                <p
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                    margin: "0 0 6px",
                  }}
                >
                  {badge.name}
                </p>
                <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Activity tab */}
        {activeTab === "activity" && (
          <div style={{ display: "grid", gap: "12px" }}>
            {recentActivity.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div style={{ fontSize: "24px" }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "white", fontSize: "14px", margin: 0 }}>
                    {item.text}
                  </p>
                </div>
                <span
                  style={{
                    color: "#475569",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
