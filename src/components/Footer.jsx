
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Euro<span>Scope</span>
          </Link>

          <p>
            European guides, sports stories, and gaming insights
            to help you explore what matters.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/#europe">Europe guides</Link>
          <Link to="/#sports">Sports</Link>
          <Link to="/#gaming">Gaming</Link>
        </div>

        <div className="footer-column">
          <h3>Information</h3>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/editorial">Editorial policy</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} EuroScope. All rights reserved.
        </span>
        <span>Made for curious minds across Europe.</span>
      </div>
    </footer>
  );
}
