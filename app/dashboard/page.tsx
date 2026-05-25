"use client";
export const dynamic = "force-dynamic";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [timeOfDay, setTimeOfDay] = useState("morning");

  useEffect(() => {
    const hour = new Date().getHours();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 17) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  if (!isLoaded) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <p style={{ color: "#64748b", fontFamily: "sans-serif" }}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const firstName =
    user?.firstName ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "Citizen";

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
          overflowY: "auto",
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
              color: item.href === "/dashboard" ? "white" : "#94a3b8",
              background:
                item.href === "/dashboard"
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

        {/* Sign out button */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <a
            href="/sign-in"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#ef4444",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "32px" }}>
        {/* Header */}
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
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Good {timeOfDay}, {firstName}! 👋
            </h1>
            <p
              style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0" }}
            >
              Here&apos;s what&apos;s happening in India today
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "8px 16px",
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: "999px",
                color: "#60a5fa",
                fontSize: "13px",
              }}
            >
              🆕 New member
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Welcome card for new users */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b, #1e1b4b)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 12px",
            }}
          >
            🎉 Welcome to DemacroLearn!
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              margin: "0 0 20px",
              lineHeight: "1.6",
            }}
          >
            You&apos;re now part of India&apos;s smartest civic learning
            platform. Start your journey by exploring AI-explained topics,
            joining debates, or tracking Parliament bills.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            {[
              {
                label: "Learn a topic",
                icon: "🤖",
                href: "/topics",
                color: "#3b82f6",
                desc: "Start with AI Explainer",
              },
              {
                label: "Join a debate",
                icon: "⚖️",
                href: "/debates",
                color: "#8b5cf6",
                desc: "Share your opinion",
              },
              {
                label: "Read the news",
                icon: "📰",
                href: "/feed",
                color: "#10b981",
                desc: "Stay updated",
              },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.1)")
                  }
                  onMouseOut={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.05)")
                  }
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                    {action.icon}
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    {action.label}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>
                    {action.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Stats — all zero for new users */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {[
            {
              label: "Topics Learned",
              value: "0",
              color: "#3b82f6",
              icon: "🤖",
            },
            {
              label: "Debates Joined",
              value: "0",
              color: "#8b5cf6",
              icon: "⚖️",
            },
            {
              label: "Credibility Score",
              value: "0",
              color: "#10b981",
              icon: "⭐",
            },
            {
              label: "Badges Earned",
              value: "0",
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
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>
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

        {/* Trending Topics */}
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            🔥 Trending Topics Today
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {[
              {
                title: "Waqf Amendment Bill",
                category: "Parliament",
                time: "2h ago",
                hot: true,
              },
              {
                title: "India-Pakistan Relations",
                category: "Foreign Policy",
                time: "4h ago",
                hot: true,
              },
              {
                title: "UPI New Guidelines",
                category: "Economy",
                time: "6h ago",
                hot: false,
              },
              {
                title: "Election Commission Rules",
                category: "Elections",
                time: "8h ago",
                hot: false,
              },
              {
                title: "Supreme Court Verdict",
                category: "Judiciary",
                time: "10h ago",
                hot: false,
              },
              {
                title: "Budget 2025 Analysis",
                category: "Economy",
                time: "12h ago",
                hot: false,
              },
            ].map((topic) => (
              <a
                key={topic.title}
                href="/topics"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) =>
                    ((e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(59,130,246,0.3)")
                  }
                  onMouseOut={(e) =>
                    ((e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(255,255,255,0.08)")
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
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
                      {topic.category}
                    </span>
                    {topic.hot && <span style={{ fontSize: "12px" }}>🔥</span>}
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    {topic.title}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>
                    {topic.time}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Debate of the Day */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b, #1e1b4b)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#8b5cf6",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            ⚖️ DEBATE OF THE DAY
          </div>
          <h3
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Should India have a Uniform Civil Code?
          </h3>
          <p
            style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}
          >
            Join 1,247 citizens discussing India&apos;s most debated legal
            reform
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href="/debates" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 24px",
                  background: "#8b5cf6",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Join Debate
              </button>
            </a>
            <a href="/topics" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 24px",
                  background: "transparent",
                  color: "#94a3b8",
                  border: "1px solid #475569",
                  borderRadius: "999px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Learn First
              </button>
            </a>
          </div>
        </div>

        {/* Getting started checklist */}
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
            ✅ Getting Started Checklist
          </h3>
          {[
            { task: "Create your account", done: true, href: "#" },
            {
              task: "Learn your first topic with AI",
              done: false,
              href: "/topics",
            },
            { task: "Join your first debate", done: false, href: "/debates" },
            {
              task: "Read today's current affairs",
              done: false,
              href: "/feed",
            },
            { task: "Check Parliament bills", done: false, href: "/bills" },
            { task: "Complete your profile", done: false, href: "/profile" },
          ].map((item) => (
            <a
              key={item.task}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: item.done
                      ? "#10b981"
                      : "rgba(255,255,255,0.05)",
                    border: item.done
                      ? "none"
                      : "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.done && (
                    <span style={{ color: "white", fontSize: "11px" }}>✓</span>
                  )}
                </div>
                <span
                  style={{
                    color: item.done ? "#64748b" : "white",
                    fontSize: "14px",
                    textDecoration: item.done ? "line-through" : "none",
                  }}
                >
                  {item.task}
                </span>
                {!item.done && (
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "#60a5fa",
                      fontSize: "12px",
                    }}
                  >
                    Start →
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
