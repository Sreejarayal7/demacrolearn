import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { topic, mode } = await request.json();

    const modePrompts: Record<string, string> = {
      Beginner:
        "Explain in very simple language like explaining to a 10 year old. Use simple words, short sentences, and a real life example.",
      Student:
        "Explain in educational style suitable for a college student. Cover key facts, background, and importance.",
      UPSC: "Explain in detailed analytical style for UPSC exam preparation. Cover background, key provisions, constitutional aspects, pros, cons, and current affairs angle.",
      "Quick Summary":
        "Give a very short 5 point summary in bullet points. Maximum 100 words total.",
      "Deep Analysis":
        "Give a comprehensive analysis covering history, current status, stakeholders, impact on different sections of society, international angle, and future implications.",
    };

    const prompt = `You are an expert on Indian politics and current affairs.
Topic: ${topic}
Explanation Mode: ${mode}
Instructions: ${modePrompts[mode] || modePrompts["Beginner"]}
Format your response with these sections:
- What is it?
- Key Points (3-5 points)
- Pros and Cons
- Simple Example (real life analogy)
- Why it matters to common citizens
Keep the tone neutral, factual, and easy to understand.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const explanation =
      completion.choices[0]?.message?.content ||
      "Could not generate explanation";

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 },
    );
  }
}
