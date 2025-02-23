import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

function NewsBoard({ category }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch news`);
        }

        const data = await response.json();
        setArticles(data.articles || []); // Ensure it's always an array
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center" style={{ fontSize: "50px" }}>
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {error && <p className="text-center text-danger">{error}</p>}

      {articles.length === 0 && !error ? (
        <p className="text-center">Loading news...</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title || "No Title Available"}
            description={news.description || "No Description Available"}
            src={news.urlToImage || "default-image.jpg"} // Provide a fallback image
            url={news.url}
          />
        ))
      )}
    </div>
  );
}

export default NewsBoard;
