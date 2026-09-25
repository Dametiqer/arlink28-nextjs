import type { Metadata } from "next";
import "../styles/opportunities-inline.css";

import "../styles/content-shared.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Opportunities | ARLink28 - Shape The Future Of African Aviation",
  description: "Explore career openings, investor relations, and strategic partnership opportunities with ARLink28.",
};

export default function OpportunitiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-hero-tag hero-tag-entrance">
            <i className="fa-solid fa-circle" style={{ fontSize: '8px', color: 'var(--primary-red)', marginRight: '8px' }}></i>
            Grow With Us
          </span>
          <h1 className="hero-h1-entrance">
            Shape The Future Of
            <br />
            <span className="highlight-red">
              African Aviation
            </span>
          </h1>
          <p className="hero-p-entrance">
            Whether you're a talented professional, a strategic investor, or an ambitious partner — ARLink28 has a place for you in building Africa's next great airline.
          </p>
          <div className="page-hero-actions hero-btn-entrance">
            <a href="#careers" className="btn btn-primary">
              View Openings 
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#partnerships" className="btn btn-secondary">
              Partner With Us
            </a>
          </div>
        </div>
        <div className="page-hero-visual hero-visual-entrance">
          <div className="opp-hero-stats">
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <div className="opp-stat-num">
                50+
              </div>
              <div className="opp-stat-lbl">
                Open Roles
              </div>
            </div>
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <div className="opp-stat-num">
                20+
              </div>
              <div className="opp-stat-lbl">
                Partners
              </div>
            </div>
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-globe"></i>
              </div>
              <div className="opp-stat-num">
                30+
              </div>
              <div className="opp-stat-lbl">
                Countries
              </div>
            </div>
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div className="opp-stat-num">
                $5M+
              </div>
              <div className="opp-stat-lbl">
                Investment Target
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="opp-section" id="careers">
        <div className="section-header reveal">
          <span className="section-tag">
            Career Openings
          </span>
          <h2>
            Join The 
            <span className="highlight-red">
              ARLink28
            </span>
             Team
          </h2>
          <p>
            We're building a world-class airline from the ground up. We want passionate, talented people ready to shape the future of African aviation.
          </p>
        </div>
        <div className="jobs-carousel-container reveal">
          <button className="carousel-control prev" id="carousel-prev" aria-label="Previous">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="carousel-control next" id="carousel-next" aria-label="Next">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className="jobs-carousel-viewport">
            <div className="jobs-tickets" id="jobs-track">
              <div className="job-ticket">
                <div className="ticket-stub ticket-stub-green">
                  <div className="ticket-num">
                    01
                  </div>
                  <div className="ticket-stub-icon">
                    <i className="fa-solid fa-code"></i>
                  </div>
                  <span className="ticket-type badge-remote">
                    Remote
                  </span>
                </div>
                <div className="ticket-tear">
                  <div className="ticket-notch top"></div>
                  <div className="ticket-dash-line"></div>
                  <div className="ticket-notch bottom"></div>
                </div>
                <div className="ticket-body">
                  <div className="ticket-body-top">
                    <div>
                      <h3>
                        Development Team Member
                      </h3>
                      <p className="ticket-location">
                        <i className="fa-solid fa-location-dot"></i>
                         Remote / Lagos, Nigeria
                      </p>
                    </div>
                    <span className="ticket-dept">
                      Technology
                    </span>
                  </div>
                  <p className="ticket-desc">
                    Build and maintain the ARLink28 digital platform — booking engines, admin dashboards, and customer-facing web applications at scale.
                  </p>
                  <div className="ticket-skills">
                    <span>
                      React
                    </span>
                    <span>
                      Node.js
                    </span>
                    <span>
                      AWS
                    </span>
                    <span>
                      TypeScript
                    </span>
                  </div>
                </div>
                <div className="ticket-action-panel">
                  <div className="ticket-ref">
                    ARK-001
                  </div>
                  <Link className="ticket-apply-btn" href="/contact">
                    Apply Now 
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <div className="ticket-mini-barcode">
                    <div className="tbc w2"></div>
                    <div className="tbc w1"></div>
                    <div className="tbc w3"></div>
                    <div className="tbc w1"></div>
                    <div className="tbc w2"></div>
                    <div className="tbc w4"></div>
                    <div className="tbc w1"></div>
                    <div className="tbc w2"></div>
                    <div className="tbc w1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-dots" id="carousel-dots"></div>
        </div>
      </section>
      <section className="opp-section opp-invest-section" id="invest">
        <div className="invest-row">
          <div className="invest-text reveal-left">
            <span className="section-tag">
              Investor Relations
            </span>
            <h2>
              Invest In 
              <span className="highlight-red">
                Africa's Aviation Future
              </span>
            </h2>
            <p>
              ARLink28 is seeking strategic investment partners to help build a new era of African air travel. We offer transparent reporting, strong growth projections, and meaningful impact at continental scale.
            </p>
            <ul className="invest-list">
              <li>
                <i className="fa-solid fa-check"></i>
                Projected $5M+ Series A round
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                30%+ CAGR in African aviation market
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                Operational base in Ethiopia — Africa's gateway hub
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                Sustainable aviation technology advantage
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                Experienced leadership team with aviation & tech backgrounds
              </li>
            </ul>
            <div style={{ marginTop: '30px' }}>
              <Link className="btn btn-primary" href="/contact">
                Request Investor Deck 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="invest-card-stack reveal-right">
            <div className="invest-metric-card glass-panel">
              <i className="fa-solid fa-chart-line"></i>
              <div>
                <h4>
                  Market Size
                </h4>
                <p>
                  African aviation projected to grow to $25B by 2035.
                </p>
              </div>
            </div>
            <div className="invest-metric-card glass-panel">
              <i className="fa-solid fa-plane"></i>
              <div>
                <h4>
                  Fleet Strategy
                </h4>
                <p>
                  Fuel-efficient aircraft with SAF capability from day one.
                </p>
              </div>
            </div>
            <div className="invest-metric-card glass-panel">
              <i className="fa-solid fa-shield-halved"></i>
              <div>
                <h4>
                  Risk Management
                </h4>
                <p>
                  Robust compliance framework aligned with ICAO standards.
                </p>
              </div>
            </div>
            <div className="invest-metric-card glass-panel">
              <i className="fa-solid fa-users"></i>
              <div>
                <h4>
                  Management Team
                </h4>
                <p>
                  Multi-disciplinary team spanning aviation, tech, and finance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="opp-section" id="partnerships">
        <div className="section-header reveal">
          <span className="section-tag">
            Partnerships
          </span>
          <h2>
            Partner With 
            <span className="highlight-red">
              ARLink28
            </span>
          </h2>
          <p>
            We're actively building a network of strategic partners across aviation, technology, hospitality, and financial services.
          </p>
        </div>
        <div className="partner-types-grid">
          <div className="partner-type-card glass-panel reveal">
            <div className="pt-icon">
              <i className="fa-solid fa-plane"></i>
            </div>
            <h3>
              Airline Partners
            </h3>
            <p>
              Code-share agreements and interline partnerships with African and global carriers for seamless passenger connections.
            </p>
            <Link className="pt-link" href="/contact">
              Get in touch 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="partner-type-card glass-panel reveal">
            <div className="pt-icon">
              <i className="fa-solid fa-hotel"></i>
            </div>
            <h3>
              Hospitality Partners
            </h3>
            <p>
              Hotel chains, resorts, and accommodation providers to bundle travel packages and deliver end-to-end journeys.
            </p>
            <Link className="pt-link" href="/contact">
              Get in touch 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="partner-type-card glass-panel reveal">
            <div className="pt-icon">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <h3>
              Technology Partners
            </h3>
            <p>
              Booking platforms, payment processors, and aviation software vendors building the digital backbone of ARLink28.
            </p>
            <Link className="pt-link" href="/contact">
              Get in touch 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="partner-type-card glass-panel reveal">
            <div className="pt-icon">
              <i className="fa-solid fa-building-columns"></i>
            </div>
            <h3>
              Financial Partners
            </h3>
            <p>
              Banks, investment firms, and financial institutions supporting our capitalization and growth strategy.
            </p>
            <Link className="pt-link" href="/contact">
              Get in touch 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
      <section className="cta-adventure">
        <div className="cta-banner reveal-scale">
          <div className="cta-content">
            <h2>
              Shape Africa's
              <br />
              Aviation Future
            </h2>
            <p>
              Whether as a team member, investor, or partner — there's a place for you in the ARLink28 story.
            </p>
            <Link className="btn btn-primary" href="/contact">
              Get In Touch 
              <i className="fa-solid fa-plane"></i>
            </Link>
          </div>
          <div className="cta-visual">
            <img alt="ARLinks Airplane" loading="lazy" width="580" height="350" className="cta-plane" src="/images/IMG_5238.png" style={{ color: 'transparent', width: '130%', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </section>
      <section className="newsletter-bar" id="register">
        <div className="newsletter-container">
          <div className="newsletter-info reveal-left">
            <i className="fa-regular fa-envelope-open newsletter-icon"></i>
            <div className="newsletter-text">
              <h4>
                Stay in the loop
              </h4>
              <p>
                Get the latest deals, destinations, and travel tips delivered straight to your inbox.
              </p>
            </div>
          </div>
          <div className="newsletter-form-container reveal-right">
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" required aria-label="Email for newsletter" />
              <button type="submit">
                Subscribe
              </button>
            </form>
            <div className="newsletter-agree">
              <input type="checkbox" id="newsletter-check" required />
              <label htmlFor="newsletter-check">
                I agree to terms & privacy policy
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
