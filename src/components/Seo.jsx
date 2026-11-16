
import { useEffect } from "react";

const SITE_URL = "https://www.euroscope.site";
const SITE_NAME = "EuroScope";

const DEFAULT_DESCRIPTION =
  "Explore practical European guides, sports analysis and gaming stories on EuroScope";

function formatSchemaDate(date) {
  if (!date) return undefined;

  const value = /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `${date}T00:00:00Z`
    : date;

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return parsedDate.toISOString();
}

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

    const pageUrl = `${SITE_URL}${window.location.pathname}`;

    const pageImage = article?.image
      ? new URL(article.image, SITE_URL).href
      : `${SITE_URL}/og-image.png`;

    const authorName =
      article?.author || "EuroScope Editorial Team";

    const publishedDate = formatSchemaDate(
      article?.publishedAt
    );

    const modifiedDate = formatSchemaDate(
      article?.updatedAt
    );

    document.title = pageTitle;

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

    // Basic SEO
    setMeta("name", "description", pageDescription);

    setMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    // Open Graph
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:type", article ? "article" : "website");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", pageImage);
    setMeta("property", "og:site_name", SITE_NAME);

    if (publishedDate) {
      setMeta(
        "property",
        "article:published_time",
        publishedDate
      );
    }

    if (modifiedDate) {
      setMeta(
        "property",
        "article:modified_time",
        modifiedDate
      );
    }

    // Twitter / X
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

    // Structured data scripts
    let articleScript = document.getElementById(
      "euroscope-article-schema"
    );

    let breadcrumbScript = document.getElementById(
      "euroscope-breadcrumb-schema"
    );

    if (article && !noindex) {
      // Determine article author
      const isNamedAuthor =
        Boolean(article.author) &&
        article.author !== "EuroScope Editorial Team";

      // Article structured data
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        image: [pageImage],

        author: {
          "@type": isNamedAuthor ? "Person" : "Organization",
          name: authorName,
          ...(!isNamedAuthor && {
            url: `${SITE_URL}/about`,
          }),
        },

        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
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

      if (publishedDate) {
        articleSchema.datePublished = publishedDate;
      }

      if (modifiedDate) {
        articleSchema.dateModified = modifiedDate;
      }

      if (article.category) {
        articleSchema.articleSection = article.category;
      }

      if (!articleScript) {
        articleScript = document.createElement("script");
        articleScript.id = "euroscope-article-schema";
        articleScript.type = "application/ld+json";
        document.head.appendChild(articleScript);
      }

      articleScript.textContent = JSON.stringify(articleSchema);

      // Breadcrumb structured data
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: `${SITE_URL}/#articles`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
          },
        ],
      };

      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement("script");
        breadcrumbScript.id = "euroscope-breadcrumb-schema";
        breadcrumbScript.type = "application/ld+json";
        document.head.appendChild(breadcrumbScript);
      }

      breadcrumbScript.textContent =
        JSON.stringify(breadcrumbSchema);
    } else {
      articleScript?.remove();
      breadcrumbScript?.remove();
    }
  }, [title, description, noindex, article]);

  return null;
}

export default Seo;
