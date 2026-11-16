
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
  const stopWords = new Set([
    "about", "after", "also", "among", "because", "being",
    "between", "could", "every", "from", "have", "into",
    "more", "most", "other", "over", "should", "their",
    "there", "these", "they", "this", "those", "through",
    "under", "using", "what", "when", "where", "which",
    "while", "with", "your", "guide", "explained", "best",
    "europe", "european"
  ]);

  const getKeywords = (item) => {
    const text = `${item.title || ""} ${item.description || ""}`;

    return new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length >= 4 && !stopWords.has(word))
    );
  };

  const sourceKeywords = getKeywords(article);

  return articles
    .filter((item) => item.slug !== article.slug)
    .map((item) => {
      const candidateKeywords = getKeywords(item);
      let score = 0;

      if (
        article.category &&
        item.category &&
        article.category.toLowerCase() === item.category.toLowerCase()
      ) {
        score += 4;
      }

      sourceKeywords.forEach((word) => {
        if (candidateKeywords.has(word)) {
          score += 2;
        }
      });

      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((result) => result.item);
}

function ArticlePage() {
  const { slug } = useParams();

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <main className="article-page-v2 article-not-found-v2">
        <Seo
          title="Article Not Found"
          description="The requested EuroScope article could not be found."
          noindex
        />

        <Link className="article-back-v2" to="/#articles">
          ← Back to EuroScope
        </Link>

        <div className="article-not-found-content">
          <span className="article-kicker-v2">EUROSCOPE</span>
          <h1>Article not found</h1>

          <p>
            Sorry, we couldn't find that article. It may have been
            moved or the link may be incorrect.
          </p>

          <Link className="article-button-v2" to="/#articles">
            Explore articles →
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = getRelatedArticles(article);

  const author = article.author || "EuroScope Editorial Team";
  const publishedDate = formatDate(article.publishedAt);
  const updatedDate = formatDate(article.updatedAt);

  return (
    <main className="article-page-v2">
      <Seo
        title={article.title}
        description={article.description}
        article={article}
      />

      <div className="article-topbar-v2">
        <Link className="article-back-v2" to="/#articles">
          <span aria-hidden="true">←</span> All articles
        </Link>

        <span className="article-topbar-label">
          EUROSCOPE · EDITORIAL
        </span>
      </div>

      <header className="article-header-v2">
        <div className="article-meta-v2">
          {article.category && (
            <span className="article-category-v2">
              {article.category}
            </span>
          )}

          {article.readTime && (
            <span className="article-readtime-v2">
              {article.readTime}
            </span>
          )}
        </div>

        <h1>{article.title}</h1>

        {article.description && (
          <p className="article-intro-v2">
            {article.description}
          </p>
        )}

        <div className="article-byline-v2">
          <div className="article-author-avatar">
            E
          </div>

          <div className="article-author-details">
            <span className="article-author-name">{author}</span>

            <div className="article-date-details">
              {publishedDate && (
                <span>
                  Published{" "}
                  <time dateTime={article.publishedAt}>
                    {publishedDate}
                  </time>
                </span>
              )}

              {updatedDate && updatedDate !== publishedDate && (
                <span>
                  · Updated{" "}
                  <time dateTime={article.updatedAt}>
                    {updatedDate}
                  </time>
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {article.image && (
        <figure className="article-image-v2">
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            fetchPriority="high"
          />
          <figcaption>{article.imageAlt || article.title}</figcaption>
        </figure>
      )}

      <div className="article-content-layout-v2">
        <article className="article-body-v2">
          {(article.sections || []).map((section, index) => (
            <section
              className="article-section-v2"
              key={`${article.slug}-${index}`}
            >
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
        </article>
      </div>

      {relatedArticles.length > 0 && (
        <section className="article-related-v2">
          <div className="article-related-heading">
            <div>
              <span className="article-kicker-v2">
                KEEP EXPLORING
              </span>

              <h2>More stories for you</h2>

              <p>
                Discover more articles and guides related to this topic.
              </p>
            </div>

            <Link to="/#articles" className="article-view-all-v2">
              View all articles →
            </Link>
          </div>

          <div className="article-related-grid-v2">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard
                key={relatedArticle.slug}
                article={relatedArticle}
              />
            ))}
          </div>
        </section>
      )}

      <div className="article-bottom-v2">
        <Link to="/#articles" className="article-back-bottom-v2">
          ← Discover more on EuroScope
        </Link>
      </div>
    </main>
  );
}

export default ArticlePage;
