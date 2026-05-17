export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e3a5f, #0f172a)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "rgba(59,130,246,0.15)",
        border: "1px solid rgba(59,130,246,0.3)",
        borderRadius: "999px",
        padding: "6px 16px",
        color: "#60a5fa",
        fontSize: "14px",
        marginBottom: "24px"
      }}>
        AI-Powered Civic Learning Platform for India
      </div>
      <h1 style={{ fontSize: "64px", fontWeight: "bold", color: "white", margin: "0 0 16px" }}>
        Demacro<span style={{ color: "#60a5fa" }}>Learn</span>
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "20px", maxWidth: "600px", marginBottom: "40px" }}>
        Politics explained visually and intelligently for every Indian citizen.
        Understand bills, join debates, track current affairs.
      </p>
      <div style={{ display: "flex", gap: "16px", marginBottom: "80px" }}>
        <button style={{ padding: "12px 32px", background: "#3b82f6", color: "white", border: "none", borderRadius: "999px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
          Get Started Free
        </button>
        <button style={{ padding: "12px 32px", background: "transparent", color: "#94a3b8", border: "1px solid #475569", borderRadius: "999px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
          Sign In
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", maxWidth: "800px" }}>
        {[
          { label: "AI Explainer", icon: "AI", desc: "Topics simplified" },
          { label: "Live Debates", icon: "VS", desc: "Anonymous arguments" },
          { label: "Bills Tracker", icon: "PL", desc: "Parliament live" },
          { label: "Bias Detector", icon: "BD", desc: "Fact vs opinion" },
        ].map((item) => (
          <div key={item.label} style={{
            padding: "24px 16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            color: "#cbd5e1"
          }}>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#60a5fa", marginBottom: "8px" }}>{item.icon}</div>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>{item.label}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
