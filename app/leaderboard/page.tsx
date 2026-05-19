"use client";

import { useState } from "react";

const users = [
  {
    rank: 1,
    name: "Arjun Sharma",
    city: "Delhi",
    score: 2840,
    debates: 45,
    topics: 89,
    badges: ["🏆", "🎯", "🔥", "⭐"],
    streak: 23,
  },
  {
    rank: 2,
    name: "Priya Nair",
    city: "Kochi",
    score: 2650,
    debates: 38,
    topics: 76,
    badges: ["🥈", "🎯", "📚"],
    streak: 18,
  },
  {
    rank: 3,
    name: "Rahul Verma",
    city: "Mumbai",
    score: 2410,
    debates: 31,
    topics: 65,
    badges: ["🥉", "⚖️", "🔥"],
    streak: 15,
  },
  {
    rank: 4,
    name: "Sneha Reddy",
    city: "Hyderabad",
    score: 2180,
    debates: 28,
    topics: 54,
    badges: ["🎯", "📚"],
    streak: 12,
  },
  {
    rank: 5,
    name: "Vikram Singh",
    city: "Jaipur",
    score: 1950,
    debates: 24,
    topics: 48,
    badges: ["⚖️", "🔥"],
    streak: 9,
  },
  {
    rank: 6,
    name: "Ananya Das",
    city: "Kolkata",
    score: 1820,
    debates: 21,
    topics: 43,
    badges: ["📚", "⭐"],
    streak: 7,
  },
  {
    rank: 7,
    name: "Karthik Iyer",
    city: "Chennai",
    score: 1690,
    debates: 18,
    topics: 39,
    badges: ["🎯"],
    streak: 6,
  },
  {
    rank: 8,
    name: "Meera Patel",
    city: "Ahmedabad",
    score: 1540,
    debates: 15,
    topics: 34,
    badges: ["📚"],
    streak: 5,
  },
  {
    rank: 9,
    name: "Rohit Kumar",
    city: "Patna",
    score: 1380,
    debates: 12,
    topics: 28,
    badges: ["⭐"],
    streak: 4,
  },
  {
    rank: 10,
    name: "Divya Menon",
    city: "Bangalore",
    score: 1240,
    debates: 10,
    topics: 24,
    badges: ["🔥"],
    streak: 3,
  },
];

const allBadges = [
  {
    icon: "🏆",
    name: "Civic Champion",
    desc: "Top 1% on platform",
    color: "#f59e0b",
  },
  {
    icon: "🎯",
    name: "Fact Checker",
    desc: "10+ fact-based arguments",
    color: "#10b981",
  },
  {
    icon: "🔥",
    name: "Debate Master",
    desc: "30+ day streak",
    color: "#ef4444",
  },
  {
    icon: "📚",
    name: "Civic Learner",
    desc: "50+ topics learned",
    color: "#3b82f6",
  },
  {
    icon: "⚖️",
    name: "Neutral Voice",
    desc: "Always unbiased arguments",
    color: "#8b5cf6",
  },
  {
    icon: "⭐",
    name: "Rising Star",
    desc: "Top gainer this week",
    color: "#f59e0b",
  },
  {
    icon: "🥇",
    name: "Gold Debater",
    desc: "Won 20+ debates",
    color: "#f59e0b",
  },
  {
    icon: "🌍",
    name: "Policy Expert",
    desc: "Deep analysis on 5 bills",
    color: "#10b981",
  },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("leaderboard");

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
              color: item.href === "/leaderboard" ? "white" : "#94a3b8",
              background:
                item.href === "/leaderboard"
                  ? "rgba(245,158,11,0.15)"
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
            🏆 Leaderboard
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Top civic learners and debaters in India
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {["leaderboard", "badges"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 24px",
                borderRadius: "999px",
                border:
                  activeTab === tab
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                background: activeTab === tab ? "#f59e0b" : "transparent",
                color: activeTab === tab ? "#0f172a" : "#94a3b8",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {tab === "leaderboard" ? "🏆 Rankings" : "🎖️ All Badges"}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        {activeTab === "leaderboard" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {[users[1], users[0], users[2]].map((user, i) => (
                <div
                  key={user.rank}
                  style={{
                    background:
                      i === 1
                        ? "linear-gradient(135deg, #1e293b, #1e1b4b)"
                        : "#1e293b",
                    border:
                      i === 1
                        ? "1px solid rgba(245,158,11,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "24px",
                    textAlign: "center",
                    marginTop: i === 1 ? "0" : "24px",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                    {i === 0 ? "🥈" : i === 1 ? "🥇" : "🥉"}
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: i === 1 ? "#f59e0b" : "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                      margin: "0 auto 12px",
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      margin: "0 0 4px",
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                      margin: "0 0 8px",
                    }}
                  >
                    {user.city}
                  </p>
                  <p
                    style={{
                      color: i === 1 ? "#f59e0b" : "#60a5fa",
                      fontWeight: "bold",
                      fontSize: "18px",
                      margin: "0 0 8px",
                    }}
                  >
                    {user.score.toLocaleString()}
                  </p>
                  <div style={{ fontSize: "16px" }}>
                    {user.badges.slice(0, 3).join(" ")}
                  </div>
                </div>
              ))}
            </div>

            {/* Full rankings */}
            <div style={{ display: "grid", gap: "8px" }}>
              {users.map((user) => (
                <div
                  key={user.rank}
                  style={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: user.rank <= 3 ? "#f59e0b" : "#64748b",
                      fontSize: user.rank <= 3 ? "18px" : "14px",
                    }}
                  >
                    {user.rank <= 3
                      ? ["🥇", "🥈", "🥉"][user.rank - 1]
                      : `#${user.rank}`}
                  </span>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px",
                        margin: "0 0 2px",
                      }}
                    >
                      {user.name}
                    </p>
                    <p
                      style={{ color: "#64748b", fontSize: "12px", margin: 0 }}
                    >
                      {user.city} • 🔥 {user.streak} day streak
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          color: "#60a5fa",
                          fontSize: "13px",
                          fontWeight: "600",
                          margin: 0,
                        }}
                      >
                        {user.debates}
                      </p>
                      <p
                        style={{
                          color: "#475569",
                          fontSize: "11px",
                          margin: 0,
                        }}
                      >
                        debates
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          color: "#10b981",
                          fontSize: "13px",
                          fontWeight: "600",
                          margin: 0,
                        }}
                      >
                        {user.topics}
                      </p>
                      <p
                        style={{
                          color: "#475569",
                          fontSize: "11px",
                          margin: 0,
                        }}
                      >
                        topics
                      </p>
                    </div>
                    <div style={{ textAlign: "center", minWidth: "60px" }}>
                      <p
                        style={{
                          color: "#f59e0b",
                          fontSize: "16px",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        {user.score.toLocaleString()}
                      </p>
                      <p
                        style={{
                          color: "#475569",
                          fontSize: "11px",
                          margin: 0,
                        }}
                      >
                        points
                      </p>
                    </div>
                    <div style={{ fontSize: "16px" }}>
                      {user.badges.slice(0, 2).join(" ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Badges tab */}
        {activeTab === "badges" && (
          <div>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              Earn badges by participating in debates, learning topics, and
              maintaining streaks
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
            >
              {allBadges.map((badge) => (
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
          </div>
        )}
      </main>
    </div>
  );
}
