
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <Link
        to={`/article/${article.slug}`}
        className="article-card-image-link"
      >
        <img
          className="article-card-image"
          src={article.image}
          alt={article.imageAlt || article.title}
          loading="lazy"
        />
      </Link>

      <div className="article-card-content">
        <span className="category">{article.category}</span>

        <h3>
          <Link
            className="article-title-link"
            to={`/article/${article.slug}`}
          >
            {article.title}
          </Link>
        </h3>

        <p>{article.description}</p>

        <div className="article-card-bottom">
          <span>{article.readTime}</span>
          <Link to={`/article/${article.slug}`}>
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
