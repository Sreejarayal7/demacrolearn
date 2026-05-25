import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    const { claim } = await request.json();

    const prompt = `You are an expert Indian fact-checker with deep knowledge of Indian politics, history, science, and current affairs.

Claim to fact-check: "${claim}"

Analyze this claim carefully and respond in this EXACT JSON format only:
{
  "rating": "one of: TRUE, FALSE, PARTIAL, MISLEADING, UNVERIFIED",
  "confidence": 85,
  "explanation": "detailed 3-4 sentence explanation of why this is true/false/misleading",
  "facts": [
    "specific verifiable fact 1",
    "specific verifiable fact 2",
    "specific verifiable fact 3"
  ],
  "sources": [
    "Source 1 where this can be verified",
    "Source 2",
    "Source 3"
  ]
}

Rating guide:
- TRUE: Claim is accurate and verified
- FALSE: Claim is factually incorrect
- PARTIAL: Some parts true, some false
- MISLEADING: Technically true but presented in misleading way
- UNVERIFIED: Cannot be verified with available information`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 1024,
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const clean = content.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Fact check error:", error);
    return NextResponse.json(
      { error: "Failed to fact check" },
      { status: 500 },
    );
  }
}
