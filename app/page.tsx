"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero section on load
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    );

    // Animate cards with stagger
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.5,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a, #1e3a5f, #0f172a)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Animated background circles */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(59,130,246,0.05)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "10%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "rgba(139,92,246,0.05)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div
          ref={heroRef}
          style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}
        >
          {/* Lottie animation */}
          <div
            style={{ width: "120px", height: "120px", margin: "0 auto 24px" }}
          >
            <Player
              autoplay
              loop
              src="https://assets5.lottiefiles.com/packages/lf20_fcfjwiyb.json"
              style={{ width: "120px", height: "120px" }}
            />
          </div>

          <div
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "999px",
              padding: "6px 16px",
              color: "#60a5fa",
              fontSize: "14px",
              marginBottom: "24px",
              display: "inline-block",
            }}
          >
            🇮🇳 AI-Powered Civic Learning Platform for India
          </div>

          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              margin: "0 0 16px",
              lineHeight: "1.1",
            }}
          >
            Demacro<span style={{ color: "#60a5fa" }}>Learn</span>
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              maxWidth: "600px",
              marginBottom: "40px",
              margin: "0 auto 40px",
            }}
          >
            Politics explained visually and intelligently for every Indian
            citizen. Understand bills, join debates, track current affairs.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "80px",
              justifyContent: "center",
            }}
          >
            <a href="/dashboard" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "14px 36px",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                }}
              >
                Get Started Free →
              </button>
            </a>
            <a href="/topics" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "14px 36px",
                  background: "transparent",
                  color: "#94a3b8",
                  border: "1px solid #475569",
                  borderRadius: "999px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Try AI Explainer
              </button>
            </a>
          </div>

          {/* Feature cards */}
          <div
            ref={cardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {[
              {
                label: "AI Explainer",
                icon: "🤖",
                desc: "5 explanation modes",
                href: "/topics",
              },
              {
                label: "Live Debates",
                icon: "⚖️",
                desc: "Anonymous arguments",
                href: "/debates",
              },
              {
                label: "Bills Tracker",
                icon: "📜",
                desc: "Parliament live",
                href: "/bills",
              },
              {
                label: "Bias Detector",
                icon: "🎯",
                desc: "Fact vs opinion",
                href: "/feed",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ textDecoration: "none" }}
                className="feature-card"
              >
                <div
                  style={{
                    padding: "24px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    color: "#cbd5e1",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(59,130,246,0.1)";
                    (e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(59,130,246,0.3)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-4px)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "4px",
                      color: "white",
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {item.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            {[
              { value: "10K+", label: "Active Users" },
              { value: "500+", label: "Topics Explained" },
              { value: "50K+", label: "Debate Arguments" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#60a5fa",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
