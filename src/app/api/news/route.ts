import { NextResponse } from "next/server";

const fallbackNews = [
  {
    id: 1,
    title: "Parliament passes key amendment to digital data protection bill",
    summary:
      "The Digital Personal Data Protection Bill was amended to include stronger penalties for data breaches affecting Indian citizens.",
    source: "PIB India",
    url: "#",
    time: "2 hours ago",
    category: "Parliament",
    hot: true,
    bias: "Neutral",
    tags: ["Parliament", "Technology", "Data"],
  },
  {
    id: 2,
    title: "RBI announces new UPI transaction limits for 2025",
    summary:
      "Reserve Bank of India has revised UPI transaction limits, allowing higher value transactions for verified merchants.",
    source: "RBI Press Release",
    url: "#",
    time: "4 hours ago",
    category: "Economy",
    hot: true,
    bias: "Neutral",
    tags: ["RBI", "UPI", "Economy"],
  },
  {
    id: 3,
    title: "Supreme Court issues landmark verdict on electoral bonds",
    summary:
      "The Supreme Court ruled that electoral bonds scheme violated the right to information and ordered full disclosure of donors.",
    source: "Supreme Court of India",
    url: "#",
    time: "6 hours ago",
    category: "Judiciary",
    hot: true,
    bias: "Neutral",
    tags: ["Supreme Court", "Elections", "Transparency"],
  },
  {
    id: 4,
    title: "India GDP growth forecast revised to 7.2% for FY2025",
    summary:
      "IMF revised India's growth forecast upward citing strong domestic consumption and manufacturing sector performance.",
    source: "Ministry of Finance",
    url: "#",
    time: "8 hours ago",
    category: "Economy",
    hot: false,
    bias: "Neutral",
    tags: ["GDP", "Economy", "IMF"],
  },
  {
    id: 5,
    title: "New education policy implementation update across states",
    summary:
      "Ministry of Education releases progress report on NEP 2020 implementation with majority of states completing curriculum overhaul.",
    source: "Ministry of Education",
    url: "#",
    time: "10 hours ago",
    category: "Education",
    hot: false,
    bias: "Neutral",
    tags: ["NEP", "Education", "Policy"],
  },
  {
    id: 6,
    title: "India signs defence agreement with key ally nations",
    summary:
      "India signed bilateral defence cooperation agreements focusing on technology transfer and joint manufacturing.",
    source: "Ministry of Defence",
    url: "#",
    time: "12 hours ago",
    category: "Defence",
    hot: false,
    bias: "Neutral",
    tags: ["Defence", "Foreign Policy", "Military"],
  },
];

export async function GET() {
  try {
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ articles: fallbackNews });
    }

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=india+politics+parliament+government&lang=en&country=in&max=10&apikey=${apiKey}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      console.log("GNews API failed, using fallback news");
      return NextResponse.json({ articles: fallbackNews });
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      return NextResponse.json({ articles: fallbackNews });
    }

    const articles = data.articles.map(
      (
        article: {
          title: string;
          description: string;
          source: { name: string };
          url: string;
          publishedAt: string;
          image: string;
        },
        index: number,
      ) => ({
        id: index + 1,
        title: article.title,
        summary: article.description || "Click to read more",
        source: article.source.name,
        url: article.url,
        time: new Date(article.publishedAt).toLocaleString(),
        category: "Current Affairs",
        hot: index < 3,
        bias: "Neutral",
        tags: ["India", "Politics"],
      }),
    );

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json({ articles: fallbackNews });
  }
}
