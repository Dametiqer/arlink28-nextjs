import type { Metadata } from "next";
import "../styles/people.css";

import "../styles/engagement-inline.css";

import "../styles/content-shared.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "ARLinks - Premium African Aviation",
  description: "Connecting you to the world with affordable, premium flights. ARLink28 — Africa's next great airline.",
};

export default function EngagementPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-hero-tag hero-tag-entrance">
            <i className="fa-solid fa-circle" style={{ fontSize: '8px', color: 'var(--primary-red)', marginRight: '8px' }}></i>
            Industry & Community
          </span>
          <h1 className="hero-h1-entrance">
            Connecting Through Industry.
            <br />
            <span className="highlight-red">
              Building for Africa.
            </span>
          </h1>
          <p className="hero-p-entrance">
            ARLink28 actively engages across aviation, travel, tourism, sustainability, investment and business ecosystems throughout Africa and internationally. Through industry summits, travel exhibitions, strategic meetings and global aviation forums, we continue to expand our knowledge, strengthen relationships and build the partnerships required to support our long-term vision for greater African connectivity.
          </p>
          <div className="page-hero-actions hero-btn-entrance">
            <a className="btn btn-primary" href="#engagements">
              Our Engagements
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a className="btn btn-secondary" href="#upcoming-engagements">
              Upcoming Events
            </a>
          </div>
        </div>
        <div className="page-hero-visual hero-visual-entrance">
          <div className="opp-hero-stats">
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <div className="opp-stat-num">
                9
              </div>
              <div className="opp-stat-lbl">
                Industry Engagements
              </div>
            </div>
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-earth-africa"></i>
              </div>
              <div className="opp-stat-num">
                4
              </div>
              <div className="opp-stat-lbl">
                Countries Represented
              </div>
            </div>
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <div className="opp-stat-num">
                6
              </div>
              <div className="opp-stat-lbl">
                Sectors Covered
              </div>
            </div>
            <div className="opp-stat-card glass-panel">
              <div className="opp-stat-icon">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>
              <div className="opp-stat-num">
                2025–26
              </div>
              <div className="opp-stat-lbl">
                Active Engagement Period
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="opp-section" id="engagements">
        <div className="section-header reveal">
          <span className="section-tag">
            Our Industry Engagements
          </span>
          <h2>
            Where 
            <span className="highlight-red">
              ARLink28
            </span>
             Has Been
          </h2>
          <p>
            Our development is informed not only by internal planning, but by active participation in the industries, markets and conversations shaping the future of African mobility.
          </p>
        </div>
        <div className="destinations-grid">
          <Link className="destination-card reveal" href="/engagement-details#sustainable-skies-2025">
            <img src="/images/Sustainable Skies Summit.jpg" alt="Sustainable Skies World Summit 2025" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                Sustainable Skies World Summit 2025
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#alm-africa-summit-london-2025">
            <img src="/images/ALM Africa summit.JPG" alt="ALM Africa Summit London 2025" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                ALM Africa Summit London 2025
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#alm-africa-summit-lords-2025">
            <img src="/images/House Of Lords - African Leadership.JPG" alt="ALM Africa Summit UK House of Lords 2025" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                ALM Africa Summit 2025 – House of Lords
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#sustainable-skies-2026">
            <img src="/images/engagement-portrait-2.jpg" alt="Sustainable Skies World Summit 2026" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                Sustainable Skies World Summit 2026
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#african-business-leadership-summit-2026">
            <img src="/images/African Business & Leadership Summit.jpg" alt="African Business & Leadership Summit 2026" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                African Business & Leadership Summit 2026
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#spotlight-travelexpo-harare">
            <img src="/images/Spotlight TravelExpo Harare.jpg" alt="Spotlight TravelExpo — Harare" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                Spotlight TravelExpo — Harare
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#farnborough-airshow-2026">
            <img src="/images/Farnborough International Airshow.jpg" alt="Farnborough International Airshow 2026" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                Farnborough International Airshow 2026
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#spotlight-travelexpo-dar-es-salaam">
            <img src="/images/Spotlight On Africa & Indian Ocean Islands TravelExpo.JPG" alt="Spotlight TravelExpo — Dar es Salaam" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                Spotlight TravelExpo — Dar es Salaam
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#aerowest-summit-2026">
            <img src="/images/AeroWest Summit Day 1.jpg" alt="AeroWest Africa Summit 2026 – Day One" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                AeroWest Africa Summit 2026 – Day One
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#aerowest-summit-2026-day2">
            <img src="/images/AeroWest Summit Day 2.jpg" alt="AeroWest Africa Summit 2026 – Day Two" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                AeroWest Africa Summit 2026 – Day Two
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#aviation-africa-2026-day1">
            <img src="/images/Aviation Africa 2026 Day 1.jpg" alt="Aviation Africa 2026 – Day One" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                Aviation Africa 2026 – Day One
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/engagement-details#aviation-africa-2026-day2">
            <img src="/images/Aviation Africa 2026 Day 2.jpg" alt="Aviation Africa 2026 – Day Two" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <h4>
                Aviation Africa 2026 – Day Two
              </h4>
              <span className="book-now-link">
                Read More 
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="opp-section opp-invest-section" id="upcoming-engagements">
        <div className="section-header reveal">
          <span className="section-tag">
            Events
          </span>
          <h2>
            Upcoming 
            <span className="highlight-red">
              Engagements
            </span>
          </h2>
          <p>
            Join us at industry events, community meetups, and online webinars where we share our vision and connect with the travel community.
          </p>
        </div>
        <div className="events-list">
          <div className="event-item glass-panel reveal">
            <div className="event-date-box">
              <span className="event-month">
                SEP
              </span>
              <span className="event-day">
                02–04
              </span>
              <span className="event-year">
                2026
              </span>
            </div>
            <div className="event-details">
              <span className="event-type-badge badge-green">
                Summit
              </span>
              <h3>
                AeroWest Summit 2026
              </h3>
              <p>
                ARLink28 will be at AeroWest Summit 2026 in Lagos, Nigeria, from 2-4 September 2026, connecting with aviation, tourism, investment and industry.
              </p>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   2–4 September 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Lagos, Nigeria
                </span>
              </div>
            </div>
            <Link className="btn btn-primary event-register-btn" href="/contact">
              Contact Us
            </Link>
          </div>
          <div className="event-item glass-panel reveal">
            <div className="event-date-box">
              <span className="event-month">
                SEP
              </span>
              <span className="event-day">
                09–10
              </span>
              <span className="event-year">
                2026
              </span>
            </div>
            <div className="event-details">
              <span className="event-type-badge badge-blue">
                Expo
              </span>
              <h3>
                Aviation Africa 2026
              </h3>
              <p>
                ARLink28 will be participating in Aviation Africa 2026 in Nairobi, Kenya, engaging with key aviation stakeholders, airlines, and industry partners.
              </p>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   9–10 September 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Sarit Expo Centre, Nairobi, Kenya
                </span>
              </div>
            </div>
            <Link className="btn btn-primary event-register-btn" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <section className="engage-info-section" id="developments">
        <div className="engage-info-inner">
          <div className="about-tag-row">
            <span className="about-tag">
              ARLink28 Developments
            </span>
            <span className="about-tag-line"></span>
          </div>
          <h2>
            Addis Ababa Identified as a 
            <span className="highlight-red">
              Long-Term Strategic Aviation Hub
            </span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            Building toward an East African aviation future.
          </p>
          <p style={{ marginTop: '20px' }}>
            ARLink28 has identified Addis Ababa, Ethiopia, as an important long-term strategic location within the company's future aviation development plans. Ethiopia's geographic position, established aviation ecosystem and connectivity across Africa and international markets make Addis Ababa strategically relevant to ARLink28's longer-term ambitions.
          </p>
          <p>
            The company's immediate focus remains on building the commercial, corporate, regulatory, travel and partnership foundations required before future airline operations can begin.
          </p>
          <div className="engage-disclaimer">
            <i className="fa-solid fa-circle-info"></i>
            <p>
              ARLink28 is not currently operating flights from Addis Ababa. The location is a future strategic aviation hub under development and assessment, rather than an operational base.
            </p>
          </div>
        </div>
      </section>
      <section className="engage-info-section alt" id="sustainability">
        <div className="engage-info-inner">
          <div className="about-tag-row">
            <span className="about-tag">
              Our Sustainability Direction
            </span>
            <span className="about-tag-line"></span>
          </div>
          <h2>
            Sustainability 
            <span className="highlight-red">
              From the Beginning
            </span>
          </h2>
          <p style={{ marginTop: '20px' }}>
            ARLink28 recognises that the future of African aviation must combine greater connectivity with greater environmental responsibility. Our sustainability strategy is being developed alongside our wider aviation roadmap and informed by continued industry engagement, including participation in the Sustainable Skies World Summit in both 2025 and 2026.
          </p>
          <p>
            ARLink28 is developing its long-term sustainability framework, including the potential future use of Sustainable Aviation Fuel, operational-efficiency measures and emerging low-emission aviation technologies.
          </p>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
            The company is studying developments across:
          </p>
          <ul className="engage-check-list">
            <li>
              Sustainable Aviation Fuel
            </li>
            <li>
              Aircraft efficiency
            </li>
            <li>
              Lower-emission aviation technologies
            </li>
            <li>
              Operational efficiency
            </li>
            <li>
              Carbon-reduction frameworks
            </li>
            <li>
              Emerging zero-emission propulsion
            </li>
            <li>
              Future aircraft technology
            </li>
            <li>
              Responsible route and network planning
            </li>
          </ul>
        </div>
      </section>
      <section className="engage-info-section" id="private-aviation">
        <div className="engage-info-inner">
          <div className="about-tag-row">
            <span className="about-tag">
              Private Aviation Development
            </span>
            <span className="about-tag-line"></span>
          </div>
          <h2>
            ARLink28 Elite — 
            <span className="highlight-red">
              Private Aviation Development
            </span>
          </h2>
          <p style={{ marginTop: '20px' }}>
            ARLink28 is developing a dedicated premium private-aviation offering focused exclusively on Africa. Through ARLink28 Elite, the company is exploring bespoke charter access, executive travel and VIP aviation solutions delivered in collaboration with appropriately licensed aircraft operators and aviation partners.
          </p>
          <p>
            The development forms part of ARLink28's wider objective of serving different segments of African mobility, from commercial travel to premium and executive aviation.
          </p>
          <span className="engage-soon-badge">
            <i className="fa-solid fa-clock"></i>
             Coming Soon
          </span>
        </div>
      </section>
      <section className="engage-info-section alt" id="partnerships">
        <div className="engage-info-inner">
          <div className="about-tag-row">
            <span className="about-tag">
              Travel & Tourism Partnerships
            </span>
            <span className="about-tag-line"></span>
          </div>
          <h2>
            Connecting Aviation and 
            <span className="highlight-red">
              African Tourism
            </span>
          </h2>
          <p style={{ marginTop: '20px' }}>
            ARLink28's vision extends beyond transportation alone. Through selected hospitality and tourism partnerships, we are developing African travel experiences that connect flights, accommodation, transfers and destination experiences.
          </p>
          <p>
            Current development includes our partnership with Blue Ocean Resort & Residences in Zanzibar, alongside other premium African hospitality relationships and travel products currently under development.
          </p>
          <p>
            This approach supports one of ARLink28's central objectives: making it easier for Africans and international travellers to experience more of the continent.
          </p>
        </div>
      </section>
      <section className="engage-info-section" id="current-stage">
        <div className="engage-info-inner">
          <div className="about-tag-row">
            <span className="about-tag">
              ARLink28's Current Stage
            </span>
            <span className="about-tag-line"></span>
          </div>
          <h2>
            Building the 
            <span className="highlight-red">
              Foundation
            </span>
          </h2>
          <p style={{ marginTop: '20px' }}>
            ARLink28 is currently developing its African travel and aviation ecosystem in phases. Our current activities include:
          </p>
          <ul className="engage-check-list">
            <li>
              Commercial flight-booking services through established travel platforms
            </li>
            <li>
              Hotel and accommodation partnerships
            </li>
            <li>
              Holiday-package development
            </li>
            <li>
              African tourism partnerships
            </li>
            <li>
              Corporate and executive travel development
            </li>
            <li>
              Private aviation and charter-access exploration
            </li>
            <li>
              Aviation-industry engagement
            </li>
            <li>
              Corporate expansion across selected African markets
            </li>
            <li>
              Regulatory preparation
            </li>
            <li>
              Market research and data collection
            </li>
            <li>
              Long-term airline planning
            </li>
          </ul>
          <div className="engage-disclaimer">
            <i className="fa-solid fa-circle-info"></i>
            <p>
              ARLink28 is not currently operating its own scheduled commercial flights or private aircraft.
            </p>
          </div>
        </div>
      </section>
      <section className="opp-section" id="stay-connected">
        <div className="section-header reveal">
          <span className="section-tag">
            Stay Connected
          </span>
          <h2>
            Follow 
            <span className="highlight-red">
              Our Journey
            </span>
          </h2>
          <p>
            Follow our story, read the latest aviation news, and connect with fellow travelers who are part of the ARLink28 family.
          </p>
        </div>
        <div className="engage-hero-socials glass-panel reveal" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h4>
            <i className="fa-solid fa-signal" style={{ color: 'var(--primary-red)', marginRight: '8px' }}></i>
            Follow Our Journey
          </h4>
          <div className="engage-social-row">
            <a className="engage-social-card" href="https://www.instagram.com/fly_arlink28?igsh=dnpyYTkzcXZrc3J0" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
              <span>
                Instagram
              </span>
              <small>
                @fly_arlink28
              </small>
            </a>
            <a className="engage-social-card" href="https://www.tiktok.com/@fly_arlink28?_r=1&_t=ZS-97TMxBPfuAU" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-tiktok"></i>
              <span>
                TikTok
              </span>
              <small>
                @fly_arlink28
              </small>
            </a>
          </div>
          <div className="engage-community-stat">
            <div>
              <span className="engage-stat-num">
                2K+
              </span>
              <span>
                Followers
              </span>
            </div>
            <div>
              <span className="engage-stat-num">
                800+
              </span>
              <span>
                Community Members
              </span>
            </div>
            <div>
              <span className="engage-stat-num">
                50+
              </span>
              <span>
                Stories Shared
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-adventure">
        <div className="cta-banner reveal-scale">
          <div className="cta-content">
            <h2>
              Ready For Your
              <br />
              Next Adventure?
            </h2>
            <p>
              Search, compare, and book flights at the best rates. Affordable travel, trusted airlines.
            </p>
            <Link className="btn btn-primary" href="/book/flight">
              Book Flight Tickets
              <i className="fa-solid fa-plane"></i>
            </Link>
          </div>
          <div className="cta-visual">
            <img alt="ARLinks Airplane" className="cta-plane" decoding="async" height="350" loading="lazy" src="/images/IMG_5238.png" width="580" style={{ color: 'transparent', width: '130%', height: 'auto', objectFit: 'contain' }} />
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
              <input aria-label="Email for newsletter" placeholder="Enter your email address" required type="email" />
              <button type="submit">
                Subscribe
              </button>
            </form>
            <div className="newsletter-agree">
              <input id="newsletter-check" required type="checkbox" />
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
