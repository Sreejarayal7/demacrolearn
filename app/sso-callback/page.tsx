"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>🔄</div>
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>
          Completing sign in...
        </p>
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}
