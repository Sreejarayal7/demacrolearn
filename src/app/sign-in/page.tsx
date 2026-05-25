"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "white",
            margin: "0 0 8px",
          }}
        >
          Demacro<span style={{ color: "#60a5fa" }}>Learn</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px", margin: 0 }}>
          India&apos;s AI Civic Learning Platform
        </p>
      </div>

      <SignIn
        routing="hash"
        forceRedirectUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#3b82f6",
            colorBackground: "#1e293b",
            colorText: "#ffffff",
            colorTextSecondary: "#94a3b8",
            colorInputBackground: "#0f172a",
            colorInputText: "#ffffff",
            borderRadius: "12px",
            fontSize: "15px",
          },
          elements: {
            card: {
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              padding: "32px",
              minWidth: "400px",
            },
            headerTitle: {
              color: "white",
              fontSize: "22px",
              fontWeight: "700",
            },
            headerSubtitle: {
              color: "#94a3b8",
              fontSize: "14px",
            },
            formFieldLabel: {
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: "500",
            },
            formFieldInput: {
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "10px",
              fontSize: "15px",
              padding: "12px 16px",
            },
            formButtonPrimary: {
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "600",
              padding: "13px",
              border: "none",
            },
            socialButtonsBlockButton: {
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "10px",
              fontSize: "14px",
            },
            socialButtonsBlockButtonText: {
              color: "white",
              fontWeight: "500",
            },
            dividerLine: {
              background: "rgba(255,255,255,0.08)",
            },
            dividerText: {
              color: "#475569",
            },
            footerActionText: {
              color: "#64748b",
              fontSize: "14px",
            },
            footerActionLink: {
              color: "#60a5fa",
              fontWeight: "600",
            },
            identityPreviewText: {
              color: "white",
            },
            identityPreviewEditButton: {
              color: "#60a5fa",
            },
            formFieldSuccessText: {
              color: "#10b981",
            },
            formFieldErrorText: {
              color: "#ef4444",
            },
            alertText: {
              color: "#ef4444",
            },
          },
        }}
      />
    </div>
  );
}
