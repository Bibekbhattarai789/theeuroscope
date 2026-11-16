
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./App.css";
import articles from "./data/articles";
import ArticleCard from "./components/ArticleCard";
import ArticlePage from "./pages/ArticlePage";
import InfoPage from "./pages/InfoPage";
import Seo from "./components/Seo";

const ARTICLES_PER_PAGE = 9;

function BrandLogo() {
  return (
    <Link className="logo brand-logo" to="/" aria-label="EuroScope home">
      <span className="brand-symbol" aria-hidden="true">E</span>
      <span className="brand-name">
        Euro<span>Scope</span>
      </span>
    </Link>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <BrandLogo />

        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/#articles">Europe</Link>
          <Link to="/#articles">Sports</Link>
          <Link to="/#articles">Gaming</Link>
        </nav>

        <Link className="header-button" to="/#newsletter">
          Stay connected <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <BrandLogo />

          <p>
            Practical European guides, sports stories and gaming
            insights to help you explore what matters.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <nav className="footer-links" aria-label="Explore links">
            <Link to="/#articles">Europe guides</Link>
            <Link to="/#articles">Sports</Link>
            <Link to="/#articles">Gaming</Link>
          </nav>
        </div>

        <div className="footer-column">
          <h3>Information</h3>
          <nav className="footer-links" aria-label="Information links">
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/editorial-policy">Editorial Policy</Link>
          </nav>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} EuroScope. All rights reserved.</p>
        <p>Made for curious minds across Europe.</p>
      </div>
    </footer>
  );
}

function SiteLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/about" element={<InfoPage page="about" />} />
        <Route path="/contact" element={<InfoPage page="contact" />} />
        <Route path="/privacy" element={<InfoPage page="privacy" />} />
        <Route path="/editorial-policy" element={<InfoPage page="editorial" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(articles.map((article) => article.category).filter(Boolean)),
    ];

    return ["All", ...uniqueCategories];
  }, []);

  const filteredArticles = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        category === "All" || article.category === category;

      const matchesSearch =
        !searchText ||
        article.title?.toLowerCase().includes(searchText) ||
        article.description?.toLowerCase().includes(searchText) ||
        article.category?.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  useEffect(() => {
    setVisibleCount(ARTICLES_PER_PAGE);
  }, [search, category]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < filteredArticles.length;

  // Use an existing article as the homepage featured story.
  const featuredArticle = articles[0];

  return (
    <>
      <Seo />

      <main className="homepage">
        <section className="hero container">
          <div className="hero-content">
            <p className="eyebrow hero-kicker">
              <span className="hero-kicker-dot" />
              EUROPE · SPORTS · GAMING
            </p>

            <h1>
              Discover more.
              <br />
              <span>Understand Europe.</span>
            </h1>

            <p className="hero-description">
              Explore practical European guides, sports analysis and
              gaming stories. Clear information, useful insights and
              fresh perspectives — all in one place.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#articles">
                Explore the latest <span aria-hidden="true">→</span>
              </a>

              <Link className="hero-secondary-link" to="/about">
                About EuroScope
              </Link>
            </div>

            <div className="hero-topics" aria-label="Topics covered">
              <span>🇪🇺 Europe</span>
              <span>⚽ Sports</span>
              <span>🎮 Gaming</span>
              <span>💡 Guides & insights</span>
            </div>
          </div>

          {featuredArticle && (
            <Link
              className="hero-feature"
              to={`/article/${featuredArticle.slug}`}
              aria-label={`Read featured article: ${featuredArticle.title}`}
            >
              {featuredArticle.image && (
                <img
                  className="hero-feature-image"
                  src={featuredArticle.image}
                  alt={featuredArticle.imageAlt || featuredArticle.title}
                />
              )}

              <div className="hero-feature-overlay" />

              <div className="hero-feature-content">
                <span className="featured-label">
                  <span className="featured-label-dot" />
                  EDITOR'S PICK
                </span>

                <span className="featured-category">
                  {featuredArticle.category || "Featured"}
                </span>

                <h2>{featuredArticle.title}</h2>

                <p>
                  {featuredArticle.description ||
                    "Explore this story and discover more with EuroScope."}
                </p>

                <span className="featured-read-link">
                  Read the story <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          )}
        </section>

        <section className="topic-strip">
          <div className="container topic-strip-inner">
            <span className="topic-strip-label">EXPLORE EURO SCOPE</span>
            <span>European life & opportunities</span>
            <span>Football & sports</span>
            <span>Gaming & esports</span>
          </div>
        </section>

        <section className="container articles-section" id="articles">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ideas worth exploring</p>
              <h2>Latest stories</h2>
              <p className="section-description">
                Guides, analysis and stories selected for curious minds.
              </p>
            </div>

            <span className="article-total">
              {filteredArticles.length} {filteredArticles.length === 1 ? "story" : "stories"}
            </span>
          </div>

          <div className="article-controls">
            <div className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search stories and guides..."
                aria-label="Search articles"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All topics" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="results-count" aria-live="polite">
            Showing {visibleArticles.length} of {filteredArticles.length} articles
          </div>

          {filteredArticles.length > 0 ? (
            <>
              <div className="articles-grid">
                {visibleArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                  />
                ))}
              </div>

              {hasMoreArticles && (
                <div className="show-more-container">
                  <button
                    type="button"
                    className="primary-button show-more-button"
                    onClick={() =>
                      setVisibleCount((current) =>
                        current + ARTICLES_PER_PAGE
                      )
                    }
                  >
                    Load more stories <span aria-hidden="true">↓</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <h3>No stories found</h3>
              <p>Try another search term or choose a different topic.</p>

              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="newsletter-section" id="newsletter">
          <div className="container newsletter-inner">
            <div className="newsletter-copy">
              <p className="eyebrow">Keep exploring</p>
              <h2>Curiosity has no borders.</h2>
              <p>
                Have a question, suggestion or story idea?
                Get in touch with the EuroScope team.
              </p>
            </div>

            <Link className="primary-button newsletter-button" to="/contact">
              Contact EuroScope <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);

      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [pathname, hash]);

  return null;
}

function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The requested EuroScope page could not be found."
        noindex
      />

      <main className="info-page">
        <div className="container info-page-inner">
          <div className="info-page-card">
            <p className="eyebrow">404 · PAGE NOT FOUND</p>
            <h1>We couldn't find that page.</h1>
            <p>
              The page may have moved, or the link may be incorrect.
              You can return to EuroScope and continue exploring.
            </p>
            <Link className="primary-button" to="/">
              Return home →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteLayout />
    </>
  );
}
