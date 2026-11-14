
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

function BrandLogo() {
  return (
    <Link className="logo brand-logo" to="/" aria-label="EuroScope home">
      <span className="brand-symbol">E</span>
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
          Newsletter
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
        <p>
          © {new Date().getFullYear()} EuroScope. All rights reserved.
        </p>
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
        <Route
          path="/editorial-policy"
          element={<InfoPage page="editorial" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(articles.map((article) => article.category)),
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

  return (
    <>
      <Seo />

      <main>
        <section className="hero container">
          <div className="hero-content">
            <p className="eyebrow">Europe · Sports · Gaming</p>

            <h1>Europe, in one place.</h1>

            <p className="hero-description">
              Practical European guides, sports analysis and gaming
              stories — useful information instead of copied headlines.
            </p>

            <div className="hero-tags">
              <span>🇪🇺 Europe</span>
              <span>⚽ Sports</span>
              <span>🎮 Gaming</span>
              <span>💼 Opportunities</span>
            </div>
          </div>

          <div className="hero-feature">
            <p className="eyebrow">Featured guide</p>

            <h2>Explore Europe with EuroScope</h2>

            <p>
              Discover useful guides, sports stories and gaming insights.
            </p>

            <a className="primary-button" href="#articles">
              Explore articles →
            </a>
          </div>
        </section>

        <section className="container articles-section" id="articles">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Discover something useful</p>
              <h2>Latest articles</h2>
            </div>

            <p>{filteredArticles.length} articles</p>
          </div>

          <div className="article-controls">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No articles found</h3>
              <p>Try another search term or category.</p>

              <button
                type="button"
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
            <div>
              <p className="eyebrow">Stay informed</p>
              <h2>Get the best of EuroScope.</h2>
              <p>
                Follow our latest European guides, sports analysis
                and gaming stories.
              </p>
            </div>

            <Link className="primary-button" to="/contact">
              Contact EuroScope
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
      window.scrollTo({ top: 0, behavior: "auto" });
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
            <p className="eyebrow">404 · Page not found</p>
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
