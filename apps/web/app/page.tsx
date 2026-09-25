import type { Metadata } from "next";
import "./styles/home-inline.css";

import Link from "next/link";
import BookingWidget from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "ARLinks - Premium African Aviation",
  description:
    "Connecting you to the world with affordable, premium flights. ARLink28 — Africa's next great airline.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-main">
          <div className="hero-content">
            <span className="section-tag hero-tag-entrance">
              WITHIN AFRICA & BEYOND
            </span>
            <h1 className="hero-h1-entrance">
              WE CONNECT 
              <br />
              <span className="highlight-red">
                EVERY JOURNEY.
              </span>
            </h1>
            <p className="hero-p-entrance">
              Flight tickets to domestic and international flights at cheap prices. Where do you want to go?
            </p>
            <Link href="/book/flight" className="btn btn-primary hero-btn-entrance">
              Book Flight 
              <i className="fa-solid fa-plane"></i>
            </Link>
          </div>
          <div className="hero-visual hero-visual-entrance">
            <img alt="ARLinks Africa Route Map" width="550" height="450" decoding="async" className="hero-map" src="/images/HERO.png" style={{ color: 'transparent', width: '100%', maxWidth: '550px', height: 'auto' }} />
          </div>
        </div>
        <BookingWidget />

      </section>
      <section className="why-choose-us" id="features">
        <div className="section-header reveal">
          <span className="why-choose-badge">
            Why Choose ARLink28 
            <i className="fa-solid fa-plane"></i>
          </span>
          <h2>
            Your 
            <span className="highlight-red">
              Journey
            </span>
             Starts Here
          </h2>
          <p>
            Whether you're traveling for business, family visits, education, tourism, or special occasions, ARLink28 makes flight booking simple, affordable, and stress-free.
            <br />
            We help travelers find the right flights, save time, and enjoy a seamless booking experience from departure to arrival.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card glass-panel reveal">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <circle cx="11.5" cy="14.5" r="2.5"></circle>
                <line x1="13.25" y1="16.25" x2="16" y2="19"></line>
              </svg>
            </div>
            <h3>
              Find the Best Flight Deals
            </h3>
            <p>
              Compare routes and fares from trusted airlines to secure the best value for your trip.
            </p>
          </div>
          <div className="feature-card glass-panel reveal">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <circle cx="8" cy="14" r="1"></circle>
                <circle cx="12" cy="14" r="1"></circle>
                <circle cx="16" cy="14" r="1"></circle>
                <circle cx="8" cy="18" r="1"></circle>
                <circle cx="12" cy="18" r="1"></circle>
                <circle cx="16" cy="18" r="1"></circle>
              </svg>
            </div>
            <h3>
              Flexible Travel Options
            </h3>
            <p>
              Choose from one-way, round-trip, and multi-city bookings tailored to your travel needs.
            </p>
          </div>
          <div className="feature-card glass-panel reveal">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>
              Secure Payments
            </h3>
            <p>
              Book with confidence using safe and reliable payment options.
            </p>
          </div>
          <div className="feature-card glass-panel reveal">
            <div className="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </div>
            <h3>
              24/7 Travel Assistance
            </h3>
            <p>
              Our support team is ready to assist before, during, and after your journey.
            </p>
          </div>
        </div>
        <div className="indicator-bar"></div>
      </section>
      <section className="popular-destinations" id="destinations">
        <div className="destination-header-row">
          <div className="section-header reveal">
            <span className="section-tag">
              Top Destinations
            </span>
            <h2>
              Popular Destination
            </h2>
            <p>
              Connect immediately to major business centers and leisure gateways. Here are our top-rated flight routes.
            </p>
          </div>
          <Link className="btn btn-secondary reveal" href="/destinations">
            View All Destinations
          </Link>
        </div>
        <div className="destinations-grid">
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Abuja.jpeg" alt="Abuja" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Abuja (ABV)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Lagos.jpeg" alt="Lagos" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Lagos (LOS)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Ghana_accra.jpg" alt="Ghana" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Ghana (ACC)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Kenya_nairobi.jpg" alt="Kenya" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Kenya (NBO)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Uganda_kampala.jpg" alt="Uganda" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Uganda (EBB)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Tanzania_daressalaam.jpg" alt="Tanzania" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Tanzania (DAR)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Dakar.jpg" alt="Dakar" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Dakar (DSS)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/ethiopia-addis-ababa.jpg" alt="Ethiopia" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Ethiopia (ADD)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/CapeTown.jpeg" alt="Cape Town" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Cape Town (CPT)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
          <Link className="destination-card reveal" href="/book/flight">
            <img src="/images/Gambia_flight.jpg" alt="Gambia" className="destination-img" />
            <div className="destination-overlay">
              <div className="destination-pin">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4>
                Flight to Gambia (BJL)
              </h4>
              <span className="book-now-link">
                Book Now
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="our-services-section" id="services">
        <div className="section-header reveal">
          <span className="section-tag">
            Our Services
          </span>
          <h2>
            Our Travel Services
          </h2>
          <p>
            Everything you need for a smooth and unforgettable journey
          </p>
        </div>
        <div className="services-grid-new">
          <div className="service-card-new glass-panel reveal">
            <div className="service-icon-wrapper-new">
              <i className="fa-solid fa-plane"></i>
            </div>
            <h3>
              Flight Booking
            </h3>
            <p>
              Quick and reliable ticket booking across domestic and international routes.
            </p>
            <Link className="service-learn-more" href="/services#flight-booking">
              Learn More 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-card-new glass-panel reveal">
            <div className="service-icon-wrapper-new">
              <i className="fa-solid fa-hotel"></i>
            </div>
            <h3>
              Hotel Reservation
            </h3>
            <p>
              Comfortable and hand-picked accommodations wherever your flight takes you.
            </p>
            <Link className="service-learn-more" href="/services#hotel-reservations">
              Learn More 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-card-new glass-panel reveal">
            <div className="service-icon-wrapper-new">
              <i className="fa-solid fa-passport"></i>
            </div>
            <h3>
              Visa Assistance
            </h3>
            <p>
              Expert guidance on visa applications, documentation, and processing.
            </p>
            <Link className="service-learn-more" href="/services#travel-insurance">
              Learn More 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-card-new glass-panel reveal">
            <div className="service-icon-wrapper-new">
              <i className="fa-solid fa-car"></i>
            </div>
            <h3>
              Airport Transfers
            </h3>
            <p>
              Seamless and punctual airport pickup and drop-off services.
            </p>
            <Link className="service-learn-more" href="/services#airport-transfers">
              Learn More 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-card-new glass-panel reveal">
            <div className="service-icon-wrapper-new">
              <i className="fa-solid fa-umbrella-beach"></i>
            </div>
            <h3>
              Holiday Packages
            </h3>
            <p>
              All-inclusive travel packages curated for your perfect holiday experience.
            </p>
            <Link className="service-learn-more" href="/services#holiday-packages">
              Learn More 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-card-new glass-panel reveal">
            <div className="service-icon-wrapper-new">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3>
              Travel Insurance
            </h3>
            <p>
              Comprehensive travel insurance plans for worry-free journeys.
            </p>
            <Link className="service-learn-more" href="/services">
              Learn More 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="featured-travel-container">
          <div className="featured-travel-header-row">
            <div className="section-header reveal" style={{ textAlign: 'left', margin: '0' }}>
              <span className="section-tag">
                Featured Trips
              </span>
              <h2>
                Featured Travel
              </h2>
            </div>
            <Link className="btn btn-secondary reveal" href="/travel">
              View All Trips
            </Link>
          </div>
          <div className="featured-travel-grid">
            <div className="featured-travel-card reveal">
              <div className="featured-travel-img-wrapper">
                <img src="/images/Lagoslondon.jpeg" alt="Lagos to Ghana" className="featured-travel-img" />
                <span className="featured-travel-duration">
                  7 Days
                </span>
              </div>
              <div className="featured-travel-content">
                <h3>
                  Lagos to Ghana
                </h3>
                <p>
                  Direct flights with premium amenities. Business and economy class available daily.
                </p>
                <div className="featured-travel-card-footer">
                  <div className="featured-travel-price">
                    $499
                    <span>
                      From
                    </span>
                  </div>
                  <Link className="featured-travel-btn" href="/book/flight">
                    Book Now 
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="featured-travel-card reveal">
              <div className="featured-travel-img-wrapper">
                <img src="/images/Abujacity.jpeg" alt="Abuja City Break" className="featured-travel-img" />
                <span className="featured-travel-duration">
                  5 Days
                </span>
              </div>
              <div className="featured-travel-content">
                <h3>
                  Abuja City Break
                </h3>
                <p>
                  Explore Nigeria's capital with guided tours, luxury hotels, and cultural experiences.
                </p>
                <div className="featured-travel-card-footer">
                  <div className="featured-travel-price">
                    $199
                    <span>
                      From
                    </span>
                  </div>
                  <Link className="featured-travel-btn" href="/book/flight">
                    Book Now 
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="featured-travel-card reveal">
              <div className="featured-travel-img-wrapper">
                <img src="/images/zanzibar-escape-poster.jpg" alt="Zanzibar Escape" className="featured-travel-img" />
                <span className="featured-travel-duration">
                  5 Days / 4 Nights
                </span>
              </div>
              <div className="featured-travel-content">
                <h3>
                  Zanzibar Escape
                </h3>
                <p>
                  Unwind in Zanzibar's coastal paradise with Blue Ocean Resorts. Premium Sea View Room, Bed & Breakfast, & return transfers.
                </p>
                <div className="featured-travel-card-footer">
                  <div className="featured-travel-price">
                    $649
                    <span>
                      For 2 Adults
                    </span>
                  </div>
                  <a className="featured-travel-btn" href="https://blueoceanhotels.com" target="_blank" rel="noopener noreferrer">
                    Enquire Now 
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="featured-travel-card reveal">
              <div className="featured-travel-img-wrapper">
                <img src="/images/giraffe-manor-poster.jpg" alt="Giraffe Manor Experience" className="featured-travel-img" />
                <span className="featured-travel-duration">
                  3 Days / 2 Nights
                </span>
              </div>
              <div className="featured-travel-content">
                <h3>
                  Giraffe Manor Experience
                </h3>
                <p>
                  Create timeless family memories surrounded by elegance, heritage and the gentle giants of Giraffe Manor Nairobi.
                </p>
                <div className="featured-travel-card-footer">
                  <div className="featured-travel-price">
                    $9,664
                    <span>
                      Per Family
                    </span>
                  </div>
                  <Link className="featured-travel-btn" href="/giraffe-manor">
                    Enquire Now 
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="customer-support-section reveal">
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
