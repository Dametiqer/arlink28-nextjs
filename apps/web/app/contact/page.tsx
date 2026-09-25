import type { Metadata } from "next";
import "../styles/content-shared.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "ARLinks - Premium African Aviation",
  description: "Connecting you to the world with affordable, premium flights. ARLink28 — Africa's next great airline.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="page-hero-content">
          <span className="page-hero-tag hero-tag-entrance">
            <i className="fa-solid fa-circle" style={{ fontSize: '8px', color: 'var(--primary-red)', marginRight: '8px' }}></i>
            We're Here To Help
          </span>
          <h1 className="hero-h1-entrance">
            Get In 
            <span className="highlight-red">
              Touch With Us
            </span>
          </h1>
          <p className="hero-p-entrance">
            Whether you need help with a booking, have a business inquiry, want to explore a partnership, or simply want to say hello — we'd love to hear from you.
          </p>
          <div className="contact-quick-links hero-btn-entrance">
            <a href="#form" className="contact-quick-btn">
              <i className="fa-solid fa-envelope"></i>
              <span>
                Send Message
              </span>
            </a>
            <a href="tel:+2347047009128" className="contact-quick-btn">
              <i className="fa-solid fa-phone"></i>
              <span>
                Call Us
              </span>
            </a>
            <a href="https://wa.me/2347047009128" className="contact-quick-btn">
              <i className="fa-brands fa-whatsapp"></i>
              <span>
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </section>
      <section className="contact-info-section">
        <div className="contact-info-grid">
          <div className="contact-info-card glass-panel reveal">
            <div className="cinfo-icon">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h3>
              Phone
            </h3>
            <p>
              Our support team is available Mon–Sat, 8am–8pm WAT
            </p>
            <a href="tel:+2347047009128" className="cinfo-link">
              +234 704 700 9128 (Nigeria)
            </a>
            <a href="tel:+447539071257" className="cinfo-link">
              +44 753 907 1257 (UK)
            </a>
          </div>
          <div className="contact-info-card glass-panel reveal">
            <div className="cinfo-icon">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h3>
              Email
            </h3>
            <p>
              Send us an email and we'll respond within 24 hours on business days
            </p>
            <a href="mailto:support@arlinks.com" className="cinfo-link">
              support@arlinks.com
            </a>
            <a href="mailto:investors@arlink28.com" className="cinfo-link">
              investors@arlink28.com
            </a>
            <a href="mailto:partners@arlink28.com" className="cinfo-link">
              partners@arlink28.com
            </a>
            <a href="mailto:careers@arlink28.com" className="cinfo-link">
              careers@arlink28.com
            </a>
          </div>
          <div className="contact-info-card glass-panel reveal">
            <div className="cinfo-icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3>
              Offices
            </h3>
            <p>
              We operate from two locations
            </p>
            <span className="cinfo-link">
              2nd Floor, Office 316B, Mulliner Towers, 39 Alfred Rewane Road, Ikoyi, Lagos, Nigeria 101233
            </span>
            <span className="cinfo-link">
              71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom
            </span>
          </div>
          <div className="contact-info-card glass-panel reveal">
            <div className="cinfo-icon">
              <i className="fa-solid fa-whatsapp"></i>
            </div>
            <h3>
              WhatsApp
            </h3>
            <p>
              Chat with us directly on WhatsApp for quick responses
            </p>
            <a href="https://wa.me/2347047009128" className="cinfo-link">
              +234 704 700 9128
            </a>
          </div>
        </div>
      </section>
      <section className="contact-main-section" id="form">
        <div className="contact-main-container">
          <div className="contact-form-panel glass-panel reveal-left">
            <div className="contact-form-header">
              <h2>
                Send Us a Message
              </h2>
              <p>
                Fill in the form and our team will get back to you within 24 hours.
              </p>
            </div>
            <div className="enquiry-tabs">
              <button className="enquiry-tab active">
                General
              </button>
              <button className="enquiry-tab">
                Booking Help
              </button>
              <button className="enquiry-tab">
                Partnership
              </button>
              <button className="enquiry-tab">
                Career
              </button>
              <button className="enquiry-tab">
                Investor
              </button>
            </div>
            <form className="contact-form" id="contact-form">
              <input type="hidden" name="enquiry_type" defaultValue="general" />
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first-name">
                    First Name *
                  </label>
                  <input type="text" id="first-name" placeholder="John" required name="first_name" />
                </div>
                <div className="form-group">
                  <label htmlFor="last-name">
                    Last Name *
                  </label>
                  <input type="text" id="last-name" placeholder="Doe" required name="last_name" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">
                  Email Address *
                </label>
                <input type="email" id="contact-email" placeholder="you@example.com" required name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">
                  Phone Number
                </label>
                <input type="tel" id="contact-phone" placeholder="+234 800 000 0000" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">
                  Subject *
                </label>
                <input type="text" id="contact-subject" placeholder="How can we help you?" required name="subject" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">
                  Message *
                </label>
                <textarea id="contact-message" name="message" rows={5} placeholder="Tell us more about your enquiry..." required></textarea>
              </div>
              <div className="form-group form-checkbox-row">
                <input type="checkbox" id="form-consent" required />
                <label htmlFor="form-consent">
                  I agree to the 
                  <Link href="/privacy-policy">
                    privacy policy
                  </Link>
                   and consent to being contacted regarding my enquiry.
                </label>
              </div>
              <button type="submit" className="btn btn-primary contact-submit-btn">
                <span>
                  Send Message
                </span>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
          <div className="contact-side-panel reveal-right">
            <div className="contact-side-card glass-panel">
              <h3>
                <i className="fa-solid fa-clock" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i>
                Office Hours
              </h3>
              <div className="hours-list">
                <div className="hours-row">
                  <span>
                    Monday – Friday
                  </span>
                  <span>
                    08:00 – 20:00 WAT
                  </span>
                </div>
                <div className="hours-row">
                  <span>
                    Saturday
                  </span>
                  <span>
                    09:00 – 18:00 WAT
                  </span>
                </div>
                <div className="hours-row">
                  <span>
                    Sunday
                  </span>
                  <span>
                    Urgent Support Only
                  </span>
                </div>
                <div className="hours-row highlight">
                  <span>
                    24/7 Emergency Line
                  </span>
                  <span className="hours-green">
                    Always Active
                  </span>
                </div>
              </div>
            </div>
            <div className="contact-side-card glass-panel">
              <h3>
                <i className="fa-solid fa-bolt" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i>
                Response Times
              </h3>
              <div className="response-list">
                <div className="response-item">
                  <div className="response-bar" style={{ "--fill": '95%' } as React.CSSProperties}></div>
                  <div className="response-label">
                    <span>
                      General Enquiries
                    </span>
                    <span>
                      Within 24h
                    </span>
                  </div>
                </div>
                <div className="response-item">
                  <div className="response-bar" style={{ "--fill": '100%' } as React.CSSProperties}></div>
                  <div className="response-label">
                    <span>
                      Booking Support
                    </span>
                    <span>
                      Within 2h
                    </span>
                  </div>
                </div>
                <div className="response-item">
                  <div className="response-bar" style={{ "--fill": '80%' } as React.CSSProperties}></div>
                  <div className="response-label">
                    <span>
                      Partnership
                    </span>
                    <span>
                      Within 48h
                    </span>
                  </div>
                </div>
                <div className="response-item">
                  <div className="response-bar" style={{ "--fill": '70%' } as React.CSSProperties}></div>
                  <div className="response-label">
                    <span>
                      Investor Deck
                    </span>
                    <span>
                      Within 72h
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-side-card glass-panel">
              <h3>
                <i className="fa-solid fa-share-nodes" style={{ color: 'var(--primary-red)', marginRight: '10px' }}></i>
                Follow ARLink28
              </h3>
              <div className="contact-socials">
                <a href="https://www.instagram.com/fly_arlink28?igsh=dnpyYTkzcXZrc3J0" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                  <i className="fa-brands fa-instagram"></i>
                  <span>
                    Instagram
                  </span>
                </a>
                <a href="https://www.tiktok.com/@fly_arlink28?_r=1&_t=ZS-97TMxBPfuAU" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                  <i className="fa-brands fa-tiktok"></i>
                  <span>
                    TikTok
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="opp-section" id="faq">
        <div className="section-header reveal">
          <span className="section-tag">
            FAQs
          </span>
          <h2>
            Frequently Asked 
            <span className="highlight-red">
              Questions
            </span>
          </h2>
          <p>
            Quick answers to the most common questions we receive.
          </p>
        </div>
        <div className="faq-list">
          <div className="faq-item glass-panel reveal">
            <button className="faq-question">
              <span>
                How do I book a flight with ARLinks?
              </span>
              <i className="fa-solid fa-chevron-down faq-icon"></i>
            </button>
            <div className="faq-answer">
              <p>
                You can book directly through our homepage booking widget. Select your departure, destination, date, and seat type, then click "Search Flight." Our team will confirm your booking and send ticket details to your email within minutes.
              </p>
            </div>
          </div>
          <div className="faq-item glass-panel reveal">
            <button className="faq-question">
              <span>
                Can I change or cancel my booking?
              </span>
              <i className="fa-solid fa-chevron-down faq-icon"></i>
            </button>
            <div className="faq-answer">
              <p>
                Yes. Contact our support team via phone or email with your booking reference. Changes and cancellations are subject to the airline's individual policy. Our team will guide you through the process and any applicable fees.
              </p>
            </div>
          </div>
          <div className="faq-item glass-panel reveal">
            <button className="faq-question">
              <span>
                How do I apply for a career opportunity?
              </span>
              <i className="fa-solid fa-chevron-down faq-icon"></i>
            </button>
            <div className="faq-answer">
              <p>
                Visit our Opportunities page to see current openings. Click "Apply Now" on your preferred role and fill in the contact form specifying the role. We aim to respond to all applications within 5 business days.
              </p>
            </div>
          </div>
          <div className="faq-item glass-panel reveal">
            <button className="faq-question">
              <span>
                How can I invest in or partner with ARLink28?
              </span>
              <i className="fa-solid fa-chevron-down faq-icon"></i>
            </button>
            <div className="faq-answer">
              <p>
                Use the contact form above selecting "Investor" or "Partnership" as your enquiry type, or email us at partnerships@arlinks.com. We'll arrange a private briefing and share our investor deck within 72 hours of your enquiry.
              </p>
            </div>
          </div>
          <div className="faq-item glass-panel reveal">
            <button className="faq-question">
              <span>
                Does ARLinks offer group booking discounts?
              </span>
              <i className="fa-solid fa-chevron-down faq-icon"></i>
            </button>
            <div className="faq-answer">
              <p>
                Yes. For groups of 10 or more passengers, we offer preferential pricing and dedicated booking support. Contact our team directly and we'll prepare a tailored group quote within 24 hours.
              </p>
            </div>
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
