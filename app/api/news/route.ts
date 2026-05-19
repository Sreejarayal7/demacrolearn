import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GNEWS_API_KEY;

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=india+politics+parliament&lang=en&country=in&max=10&apikey=${apiKey}`,
      { next: { revalidate: 3600 } },
    );

    const data = await response.json();

    if (!data.articles) {
      return NextResponse.json({ error: "No articles found" }, { status: 404 });
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
        image: article.image,
        category: "Current Affairs",
        hot: index < 3,
        bias: "Neutral",
        tags: ["India", "Politics"],
      }),
    );

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
