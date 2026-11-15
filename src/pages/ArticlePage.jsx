
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

  // Recommend articles from the same category first.
  const sameCategoryArticles = articles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category === article.category
  );

  const otherCategoryArticles = articles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category !== article.category
  );

  const relatedArticles = [
    ...sameCategoryArticles,
    ...otherCategoryArticles,
  ].slice(0, 3);

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

      {/* Article content */}
      <div className="article-body">
        {(article.sections || []).map((section, index) => (
          <section key={`${article.slug}-${index}`}>
            {section.heading && (
              <h2>{section.heading}</h2>
            )}

            {/* Support both paragraphs and body formats */}
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

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="article-end">
          <p className="eyebrow">Related reading</p>

          <h2>Continue exploring EuroScope</h2>

          <p>
            Discover more useful guides, insights and stories
            related to this topic.
          </p>

          <ul className="related-text-links">
            {relatedArticles.map((item) => (
              <li key={item.slug}>
                <Link to={`/article/${item.slug}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

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
