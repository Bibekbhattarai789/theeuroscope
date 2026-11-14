
import { useEffect } from "react";

function Seo({
  title,
  description,
  noindex = false,
  article = null,
}) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | EuroScope`
      : "EuroScope | Europe, Sports & Gaming";

    const pageDescription =
      description ||
      "Explore practical European guides, sports analysis and gaming stories on EuroScope.";

    const pageUrl =
      `${window.location.origin}${window.location.pathname}`;

    const pageImage = article?.image
      ? new URL(article.image, window.location.origin).href
      : `${window.location.origin}/og-image.png`;

    // Browser title
    document.title = pageTitle;

    // Create or update metadata
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

    // SEO description and indexing
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
    setMeta("property", "og:site_name", "EuroScope");

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
          name: "EuroScope Editorial Team",
        },
        publisher: {
          "@type": "Organization",
          name: "EuroScope",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
      };

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
