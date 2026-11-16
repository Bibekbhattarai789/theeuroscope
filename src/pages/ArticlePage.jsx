
import { Link, useParams } from "react-router-dom";
import articles from "../data/articles";
import Seo from "../components/Seo";
import ArticleCard from "../components/ArticleCard";

function formatDate(date) {
  if (!date) return null;

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getRelatedArticles(article) {
  const sourceText = `${article.title || ""} ${article.description || ""}`
    .toLowerCase();

  const keywords = [
    "gaming", "gta", "game", "esports", "streaming", "pubg",
    "europe", "european", "eu", "football", "sports",
    "nvidia", "technology", "career", "job", "travel",
    "tourism", "migration", "student", "university"
  ];

  const relevantKeywords = keywords.filter((word) =>
    sourceText.includes(word)
  );

  return articles
    .filter((item) => item.slug !== article.slug)
    .map((item) => {
      const text = `${item.title || ""} ${item.description || ""}`
        .toLowerCase();

      let score = 0;

      if (item.category === article.category) {
        score += 3;
      }

      relevantKeywords.forEach((word) => {
        if (text.includes(word)) {
          score += 2;
        }
      });

      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((result) => result.item);
}

function ArticlePage() {
  const { slug } = useParams();

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <main className="reading">
        <Seo
          title="Article Not Found"
          description="The requested EuroScope article could not be found."
          noindex
        />

        <Link className="back-link" to="/#articles">
          ← Back to EuroScope
        </Link>

        <h1>Article not found</h1>

        <p className="intro">
          Sorry, we couldn't find that article. It may have been
          moved or the link may be incorrect.
        </p>

        <Link className="primary-button" to="/#articles">
          Explore articles →
        </Link>
      </main>
    );
  }

  const relatedArticles = getRelatedArticles(article);

  const author = article.author || "EuroScope Editorial Team";
  const publishedDate = formatDate(article.publishedAt);
  const updatedDate = formatDate(article.updatedAt);

  return (
    <main className="reading article-reading">
      <Seo
        title={article.title}
        description={article.description}
        article={article}
      />

      <Link className="back-link" to="/#articles">
        ← Back to all articles
      </Link>

      <div className="article-meta">
        <span className="category">{article.category}</span>

        {article.readTime && (
          <span>{article.readTime}</span>
        )}
      </div>

      <h1>{article.title}</h1>

      <p className="intro">{article.description}</p>

      <div className="byline">
        Written by <strong>{author}</strong>

        {publishedDate && (
          <span>
            {" "}· Published{" "}
            <time dateTime={article.publishedAt}>
              {publishedDate}
            </time>
          </span>
        )}

        {updatedDate && updatedDate !== publishedDate && (
          <span>
            {" "}· Updated{" "}
            <time dateTime={article.updatedAt}>
              {updatedDate}
            </time>
          </span>
        )}
      </div>

      {article.image && (
        <figure className="article-featured-image">
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            fetchPriority="high"
          />
        </figure>
      )}

      <div className="article-body">
        {(article.sections || []).map((section, index) => (
          <section key={`${article.slug}-${index}`}>
            {section.heading && (
              <h2>{section.heading}</h2>
            )}

            {Array.isArray(section.paragraphs) ? (
              section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))
            ) : section.body ? (
              <p>{section.body}</p>
            ) : null}
          </section>
        ))}
      </div>

      {relatedArticles.length > 0 && (
        <section className="article-end">
          <p className="eyebrow">Related reading</p>

          <h2>Continue exploring EuroScope</h2>

          <p>
            Explore more articles and guides connected to this topic.
          </p>

          <div className="articles-grid">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard
                key={relatedArticle.slug}
                article={relatedArticle}
              />
            ))}
          </div>

          <Link className="primary-button" to="/#articles">
            Explore all articles →
          </Link>
        </section>
      )}
    </main>
  );
}

export default ArticlePage;
