import type { Metadata } from "next";
import "../styles/about-inline.css";

import "../styles/people.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "ARLinks - Premium African Aviation",
  description: "Connecting you to the world with affordable, premium flights. ARLink28 — Africa's next great airline.",
};

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-tag hero-tag-entrance">
            <i className="fa-solid fa-circle" style={{ fontSize: '8px', color: 'var(--primary-red)', marginRight: '8px' }}></i>
            About ARLink28
          </span>
          <h1 className="hero-h1-entrance">
            Connecting People
            <br />
            <span className="highlight-red">
              Connecting Destinations
            </span>
            <br />
            Connecting Dreams
          </h1>
          <p className="hero-p-entrance">
            A Pan-African travel ecosystem making travel across the continent more accessible, seamless, and efficient — built on connectivity, collaboration, and long-term commitment.
          </p>
          <div className="about-hero-actions hero-btn-entrance">
            <a className="btn btn-primary" href="#about">
              Discover Us
            </a>
            <a href="#" className="btn btn-secondary">
              <i className="fa-solid fa-play"></i>
               Watch our story
            </a>
          </div>
        </div>
      </section>
      <section className="about-section" id="about">
        <div className="about-who-we-are" style={{ gridTemplateColumns: '1fr', display: 'flex', justifyContent: 'center' }}>
          <div className="about-text-content reveal-left" style={{ maxWidth: '920px', textAlign: 'center', margin: '0 auto' }}>
            <div className="about-tag-row" style={{ justifyContent: 'center' }}>
              <span className="about-tag">
                Who we are
              </span>
              <span className="about-tag-line"></span>
            </div>
            <h2>
              A 
              <span className="highlight-red">
                Pan-African travel ecosystem
              </span>
               in development.
            </h2>
            <p>
              ARLink28 is building a comprehensive travel platform designed to simplify every stage of the travel journey — bringing together flight reservations, hotel bookings, holiday packages, visa support, accommodation, transportation, and future aviation operations under one ecosystem.
            </p>
            <p>
              Africa is home to more than 1.4 billion people and some of the world's fastest-growing economies, yet travel between many African countries remains unnecessarily difficult. ARLink28 was established to address this challenge by connecting Africa more efficiently and supporting greater mobility for business, tourism, education, investment, and cultural exchange.
            </p>
            <p>
              Through strategic partnerships with trusted travel agencies, visa specialists, hotels, destination providers, and technology partners across Africa, we aim to deliver an integrated travel experience from departure to arrival — and, as our ecosystem expands, artificial intelligence, data analytics, and cloud-based systems will power personalised recommendations and faster support.
            </p>
            <p>
              Our long-term vision extends into aviation. ARLink28 aspires to establish a regional airline based in Addis Ababa, Ethiopia — one of Africa's leading aviation gateways — to strengthen connectivity across East, West, Central, North, and Southern Africa.
            </p>
            <p>
              Whether an entrepreneur is attending a business conference in Kigali, a family is planning a holiday in Zanzibar, or a student is travelling to Accra for academic opportunities, ARLink28 provides a single platform where travel arrangements can be managed confidently and efficiently — from flights and hotels to airport transfers, travel insurance, and curated tour experiences.
            </p>
            <div className="about-actions" style={{ justifyContent: 'center' }}>
              <Link className="btn btn-about-primary" href="/contact">
                Get in touch
              </Link>
              <Link className="btn btn-about-secondary" href="/services">
                Our services
              </Link>
            </div>
          </div>
        </div>
        <div className="about-values-grid">
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <div className="value-info">
              <h4>
                Mission
              </h4>
              <p>
                To make travel within Africa more accessible, seamless, and efficient — connecting people, destinations, and opportunities through technology, partnerships, and exceptional service.
              </p>
            </div>
          </div>
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-eye"></i>
            </div>
            <div className="value-info">
              <h4>
                Vision
              </h4>
              <p>
                To become one of Africa's leading travel brands, building an integrated Pan-African travel ecosystem that strengthens regional mobility and connectivity.
              </p>
            </div>
          </div>
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <div className="value-info">
              <h4>
                Promises
              </h4>
              <p>
                We are committed to sustainable, responsible growth — supporting local employment, community engagement, and environmentally conscious travel practices.
              </p>
            </div>
          </div>
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="value-info">
              <h4>
                Core Value
              </h4>
              <ul className="value-list">
                <li>
                  Integrity
                </li>
                <li>
                  Connectivity
                </li>
                <li>
                  Collaboration
                </li>
                <li>
                  Innovation
                </li>
                <li>
                  Sustainability
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="about-values-grid">
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-mountain-sun"></i>
            </div>
            <div className="value-info">
              <h4>
                Tourism
              </h4>
              <p>
                We believe tourism is a catalyst for economic development, job creation, cultural exchange, and investment — collaborating with tourism boards, hospitality providers, and destination management organisations to showcase Africa's richness and diversity.
              </p>
            </div>
          </div>
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <div className="value-info">
              <h4>
                Sustainability
              </h4>
              <p>
                We are committed to promoting environmentally conscious travel practices, supporting local employment, engaging with communities, and exploring sustainable aviation practices that reduce the environmental impact of travel.
              </p>
            </div>
          </div>
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-handshake-angle"></i>
            </div>
            <div className="value-info">
              <h4>
                Partnerships
              </h4>
              <p>
                We build relationships with airlines, airports, hotels, governments, financial institutions, educational institutions, technology companies, and regional stakeholders who share our commitment to strengthening Africa's connectivity.
              </p>
            </div>
          </div>
          <div className="value-card reveal">
            <div className="value-icon-wrapper">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <div className="value-info">
              <h4>
                Aviation Strategy
              </h4>
              <p>
                Rather than pursuing rapid expansion, we are developing gradually through regional operations — building governance, regulatory compliance, financial discipline, and operational excellence before entering full airline operations.
              </p>
            </div>
          </div>
        </div>
        <div className="about-founder-container">
          <div className="founder-card-visual reveal-left">
            <div className="founder-image-wrapper">
              <img src="/images/pro1 1.png" alt="Ajay E. Salako" className="founder-img" />
              <div className="founder-name-tag">
                <h4>
                  Ajay E. Salako
                </h4>
                <p>
                  Founder & Tech VC
                </p>
              </div>
            </div>
          </div>
          <div className="founder-text-content reveal-right">
            <span className="founder-section-tag">
              Meet The Founder
            </span>
            <blockquote>
              "From early instinct, to field experience, to strategic vision — ARLink28 is the result of that progression."
            </blockquote>
            <p>
              ARLink28 was born from a deep, life-long fascination with aviation and travel. From early childhood, there was a natural curiosity about airplanes, flight routes, and how they connect different cultures.
            </p>
            <p>
              Growing up in Nigeria and moving abroad to the United Kingdom, that interest became a passion. Seeing how travel bridges distances, shapes careers, and connects people across continents made me want to create a platform that makes booking easier and more reliable.
            </p>
            <p>
              During my years in the UK, I gained valuable experience working in corporate travel, understanding the customer service and operations side of the business. This background gave me a clear perspective on what travelers really need.
            </p>
            <p>
              ARLink28 is designed to address those needs - providing safe, reliable, and affordable travel solutions for anyone flying within Africa or connecting globally.
            </p>
          </div>
        </div>
        <div className="meet-team-cta-banner">
          <span className="meet-team-cta-tag">Our Leadership &amp; Coordinators</span>
          <h3>
            Driven by Passionate <span className="highlight-red">Aviation &amp; Industry Experts</span>
          </h3>
          <p>
            Discover the accomplished leadership, advisory board, and key coordinators guiding ARLink28&rsquo;s strategy, finance, technology, partnerships, HR, and regional expansion across Africa.
          </p>
          <Link className="meet-team-cta-btn" href="/team">
            <i className="fa-solid fa-arrow-right"></i> Meet The Team
          </Link>
        </div>
        <div className="customer-support-section reveal" style={{ margin: '60px 0' }}>
          <div className="customer-support-inner">
            <div className="customer-support-img-wrapper">
              <img src="/images/customer-support-agent-v2.jpg" alt="24/7 Customer Support Agent" className="customer-support-img" />
            </div>
            <div className="customer-support-content">
              <div className="support-badge">
                <i className="fa-solid fa-headset"></i>
                 Always Here For You
              </div>
              <h2>
                24
                <span style={{ color: '#e61e2b' }}>
                  x
                </span>
                7 Customer Support
              </h2>
              <p>
                Our dedicated support team is available around the clock to assist you with flight bookings, itinerary changes, cancellations, and any travel-related queries. Whether it's 3 AM or 3 PM, we're just a call or message away.
              </p>
              <div className="support-features">
                <div className="support-feature-item">
                  <i className="fa-solid fa-phone-volume"></i>
                  <span>
                    Instant Phone Support
                  </span>
                </div>
                <div className="support-feature-item">
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>
                    WhatsApp Live Chat
                  </span>
                </div>
                <div className="support-feature-item">
                  <i className="fa-solid fa-envelope"></i>
                  <span>
                    Email Assistance
                  </span>
                </div>
                <div className="support-feature-item">
                  <i className="fa-solid fa-clock"></i>
                  <span>
                    No Waiting Time
                  </span>
                </div>
              </div>
              <Link className="btn btn-primary" href="/contact" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Contact Support 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section" style={{ paddingTop: '0' }}>
        <div className="trust-header reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h3>
            Travel has the power to 
            <span className="highlight-red">
              unite people
            </span>
            .
          </h3>
          <p>
            At ARLink28, we believe travel unlocks economic opportunities, fosters innovation, and strengthens relationships across borders. Our commitment is to make Africa more connected, more accessible, and more discoverable through an ecosystem built on professionalism, integrity, innovation, and service excellence.
          </p>
        </div>
      </section>
      <section className="partners-section reveal">
        <h3 className="partners-title">
          Meet our partners
        </h3>
        <div className="partners-card">
          <div className="partners-marquee">
            <img src="/images/travelstart.png" alt="Travelstart" className="partner-logo" />
            <img src="/images/ivisa.jpg" alt="iVisa" className="partner-logo" />
            <img src="/images/viator.jpg" alt="Viator" className="partner-logo" />
            <img src="/images/trip.png" alt="Trip.com" className="partner-logo" />
            <img src="/images/sherpa.png" alt="Sherpa" className="partner-logo" />
            <img src="/images/get your guide.png" alt="GetYourGuide" className="partner-logo" />
            <img src="/images/giraffe-manor-logo.jpg" alt="Giraffe Manor" className="partner-logo" />
            <img src="/images/blue-ocean-logo.png" alt="Blue Ocean Resort & Residences" className="partner-logo" />
            <img src="/images/travelstart.png" alt="Travelstart" className="partner-logo" />
            <img src="/images/ivisa.jpg" alt="iVisa" className="partner-logo" />
            <img src="/images/viator.jpg" alt="Viator" className="partner-logo" />
            <img src="/images/trip.png" alt="Trip.com" className="partner-logo" />
            <img src="/images/sherpa.png" alt="Sherpa" className="partner-logo" />
            <img src="/images/get your guide.png" alt="GetYourGuide" className="partner-logo" />
            <img src="/images/giraffe-manor-logo.jpg" alt="Giraffe Manor" className="partner-logo" />
            <img src="/images/blue-ocean-logo.png" alt="Blue Ocean Resort & Residences" className="partner-logo" />
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
                Stay updated with our latest offers
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
