import type { Metadata } from "next";
import "../styles/services.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "ARLinks - Premium African Aviation",
  description: "Connecting you to the world with affordable, premium flights. ARLink28 — Africa's next great airline.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="service-hero">
        <div className="service-hero-content">
          <span className="service-hero-tag hero-tag-entrance">
            <i className="fa-solid fa-circle" style={{ fontSize: '8px', marginRight: '8px' }}></i>
            Our Services
          </span>
          <h1 className="hero-h1-entrance">
            Seamless Travel,
            <br />
            <span className="highlight-red">
              End to End.
            </span>
          </h1>
          <p className="hero-p-entrance">
            From flight booking and hotel reservations to airport transfers, visa support, holiday packages, and travel insurance — ARLink28 covers every step of your journey.
          </p>
        </div>
      </section>
      <section className="core-services-section">
        <div className="services-title-wrapper">
          <span className="services-tag">
            What We Offer
          </span>
        </div>
        <div className="services-block-container">
          <div id="flight-booking" className="service-block-row reveal">
            <div className="service-block-img-box">
              <img src="/images/flightbooking.png" alt="Flight Booking" className="service-block-img" />
            </div>
            <div className="service-block-text-box">
              <h3>
                Flight Booking
              </h3>
              <h4>
                Domestic & International Flights
              </h4>
              <p>
                Our core service. We connect you to hundreds of domestic and international routes with real-time pricing, flexible travel dates, and instant booking confirmation. Whether you're flying within Nigeria or across continents, we find the best available fares.
              </p>
              <div className="service-features-list-wrapper">
                <h5>
                  What's Included
                </h5>
                <ul className="service-features-list">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Instant Confirmation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Price Guarantee
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Multiple Airlines
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Flexible Dates
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Group Bookings
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    24/7 Support
                  </li>
                </ul>
              </div>
              <Link className="btn btn-primary service-cta-btn" href="/book/flight">
                Get Started 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div id="hotel-reservations" className="service-block-row row-reverse reveal">
            <div className="service-block-img-box" style={{ background: 'linear-gradient(135deg, #0b121c 0%, #141d2b 100%)' }}>
              <img src="/images/hotelreservations.png" alt="Hotel Reservations" className="service-block-img" style={{ objectFit: 'contain' }} />
            </div>
            <div className="service-block-text-box">
              <h3>
                Hotel Reservations
              </h3>
              <h4>
                Curated Accommodation Worldwide
              </h4>
              <p>
                From boutique hotels to five-star resorts, we handpick accommodations that match your budget and travel style. Book your hotel alongside your flight for maximum convenience and special bundled rates.
              </p>
              <div className="service-features-list-wrapper">
                <h5>
                  What's Included
                </h5>
                <ul className="service-features-list">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Hand-Picked Hotels
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Best Rate Guarantee
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Instant Booking
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Bundle Savings
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Free Cancellation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Worldwide Coverage
                  </li>
                </ul>
              </div>
              <Link className="btn btn-primary service-cta-btn" href="/book/flight">
                Get Started 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div id="travel-insurance" className="service-block-row reveal">
            <div className="service-block-img-box">
              <img src="/images/travelinsurance.png" alt="Travel Insurance" className="service-block-img" />
            </div>
            <div className="service-block-text-box">
              <h3>
                Travel Insurance
              </h3>
              <h4>
                Comprehensive Travel Protection
              </h4>
              <p>
                Travel with complete peace of mind. Our insurance plans cover medical emergencies, trip cancellations, lost luggage, and flight delays — so nothing can ruin your journey.
              </p>
              <div className="service-features-list-wrapper">
                <h5>
                  What's Included
                </h5>
                <ul className="service-features-list">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Medical Coverage
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Trip Cancellation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Lost Luggage
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Flight Delay
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Emergency Repatriation
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    24/7 Assistance
                  </li>
                </ul>
              </div>
              <Link className="btn btn-primary service-cta-btn" href="/book/flight">
                Get Started 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div id="airport-transfers" className="service-block-row row-reverse reveal">
            <div className="service-block-img-box">
              <img src="/images/airporttransfer.png" alt="Airport Transfers" className="service-block-img" />
            </div>
            <div className="service-block-text-box">
              <h3>
                Airport Transfers
              </h3>
              <h4>
                Seamless Ground Transportation
              </h4>
              <p>
                Arrive and depart stress-free. Our airport transfer service ensures punctual, professional pickup and drop-off so you can focus on your journey, not logistics.
              </p>
              <div className="service-features-list-wrapper">
                <h5>
                  What's Included
                </h5>
                <ul className="service-features-list">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Professional Drivers
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Meet & Greet
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Flight Tracking
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Luxury Vehicles
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Group Transfers
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Fixed Pricing
                  </li>
                </ul>
              </div>
              <Link className="btn btn-primary service-cta-btn" href="/book/flight">
                Get Started 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div id="holiday-packages" className="service-block-row reveal">
            <div className="service-block-img-box">
              <img src="/images/holidaypackage.png" alt="Holiday Packages" className="service-block-img" />
            </div>
            <div className="service-block-text-box">
              <h3>
                Holiday Packages
              </h3>
              <h4>
                All-Inclusive Travel Experiences
              </h4>
              <p>
                Let us take care of everything. Our holiday packages combine flights, hotels, transfers, and curated experiences into one seamless booking. Simply choose your destination and we handle the rest.
              </p>
              <div className="service-features-list-wrapper">
                <h5>
                  What's Included
                </h5>
                <ul className="service-features-list">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    All-Inclusive Options
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Curated Experiences
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Group Discounts
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Flexible Dates
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Custom Itineraries
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Dedicated Planner
                  </li>
                </ul>
              </div>
              <Link className="btn btn-primary service-cta-btn" href="/book/flight">
                Get Started 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div id="corporate-group-travel" className="service-block-row row-reverse reveal">
            <div className="service-block-img-box" style={{ background: 'linear-gradient(135deg, #0b121c 0%, #141d2b 100%)' }}>
              <img src="/images/coorporateandgrouptravelsolution.png" alt="Corporate & Group Travel" className="service-block-img" style={{ objectFit: 'contain' }} />
            </div>
            <div className="service-block-text-box">
              <h3>
                Corporate & Group Travel Solutions
              </h3>
              <h4>
                For Businesses, Schools, Organisations & Conferences
              </h4>
              <p>
                We handle travel logistics for corporates, schools, NGOs, and conference delegations. From bulk flight bookings to coordinated transfers and accommodation, we make group travel effortless and cost-efficient.
              </p>
              <div className="service-features-list-wrapper">
                <h5>
                  What's Included
                </h5>
                <ul className="service-features-list">
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Bulk Flight Bookings
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Group Hotel Rates
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Dedicated Account Manager
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Invoice & PO Support
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Conference Logistics
                  </li>
                  <li>
                    <i className="fa-solid fa-check"></i>
                    Custom Travel Policies
                  </li>
                </ul>
              </div>
              <Link className="btn btn-primary service-cta-btn" href="/book/flight">
                Get Started 
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="service-why-choose-section">
        <div className="why-choose-header reveal">
          <h2>
            Why Choose 
            <span className="highlight-red">
              ARLink28
            </span>
          </h2>
        </div>
        <div className="why-choose-grid">
          <div className="why-card reveal">
            <i className="fa-solid fa-shield-halved why-card-icon"></i>
            <h4>
              Fully Licensed
            </h4>
            <p>
              Regulated and certified to operate across African and international routes.
            </p>
          </div>
          <div className="why-card reveal">
            <i className="fa-solid fa-headset why-card-icon"></i>
            <h4>
              24/7 Support
            </h4>
            <p>
              Round-the-clock assistance for bookings, changes, and emergencies.
            </p>
          </div>
          <div className="why-card reveal">
            <i className="fa-solid fa-tag why-card-icon"></i>
            <h4>
              Best Prices
            </h4>
            <p>
              Competitive fares with no hidden fees. Always.
            </p>
          </div>
          <div className="why-card reveal">
            <i className="fa-solid fa-bolt why-card-icon"></i>
            <h4>
              Instant Booking
            </h4>
            <p>
              Confirmed tickets delivered to your inbox in minutes.
            </p>
          </div>
          <div className="why-card reveal">
            <i className="fa-solid fa-leaf why-card-icon"></i>
            <h4>
              Eco-Friendly
            </h4>
            <p>
              We offset carbon for every flight booked through our platform.
            </p>
          </div>
        </div>
      </section>
      <section className="cta-adventure">
        <div className="cta-banner reveal-scale">
          <div className="cta-content">
            <h2>
              Book Your
              <br />
              Perfect Trip Today
            </h2>
            <p>
              Compare fares, choose your service, and let ARLink28 handle the rest. Stress-free travel starts here.
            </p>
            <Link className="btn btn-primary" href="/book/flight">
              Get Started
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
