"use client";
export default function Dashboard() {
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
            href={item.href}
            key={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#94a3b8",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#94a3b8";
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "240px",
          flex: 1,
          padding: "32px",
        }}
      >
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
              Good morning! 👋
            </h1>
            <p
              style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0" }}
            >
              Here&#39;s what&#39;s happening in India today
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
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
              🔥 7 day streak
            </div>
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
              }}
            >
              U
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {[
            { label: "Topics Learned", value: "12", color: "#3b82f6" },
            { label: "Debates Joined", value: "5", color: "#8b5cf6" },
            { label: "Credibility Score", value: "340", color: "#10b981" },
            { label: "Badges Earned", value: "3", color: "#f59e0b" },
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
                style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}
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
            🔥 Trending Topics
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
              <div
                key={topic.title}
                style={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
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
          </div>
        </div>
      </main>
    </div>
  );
}
