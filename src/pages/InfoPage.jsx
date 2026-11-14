
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const CONTACT_EMAIL = "euroscope21@gmail.com";

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
    sections: [
      {
        heading: "Email",
        paragraphs: [
          "You can also contact EuroScope directly at euroscope21@gmail.com.",
          "For corrections, please include the article title and the information you believe needs updating.",
        ],
      },
    ],
  },

  privacy: {
    label: "Your information",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how EuroScope collects, uses, stores and shares information when you visit our website or contact us. We aim to handle personal information responsibly and transparently.",
    sections: [
      {
        heading: "1. Website owner and data controller",
        paragraphs: [
          "Website: EuroScope — https://www.euroscope.site",
          "Website owner and data controller: Bibek Bhattarai, the individual operating EuroScope.",
          "EuroScope is an independently operated website and is not presented as a registered company.",
          "Privacy contact email: euroscope21@gmail.com.",
          "For privacy questions or requests concerning your personal information, email us at euroscope21@gmail.com.",
        ],
      },
      {
        heading: "2. Information we collect",
        paragraphs: [
          "Information you provide: When you use our Contact page, we may receive your name, email address, subject and message. Please do not send passwords, payment details or other sensitive personal information through the form.",
          "Technical and usage information: When you visit EuroScope, our hosting, analytics and other website services may process information such as your browser type, device information, approximate location, pages visited, referring website and technical request information. The information collected depends on the services enabled and your privacy choices.",
          "Cookies and similar technologies: Our website and third-party services may use cookies, identifiers and similar technologies to support website functionality, measure traffic, remember privacy choices and, where enabled and permitted, provide advertising.",
        ],
      },
      {
        heading: "3. How we use information",
        paragraphs: [
          "We use information submitted through our Contact page to receive and respond to questions, feedback, correction requests and collaboration enquiries.",
          "We use website usage information to understand how visitors use EuroScope, measure website performance, improve our content and maintain the security and operation of the website.",
          "Where advertising is enabled, information may also be processed to provide, measure and improve advertising in accordance with applicable privacy requirements and the choices visitors make.",
        ],
      },
      {
        heading: "4. Google Analytics",
        paragraphs: [
          "EuroScope uses Google Analytics 4, a website analytics service provided by Google, to understand website traffic and how visitors interact with our pages.",
          "Google Analytics may use cookies and similar technologies to collect usage and device information. This information helps us understand visitor numbers, popular pages and general website performance.",
          "Google processes information under its own privacy terms. You can learn more at https://policies.google.com/privacy and https://support.google.com/analytics/answer/6004245.",
        ],
      },
      {
        heading: "5. Google AdSense and advertising",
        paragraphs: [
          "EuroScope has integrated Google AdSense and may display advertisements if the website is approved and advertising is enabled.",
          "Google and its advertising partners may use cookies, advertising identifiers and other technologies to store or access information on your device, deliver advertisements, measure advertising performance and help prevent fraud. The information processed and the types of advertising shown may depend on your location, privacy choices and the advertising settings available.",
          "Where required, advertising-related processing is subject to the consent choices presented through Google's European regulations consent message. You can use the consent message or available privacy settings to review or change your choices.",
          "For more information about how Google uses information for advertising, visit https://policies.google.com/technologies/ads and https://policies.google.com/privacy.",
        ],
      },
      {
        heading: "6. Cookies and consent choices",
        paragraphs: [
          "Cookies are small files stored on your device. Similar technologies can also store or access information on your device.",
          "We use Google's European regulations consent message to present privacy choices to visitors in relevant regions. Depending on the options available, visitors can consent, refuse consent or manage their choices.",
          "Your choices may be stored so that the website and relevant services can recognise your preferences. You can also manage or delete cookies through your browser settings. Blocking certain cookies may affect how some website features work.",
          "The use of cookies and similar technologies is subject to applicable data protection and electronic communications laws. Where consent is required, it should be obtained before the relevant non-essential technologies are used.",
        ],
      },
      {
        heading: "7. Contact form and Formspree",
        paragraphs: [
          "Our Contact page uses Formspree to receive and deliver messages submitted through the website.",
          "When you submit the form, the information you provide, including your name, email address, subject and message, is sent to Formspree for processing and delivery to us. Formspree may also process technical information needed to operate and protect its service.",
          "Messages submitted through the form are delivered to the email inbox used to receive our Formspree notifications. The public contact email listed on this website is euroscope21@gmail.com.",
          "Please review Formspree's privacy information at https://formspree.io/legal/privacy-policy/ for details about its data practices.",
        ],
      },
      {
        heading: "8. Website hosting and Vercel",
        paragraphs: [
          "EuroScope is hosted using Vercel. When you visit the website, Vercel may process technical information such as IP addresses, request information, browser details and security logs as necessary to deliver, maintain and protect the website.",
          "For more information, please review Vercel's privacy policy at https://vercel.com/legal/privacy-policy.",
        ],
      },
      {
        heading: "9. Sharing and international transfers",
        paragraphs: [
          "We do not sell personal information submitted through our Contact form.",
          "Information may be processed by service providers that help us operate the website, including Google, Formspree and Vercel. These providers process information according to their own terms and privacy practices.",
          "Some service providers may process information in countries outside your country of residence or outside the European Economic Area. Where applicable, appropriate safeguards for international transfers should be used in accordance with data protection law.",
        ],
      },
      {
        heading: "10. How long information is retained",
        paragraphs: [
          "We keep contact messages for as long as reasonably necessary to respond to enquiries, manage follow-ups and maintain relevant records, unless a longer period is required by law.",
          "Analytics, advertising and technical information may be retained according to the settings and retention practices of the relevant service providers.",
          "We aim not to retain personal information longer than necessary for the purposes for which it was collected.",
        ],
      },
      {
        heading: "11. Your privacy rights",
        paragraphs: [
          "Depending on your location and applicable law, you may have the right to request access to your personal information, ask for incorrect information to be corrected, request deletion, restrict or object to certain processing, or request data portability.",
          "Where processing is based on consent, you may withdraw that consent. Withdrawing consent does not affect the lawfulness of processing that took place before withdrawal.",
          "If you are in the European Economic Area, you may have rights under the General Data Protection Regulation (GDPR). You may also have the right to lodge a complaint with your relevant data protection supervisory authority.",
          "To make a privacy request, email euroscope21@gmail.com. We may need to verify your identity before responding.",
        ],
      },
      {
        heading: "12. Children's privacy",
        paragraphs: [
          "EuroScope is a general-interest website and is not intended to knowingly collect personal information from children in violation of applicable law. If you believe a child has submitted personal information to us, please contact us so we can review the matter.",
        ],
      },
      {
        heading: "13. Security",
        paragraphs: [
          "We take reasonable steps to protect information handled through our website. However, no website, online service or method of electronic transmission can be guaranteed to be completely secure.",
        ],
      },
      {
        heading: "14. Changes to this Privacy Policy",
        paragraphs: [
          "We may update this Privacy Policy when our website, services or legal requirements change. The latest version will be published on this page, together with its update date.",
          "Last updated: 15 November 2026.",
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

// Automatically turn website URLs and email addresses into clickable links.
function renderParagraph(text) {
  const pattern =
    /(https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

  return text.split(pattern).map((part, index) => {
    if (/^https?:\/\//i.test(part)) {
      const url = part.replace(/[.,;!?]+$/, "");
      const punctuation = part.slice(url.length);

      return (
        <span key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              cursor: "pointer",
            }}
          >
            {url}
          </a>
          {punctuation}
        </span>
      );
    }

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part)) {
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            cursor: "pointer",
          }}
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

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

            {page === "contact" && (
              <>
                <ContactForm />
                <p className="contact-note">
                  Prefer email? Contact us at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    style={{
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </>
            )}

            <div className="info-content">
              {content.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      {renderParagraph(paragraph)}
                    </p>
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
