
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const pages = {
  about: {
    label: "Who we are",
    title: "About EuroScope",
    intro:
      "Europe, sports and gaming — explained with practical information, clear writing and a curiosity for the stories that matter.",
    sections: [
      {
        heading: "Our mission",
        paragraphs: [
          "EuroScope aims to make useful information easier to discover and understand. We publish accessible guides and explainers about European life, sports, and gaming.",
          "Our goal is to give readers something useful to take away from every article, whether they are learning a new concept, comparing options, or looking for a sensible next step.",
        ],
      },
      {
        heading: "What we cover",
        paragraphs: [
          "Europe: practical guides about employment, education, living costs, relocation planning and opportunities.",
          "Sports: explanations and analysis of football, cricket, esports, and the strategies behind competition.",
          "Gaming: guides to competitive gaming, PUBG Mobile, streaming, content creation, and tools for creators.",
        ],
      },
      {
        heading: "Our approach",
        paragraphs: [
          "We value clear language, useful explanations, original presentation, and responsible publishing. We aim to distinguish general guidance from facts that require current verification.",
          "Our articles are for general information and should not replace qualified legal, financial, or other professional advice.",
        ],
      },
    ],
  },

  contact: {
    label: "Get in touch",
    title: "Contact EuroScope",
    intro:
      "Have a question, article suggestion, correction, or collaboration idea? Send us a message. We'd love to hear from you.",
    sections: [],
  },

  privacy: {
    label: "Your information",
    title: "Privacy Policy",
    intro:
      "EuroScope respects visitor privacy. This policy should be reviewed and updated to reflect the services and data practices used by the live website.",
    sections: [
      {
        heading: "Information we receive",
        paragraphs: [
          "When you contact us, we may receive your name, email address, subject, and message. Please do not include passwords, payment details, or other sensitive information in your message.",
          "Our hosting provider and contact-form provider may also process technical information needed to deliver and secure their services.",
        ],
      },
      {
        heading: "How information is used",
        paragraphs: [
          "Information submitted through our contact form is used to receive, review, and respond to enquiries, corrections, and collaboration requests.",
          "The form uses a third-party service to deliver messages. That provider may process submitted information under its own privacy policy and terms.",
        ],
      },
      {
        heading: "Cookies and third parties",
        paragraphs: [
          "Cookies and third-party services depend on the features enabled on our website. If analytics, advertising, or additional services are introduced, this policy should be updated to describe them accurately.",
        ],
      },
      {
        heading: "Retention and your rights",
        paragraphs: [
          "We should retain personal information only for as long as reasonably necessary for its purpose or as required by law. Depending on applicable data protection laws, you may have rights to access, correct, or request deletion of your personal data.",
          "Visitors in the European Economic Area may have rights under the GDPR where applicable. You can contact us with privacy questions using the contact form on this website.",
        ],
      },
      {
        heading: "Policy updates",
        paragraphs: [
          "We may update this policy when the website or its services change. Before publication, the website owner should confirm the actual data handling practices and add any required legal details.",
        ],
      },
    ],
  },

  editorial: {
    label: "How we publish",
    title: "Editorial Policy",
    intro:
      "EuroScope aims to publish clear, useful, and responsible content. These standards guide how we prepare and maintain our articles.",
    sections: [
      {
        heading: "Accuracy and verification",
        paragraphs: [
          "We aim to check factual claims before publication and use reliable sources where appropriate. Information that changes frequently, such as immigration rules, employment requirements, and tournament formats, should be checked against current sources.",
        ],
      },
      {
        heading: "Original content",
        paragraphs: [
          "Our articles should provide original explanations, context, and practical value. We do not intend to simply copy another publisher's work. Outside sources should be credited where appropriate.",
        ],
      },
      {
        heading: "Updates and corrections",
        paragraphs: [
          "When a credible error is reported, we aim to review the evidence and correct material mistakes where warranted. Readers can contact us with the article title, the passage in question, and a reliable source when available.",
        ],
      },
      {
        heading: "Independence and transparency",
        paragraphs: [
          "If sponsored content, affiliate links, or other commercial relationships are introduced, they should be disclosed clearly and in accordance with applicable requirements.",
        ],
      },
      {
        heading: "Responsible publishing",
        paragraphs: [
          "We aim to avoid misleading headlines, unsupported claims, and unnecessary sensationalism. Articles involving immigration, employment, or finances should encourage readers to verify important details with official sources.",
        ],
      },
    ],
  },
};

function ContactForm() {
  return (
    <form
      className="euroscope-contact-form"
      action="https://formspree.io/f/xaeeedjz"
      method="POST"
    >
      <input
        type="hidden"
        name="_subject"
        value="New message from the EuroScope website"
      />

      <div className="contact-field">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="Enter your name"
          autoComplete="name"
          required
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-email">Your email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          placeholder="What is your message about?"
          required
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="6"
          placeholder="Write your message here..."
          required
        />
      </div>

      <button
        className="primary-button contact-submit"
        type="submit"
      >
        Send message →
      </button>

      <p className="contact-note">
        Your message is sent through our contact form provider.
        Please don't include passwords or payment information.
      </p>
    </form>
  );
}

export default function InfoPage({ page }) {
  const content = pages[page];

  if (!content) {
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
              <h1>Page not found</h1>
              <Link className="primary-button" to="/">
                Return home →
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo title={content.title} description={content.intro} />
      <main className="info-page">
        <div className="container info-page-inner">
          <Link className="info-back" to="/">
            ← Back to EuroScope
          </Link>

          <article className="info-page-card">
            <p className="eyebrow">{content.label}</p>
            <h1>{content.title}</h1>
            <p className="info-intro">{content.intro}</p>

            {page === "contact" && <ContactForm />}

            <div className="info-content">
              {content.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            {page !== "contact" && (
              <div className="info-page-bottom">
                <p>Want to explore more of EuroScope?</p>
                <Link className="primary-button" to="/">
                  Explore our articles →
                </Link>
              </div>
            )}
          </article>
        </div>
      </main>
    </>
  );
}
