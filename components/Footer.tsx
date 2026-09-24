import Link from "next/link";

export default function Footer() {
  return (
      <footer id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="logo-container" href="/">
              <img alt="ARLinks Logo" loading="lazy" width="120" height="35" decoding="async" src="/images/logo.png" style={{ color: 'transparent', height: '35px', width: 'auto' }} />
            </Link>
            <p>
              Connecting African journeys through travel, tourism and the future of aviation.
            </p>
            <div className="social-links">
              <a href="https://www.instagram.com/fly_arlink28?igsh=dnpyYTkzcXZrc3J0" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@fly_arlink28?_r=1&_t=ZS-97TMxBPfuAU" className="social-icon" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h5>
              Quick Links
            </h5>
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/connect">
                  Connect
                </Link>
              </li>
              <li>
                <Link href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/travel">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="/opportunities">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/engagement">
                  Engagement
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>
              Opportunities
            </h5>
            <ul>
              <li>
                <Link href="/opportunities#careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/opportunities#invest">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link href="/opportunities#partnerships">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>
              Services
            </h5>
            <ul>
              <li>
                <Link href="/services#flight-booking">
                  Flight Booking
                </Link>
              </li>
              <li>
                <Link href="/services#hotel-reservations">
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link href="/services#travel-insurance">
                  Travel Insurance
                </Link>
              </li>
              <li>
                <Link href="/services#airport-transfers">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/services#holiday-packages">
                  Holiday Packages
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>
              Support
            </h5>
            <ul>
              <li>
                <Link href="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact#faq">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col" style={{ gridColumn: 'span 1' }}>
            <h5>
              Contact Us
            </h5>
            <ul className="contact-info">
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>
                  <strong>
                    Nigeria
                  </strong>
                  <br />
                  2nd Floor, Office 316B, Mulliner Towers, 39 Alfred Rewane Road, Ikoyi, Lagos, Nigeria 101233
                </span>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>
                  <strong>
                    UK
                  </strong>
                  <br />
                  71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom
                </span>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+2347047009128">
                  +234 704 700 9128
                </a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+447539071257">
                  +44 753 907 1257
                </a>
              </li>
              <li>
                <i className="fa-brands fa-whatsapp"></i>
                <a href="https://wa.me/2347047009128">
                  +234 704 700 9128
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 ARLinks. All rights reserved.
          </p>
          <p>
            Designed with excellence for a seamless traveler experience.
          </p>
        </div>
      </footer>
  );
}
