import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      background: "transparent",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "#3b82f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 700,
        }}>DL</div>
        <span style={{ color: "white", fontWeight: 700 }}>DemacroLearn</span>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#cbd5e1",
          padding: "8px 14px",
          borderRadius: 999,
          cursor: "pointer",
        }}>Docs</button>
        <button style={{
          background: "#3b82f6",
          border: "none",
          color: "white",
          padding: "8px 14px",
          borderRadius: 999,
          cursor: "pointer",
        }}>Sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;

