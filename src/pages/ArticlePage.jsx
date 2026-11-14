
import { Link, useParams } from "react-router-dom";
import articles from "../data/articles";
import Seo from "../components/Seo";
import ArticleCard from "../components/ArticleCard";

function formatDate(date) {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
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

  const relatedArticles = articles
    .filter(
      (item) =>
        item.slug !== article.slug &&
        item.category === article.category
    )
    .slice(0, 3);

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
        <span>{article.readTime}</span>
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
        {article.sections.map((section, index) => (
          <section key={`${article.slug}-${index}`}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>

      <section className="article-end">
        <p className="eyebrow">Keep exploring</p>

        <h2>More from {article.category}</h2>

        <p>
          Continue reading our practical guides, analysis and
          stories from EuroScope.
        </p>

        {relatedArticles.length > 0 ? (
          <div className="articles-grid">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard
                key={relatedArticle.slug}
                article={relatedArticle}
              />
            ))}
          </div>
        ) : (
          <p>
            More articles are coming soon. Visit our homepage
            to explore all available topics.
          </p>
        )}

        <Link className="primary-button" to="/#articles">
          Explore all articles →
        </Link>
      </section>
    </main>
  );
}

export default ArticlePage;
