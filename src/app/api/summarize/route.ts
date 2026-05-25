import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    const prompt = `You are an Indian news summarizer for common citizens.

News Title: ${title}
News Content: ${content}

Give a response in this exact format:
🎯 In One Line: (one sentence summary)

📌 What Happened: (2-3 sentences explaining the news simply)

👥 Who is Affected: (which citizens/groups are affected)

💡 Why It Matters: (why should common people care)

⚡ Key Takeaway: (one actionable insight)

Keep it simple, neutral, and under 150 words total.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 512,
    });

    const summary =
      completion.choices[0]?.message?.content || "Could not summarize";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarize API error:", error);
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
