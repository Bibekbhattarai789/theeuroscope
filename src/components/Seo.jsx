
import { useEffect } from "react";

const SITE_URL = "https://euroscope.site";
const SITE_NAME = "EuroScope";
const DEFAULT_DESCRIPTION =
  "Explore practical European guides, sports analysis and gaming stories on EuroScope.";

function Seo({
  title,
  description,
  noindex = false,
  article = null,
}) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${SITE_NAME}`
      : "EuroScope | Europe, Sports & Gaming";

    const pageDescription =
      description || DEFAULT_DESCRIPTION;

    // Always use the preferred non-www domain
    const pageUrl = `${SITE_URL}${window.location.pathname}`;

    const pageImage = article?.image
      ? new URL(article.image, SITE_URL).href
      : `${SITE_URL}/og-image.png`;

    const authorName =
      article?.author || "EuroScope Editorial Team";

    // Update browser title
    document.title = pageTitle;

    // Create or update meta tags
    function setMeta(attribute, key, content) {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    }

    // Basic SEO metadata
    setMeta("name", "description", pageDescription);

    setMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    // Open Graph metadata
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:type", article ? "article" : "website");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", pageImage);
    setMeta("property", "og:site_name", SITE_NAME);

    if (article?.publishedAt) {
      setMeta(
        "property",
        "article:published_time",
        new Date(article.publishedAt).toISOString()
      );
    }

    if (article?.updatedAt) {
      setMeta(
        "property",
        "article:modified_time",
        new Date(article.updatedAt).toISOString()
      );
    }

    // Twitter / X metadata
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", pageImage);

    // Canonical URL
    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = pageUrl;

    // Article structured data (Schema.org)
    let schemaScript = document.getElementById(
      "euroscope-article-schema"
    );

    if (article && !noindex) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        image: [pageImage],
        author: {
          "@type": "Organization",
          name: authorName,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        url: pageUrl,
        inLanguage: "en",
      };

      if (article.publishedAt) {
        articleSchema.datePublished = article.publishedAt;
      }

      if (article.updatedAt) {
        articleSchema.dateModified = article.updatedAt;
      } else if (article.publishedAt) {
        articleSchema.dateModified = article.publishedAt;
      }

      if (article.category) {
        articleSchema.articleSection = article.category;
      }

      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "euroscope-article-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }

      schemaScript.textContent = JSON.stringify(articleSchema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

  }, [title, description, noindex, article]);

  return null;
}

export default Seo;
