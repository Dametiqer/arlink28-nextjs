import type { Metadata } from "next";
import "../styles/travel.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "ARLinks - Premium African Aviation",
  description: "Connecting you to the world with affordable, premium flights. ARLink28 — Africa's next great airline.",
};

export default function TravelPage() {
  return (
    <>
      <section className="explore-hero">
        <div className="explore-hero-container">
          <div className="explore-hero-left">
            <span className="explore-hero-tag hero-tag-entrance">
              <i className="fa-solid fa-circle" style={{ fontSize: '8px', marginRight: '8px' }}></i>
              Explore With ARLinks
            </span>
            <h1 className="hero-h1-entrance">
              DISCOVER YOUR
              <br />
              <span className="highlight-red">
                NEXT JOURNEY.
              </span>
            </h1>
            <p className="hero-p-entrance">
              Explore flight options, travel partners, visa services, and curated experiences across Africa and the world.
            </p>
            <div className="hero-search-wrapper hero-widget-entrance">
              <div className="search-input-field">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input type="text" id="hero-search-input" placeholder="Search destinations, services..." />
              </div>
              <button className="search-btn btn">
                <i className="fa-solid fa-paper-plane"></i>
                 Search
              </button>
            </div>
          </div>
          <div className="explore-hero-right hero-visual-entrance">
            <div className="mock-boarding-pass">
              <div className="pass-header">
                <img alt="ARLinks" loading="lazy" width="80" height="18" decoding="async" className="pass-logo" src="/images/logo.png" style={{ color: 'transparent', height: '18px', width: 'auto' }} />
                <span className="pass-class">
                  BUSINESS
                </span>
              </div>
              <div className="pass-body">
                <div className="pass-airport">
                  <span className="airport-code">
                    LOS
                  </span>
                  <span className="airport-name">
                    Lagos, Nigeria
                  </span>
                </div>
                <div className="pass-flight-icon">
                  <div className="flight-line"></div>
                  <i className="fa-solid fa-plane"></i>
                </div>
                <div className="pass-airport destination">
                  <span className="airport-code">
                    ACC
                  </span>
                  <span className="airport-name">
                    Kotoka Int'l Airport
                  </span>
                </div>
              </div>
              <div className="pass-details">
                <div className="pass-col">
                  <span className="detail-label">
                    Date
                  </span>
                  <span className="detail-val">
                    15 AUG 2026
                  </span>
                </div>
                <div className="pass-col">
                  <span className="detail-label">
                    Flight
                  </span>
                  <span className="detail-val">
                    AL 2800
                  </span>
                </div>
                <div className="pass-col">
                  <span className="detail-label">
                    Gate
                  </span>
                  <span className="detail-val">
                    D14
                  </span>
                </div>
              </div>
              <div className="pass-divider">
                <div className="pass-circle left"></div>
                <div className="pass-dash-line"></div>
                <div className="pass-circle right"></div>
              </div>
              <div className="pass-footer">
                <div className="barcode-container">
                  <div className="barcode-line w-2"></div>
                  <div className="barcode-line w-1"></div>
                  <div className="barcode-line w-3"></div>
                  <div className="barcode-line w-1"></div>
                  <div className="barcode-line w-4"></div>
                  <div className="barcode-line w-2"></div>
                  <div className="barcode-line w-1"></div>
                  <div className="barcode-line w-3"></div>
                  <div className="barcode-line w-2"></div>
                  <div className="barcode-line w-4"></div>
                  <div className="barcode-line w-1"></div>
                  <div className="barcode-line w-2"></div>
                </div>
                <span className="pass-status">
                  <span className="status-indicator"></span>
                  CONFIRMED
                </span>
              </div>
            </div>
            <div className="floating-badge-card">
              <div className="badge-icon-circle">
                <i className="fa-solid fa-check"></i>
              </div>
              <div className="badge-text-content">
                <h5>
                  Booking Confirmed
                </h5>
                <p>
                  Seat 12A • Business Class
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="travel-partners" className="explore-directory-section">
        <div className="directory-header reveal">
          <span className="section-tag">
            Travel Partners
          </span>
          <h2>
            Explore Our Travel Partners
          </h2>
          <p>
            Browse our curated directory of trusted flight operators, visa specialists, and travel experience providers.
          </p>
        </div>
        <div className="filter-bar">
          <button className="filter-btn active">
            All Partners
          </button>
          <button className="filter-btn">
            Flights
          </button>
          <button className="filter-btn">
            Visa Services
          </button>
          <button className="filter-btn">
            Experiences
          </button>
        </div>
        <div className="vendor-grid">
          <div className="vendor-card glass-panel reveal">
            <div className="vendor-card-header">
              <div className="vendor-logo-placeholder">
                <img alt="iVisa logo" loading="lazy" width="90" height="44" decoding="async" src="/images/ivisa.jpg" style={{ color: 'transparent', width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="vendor-badge badge-visas">
                Visas
              </span>
            </div>
            <h3>
              iVisa
            </h3>
            <h4>
              Fast Visa Processing
            </h4>
            <p>
              Quick and reliable online visa, passport, and travel document processing for destinations worldwide.
            </p>
            <Link className="btn btn-primary vendor-cta" href="/contact">
              Contact Us 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="vendor-card glass-panel reveal">
            <div className="vendor-card-header">
              <div className="vendor-logo-placeholder">
                <img alt="GetYourGuide logo" loading="lazy" width="90" height="44" decoding="async" src="/images/get your guide.png" style={{ color: 'transparent', width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="vendor-badge badge-experiences">
                Experiences
              </span>
            </div>
            <h3>
              GetYourGuide
            </h3>
            <h4>
              Tours & Activities
            </h4>
            <p>
              Book unforgettable tours, attractions, and local experiences at your destination with instant confirmation.
            </p>
            <Link className="btn btn-primary vendor-cta" href="/contact">
              Contact Us 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="vendor-card glass-panel reveal">
            <div className="vendor-card-header">
              <div className="vendor-logo-placeholder">
                <img alt="Travelstart logo" loading="lazy" width="90" height="44" decoding="async" src="/images/travelstart.png" style={{ color: 'transparent', width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="vendor-badge badge-flights">
                Flights
              </span>
            </div>
            <h3>
              Travelstart
            </h3>
            <h4>
              African Travel Marketplace
            </h4>
            <p>
              Compare and book flights, hotels, and holiday packages across Africa and beyond at the best prices.
            </p>
            <Link className="btn btn-primary vendor-cta" href="/contact">
              Contact Us 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="vendor-card glass-panel reveal">
            <div className="vendor-card-header">
              <div className="vendor-logo-placeholder">
                <img alt="Viator logo" loading="lazy" width="90" height="44" decoding="async" src="/images/viator.jpg" style={{ color: 'transparent', width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="vendor-badge badge-experiences">
                Experiences
              </span>
            </div>
            <h3>
              Viator
            </h3>
            <h4>
              Tours, Tickets & Activities
            </h4>
            <p>
              A TripAdvisor company offering thousands of bookable tours, excursions, and skip-the-line attraction tickets.
            </p>
            <Link className="btn btn-primary vendor-cta" href="/contact">
              Contact Us 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="vendor-card glass-panel reveal">
            <div className="vendor-card-header">
              <div className="vendor-logo-placeholder">
                <img alt="Sherpa logo" loading="lazy" width="90" height="44" decoding="async" src="/images/sherpa.png" style={{ color: 'transparent', width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="vendor-badge badge-experiences">
                Experiences
              </span>
            </div>
            <h3>
              Sherpa
            </h3>
            <h4>
              Travel Requirements Guide
            </h4>
            <p>
              Real-time travel restriction and entry requirement information so you always know before you go.
            </p>
            <Link className="btn btn-primary vendor-cta" href="/contact">
              Contact Us 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="vendor-card glass-panel reveal">
            <div className="vendor-card-header">
              <div className="vendor-logo-placeholder">
                <img alt="Trip.com logo" loading="lazy" width="90" height="44" decoding="async" src="/images/trip.com.png" style={{ color: 'transparent', width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="vendor-badge badge-flights">
                Flights
              </span>
            </div>
            <h3>
              Trip.com
            </h3>
            <h4>
              Flights, Hotels & More
            </h4>
            <p>
              A global travel platform for booking flights, hotels, trains, and car rentals at competitive rates.
            </p>
            <Link className="btn btn-primary vendor-cta" href="/contact">
              Contact Us 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
      <section className="cta-adventure">
        <div className="cta-banner reveal-scale">
          <div className="cta-content">
            <h2>
              Ready to Explore
              <br />
              the World?
            </h2>
            <p>
              Browse our travel partners, compare flight options, and plan your dream journey with ARLink28.
            </p>
            <Link className="btn btn-primary" href="/book/flight">
              Start Exploring
              <i className="fa-solid fa-plane"></i>
            </Link>
          </div>
          <div className="cta-visual">
            <img alt="ARLinks Airplane" loading="lazy" width="580" height="350" decoding="async" className="cta-plane" src="/images/IMG_5238.png" style={{ color: 'transparent', width: '130%', height: 'auto', objectFit: 'contain' }} />
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
