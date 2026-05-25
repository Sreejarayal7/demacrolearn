import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DemacroLearn - Politics Explained Simply",
  description: "AI-powered civic learning and debate platform for India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
