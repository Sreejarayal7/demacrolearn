import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { argument } = await request.json();

    const prompt = `You are a political debate analyzer. Analyze this debate argument and classify it.

Argument: "${argument}"

Respond in this exact JSON format only, no extra text:
{
  "type": "one of: Fact-Based, Opinion, Emotional, Propaganda, Misleading",
  "score": "number from 1-10 for argument quality",
  "feedback": "one sentence feedback on how to improve",
  "suggestion": "one sentence counter-argument suggestion"
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 256,
    });

    const content = completion.choices[0]?.message?.content || "{}";

    const cleanContent = content.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleanContent);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Bias API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze argument" },
      { status: 500 },
    );
  }
}
