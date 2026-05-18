"use client";

import { useState } from "react";

const bills = [
  {
    id: 1,
    title: "Waqf Amendment Bill 2024",
    ministry: "Ministry of Minority Affairs",
    status: "passed",
    introducedDate: "Aug 2024",
    passedDate: "Apr 2025",
    description: "Amends the Waqf Act 1995 to improve governance of Waqf properties across India.",
    impact: "Affects 8.7 lakh Waqf properties worth ₹1.2 lakh crore",
    supporters: ["BJP", "NDA allies"],
    opposers: ["Congress", "SP", "TMC"],
    category: "Religious"
  },
  {
    id: 2,
    title: "Digital India Act 2024",
    ministry: "Ministry of Electronics & IT",
    status: "inprogress",
    introducedDate: "Jan 2025",
    passedDate: null,
    description: "Replaces the IT Act 2000 with modern regulations for digital platforms and AI.",
    impact: "Affects all internet users, tech companies, social media platforms",
    supporters: ["BJP", "Tech industry"],
    opposers: ["Civil society groups"],
    category: "Technology"
  },
  {
    id: 3,
    title: "Uniform Civil Code Bill",
    ministry: "Ministry of Law & Justice",
    status: "pending",
    introducedDate: "Not yet introduced",
    passedDate: null,
    description: "Proposes a common set of laws for all citizens regardless of religion.",
    impact: "Affects personal laws of all religious communities in India",
    supporters: ["BJP"],
    opposers: ["Congress", "Muslim bodies", "Regional parties"],
    category: "Law"
  },
  {
    id: 4,
    title: "One Nation One Election Bill",
    ministry: "Ministry of Law & Justice",
    status: "inprogress",
    introducedDate: "Dec 2024",
    passedDate: null,
    description: "Proposes simultaneous elections for Lok Sabha and all State Assemblies.",
    impact: "Saves ₹4500 crore in election costs, reduces policy paralysis",
    supporters: ["BJP", "Some regional parties"],
    opposers: ["Congress", "TMC", "AAP"],
    category: "Elections"
  },
  {
    id: 5,
    title: "Women Reservation Act 2023",
    ministry: "Ministry of Law & Justice",
    status: "passed",
    introducedDate: "Sep 2023",
    passedDate: "Sep 2023",
    description: "Reserves 33% seats for women in Lok Sabha and State Assemblies.",
    impact: "Will add 181 women MPs to Parliament when implemented",
    supporters: ["All parties"],
    opposers: ["None officially"],
    category: "Social"
  },
  {
    id: 6,
    title: "Forest Conservation Amendment 2023",
    ministry: "Ministry of Environment",
    status: "passed",
    introducedDate: "Mar 2023",
    passedDate: "Aug 2023",
    description: "Amends forest conservation rules to allow development near border areas.",
    impact: "Opens 28 lakh hectares of forest land for development",
    supporters: ["BJP", "Industry"],
    opposers: ["Environmental groups", "Opposition"],
    category: "Environment"
  },
];

const statusConfig = {
  passed: { label: "Passed ✅", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  inprogress: { label: "In Progress 🔄", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  pending: { label: "Pending ⏳", color: "#64748b", bg: "rgba(100,116,139,0.1)" },
};

export default function BillsPage() {
  const [selectedBill, setSelectedBill] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? bills
    : bills.filter(b => b.status === filter);

  const bill = bills.find(b => b.id === selectedBill);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      fontFamily: "sans-serif",
      display: "flex"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: "240px",
        background: "#1e293b",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        position: "fixed",
        height: "100vh"
      }}>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "white", marginBottom: "32px", padding: "0 8px" }}>
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
          <a key={item.label} href={item.href} style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "8px",
            color: item.href === "/bills" ? "white" : "#94a3b8",
            background: item.href === "/bills" ? "rgba(16,185,129,0.15)" : "transparent",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </aside>

      {/* Main */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "32px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: "bold", margin: "0 0 8px" }}>
            📜 Parliament Bills Tracker
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Track every bill in Indian Parliament — simplified for you
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "32px"
        }}>
          {[
            { label: "Passed Bills", value: bills.filter(b => b.status === "passed").length, color: "#10b981" },
            { label: "In Progress", value: bills.filter(b => b.status === "inprogress").length, color: "#f59e0b" },
            { label: "Pending", value: bills.filter(b => b.status === "pending").length, color: "#64748b" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["all", "passed", "inprogress", "pending"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 20px",
              borderRadius: "999px",
              border: filter === f ? "none" : "1px solid rgba(255,255,255,0.1)",
              background: filter === f ? "#3b82f6" : "transparent",
              color: filter === f ? "white" : "#94a3b8",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              textTransform: "capitalize"
            }}>
              {f === "all" ? "All Bills" : f === "inprogress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Bill detail view */}
        {selectedBill && bill && (
          <div style={{
            background: "#1e293b",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "24px"
          }}>
            <button onClick={() => setSelectedBill(null)} style={{
              marginBottom: "20px",
              padding: "6px 14px",
              background: "transparent",
              color: "#94a3b8",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px"
            }}>
              ← Back to all bills
            </button>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <h2 style={{ color: "white", fontSize: "22px", fontWeight: "bold", margin: 0, flex: 1 }}>
                {bill.title}
              </h2>
              <span style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "600",
                color: statusConfig[bill.status as keyof typeof statusConfig].color,
                background: statusConfig[bill.status as keyof typeof statusConfig].bg,
                marginLeft: "16px",
                whiteSpace: "nowrap"
              }}>
                {statusConfig[bill.status as keyof typeof statusConfig].label}
              </span>
            </div>

            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px", lineHeight: "1.7" }}>
              {bill.description}
            </p>

            <div style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "20px"
            }}>
              <p style={{ color: "#60a5fa", fontSize: "13px", fontWeight: "600", margin: "0 0 4px" }}>
                💥 Impact
              </p>
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
                {bill.impact}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "10px",
                padding: "16px"
              }}>
                <p style={{ color: "#10b981", fontSize: "13px", fontWeight: "600", margin: "0 0 8px" }}>
                  👍 Supporters
                </p>
                {bill.supporters.map(s => (
                  <span key={s} style={{
                    display: "inline-block",
                    padding: "2px 10px",
                    background: "rgba(16,185,129,0.15)",
                    color: "#10b981",
                    borderRadius: "999px",
                    fontSize: "12px",
                    margin: "2px"
                  }}>{s}</span>
                ))}
              </div>
              <div style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "10px",
                padding: "16px"
              }}>
                <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: "600", margin: "0 0 8px" }}>
                  👎 Opposers
                </p>
                {bill.opposers.map(o => (
                  <span key={o} style={{
                    display: "inline-block",
                    padding: "2px 10px",
                    background: "rgba(239,68,68,0.15)",
                    color: "#ef4444",
                    borderRadius: "999px",
                    fontSize: "12px",
                    margin: "2px"
                  }}>{o}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{
                padding: "10px 24px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer"
              }}>
                🤖 Explain with AI
              </button>
              <button style={{
                padding: "10px 24px",
                background: "transparent",
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px",
                fontSize: "13px",
                cursor: "pointer"
              }}>
                ⚖️ Join Debate
              </button>
            </div>
          </div>
        )}

        {/* Bills list */}
        {!selectedBill && (
          <div style={{ display: "grid", gap: "16px" }}>
            {filtered.map((bill) => (
              <div key={bill.id} style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer"
              }} onClick={() => setSelectedBill(bill.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        background: "rgba(59,130,246,0.15)",
                        color: "#60a5fa",
                        borderRadius: "999px"
                      }}>{bill.category}</span>
                      <span style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        color: statusConfig[bill.status as keyof typeof statusConfig].color,
                        background: statusConfig[bill.status as keyof typeof statusConfig].bg
                      }}>
                        {statusConfig[bill.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    <h3 style={{ color: "white", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
                      {bill.title}
                    </h3>
                    <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 8px" }}>
                      {bill.description}
                    </p>
                    <p style={{ color: "#475569", fontSize: "12px", margin: 0 }}>
                      {bill.ministry} • Introduced: {bill.introducedDate}
                    </p>
                  </div>
                  <div style={{
                    marginLeft: "24px",
                    color: "#60a5fa",
                    fontSize: "20px"
                  }}>→</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}