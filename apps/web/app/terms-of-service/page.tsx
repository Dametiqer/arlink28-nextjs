import type { Metadata } from "next";
import "../styles/legal.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ARLink28",
  description: "The terms and conditions governing your use of the ARLink28 website and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <section className="legal-hero">
        <div className="legal-hero-inner">
          <div className="legal-hero-icon">
            <i className="fa-solid fa-file-contract"></i>
          </div>
          <span className="legal-hero-tag">
            Legal
          </span>
          <h1>
            Terms of Service
          </h1>
          <p>
            Last updated: 
            June 2026
          </p>
        </div>
      </section>
      <section className="legal-body">
        <div className="legal-layout">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <h5>
                On this page
              </h5>
              <ul className="legal-toc">
                <li>
                  <a href="#1-about-arlink28">
                    1. About ARLink28
                  </a>
                </li>
                <li>
                  <a href="#2-eligibility">
                    2. Eligibility
                  </a>
                </li>
                <li>
                  <a href="#3-account-responsibility">
                    3. Account Responsibility
                  </a>
                </li>
                <li>
                  <a href="#4-bookings-and-third-party-services">
                    4. Bookings and Third-Party Services
                  </a>
                </li>
                <li>
                  <a href="#5-payments">
                    5. Payments
                  </a>
                </li>
                <li>
                  <a href="#6-visa-and-travel-documentation">
                    6. Visa and Travel Documentation
                  </a>
                </li>
                <li>
                  <a href="#7-cancellations-and-refunds">
                    7. Cancellations and Refunds
                  </a>
                </li>
                <li>
                  <a href="#8-acceptable-use">
                    8. Acceptable Use
                  </a>
                </li>
                <li>
                  <a href="#9-intellectual-property">
                    9. Intellectual Property
                  </a>
                </li>
                <li>
                  <a href="#10-affiliate-and-partner-relationships">
                    10. Affiliate and Partner Relationships
                  </a>
                </li>
                <li>
                  <a href="#11-disclaimer-of-warranties">
                    11. Disclaimer of Warranties
                  </a>
                </li>
                <li>
                  <a href="#12-limitation-of-liability">
                    12. Limitation of Liability
                  </a>
                </li>
                <li>
                  <a href="#13-force-majeure">
                    13. Force Majeure
                  </a>
                </li>
                <li>
                  <a href="#14-termination">
                    14. Termination
                  </a>
                </li>
                <li>
                  <a href="#15-governing-law">
                    15. Governing Law
                  </a>
                </li>
                <li>
                  <a href="#16-changes-to-these-terms">
                    16. Changes to These Terms
                  </a>
                </li>
                <li>
                  <a href="#17-contact-information">
                    17. Contact Information
                  </a>
                </li>
              </ul>
            </div>
            <div className="legal-sidebar-card legal-nav-card">
              <h5>
                Legal & Policies
              </h5>
              <ul className="legal-cross-nav">
                <li>
                  <Link className="" href="/privacy-policy">
                    <i className="fa-solid fa-user-shield"></i>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="active" href="/terms-of-service">
                    <i className="fa-solid fa-file-contract"></i>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link className="" href="/refund-policy">
                    <i className="fa-solid fa-rotate-left"></i>
                    Refund & Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link className="" href="/affiliate-disclosure">
                    <i className="fa-solid fa-handshake"></i>
                    Affiliate Disclosure
                  </Link>
                </li>
                <li>
                  <Link className="" href="/cookie-policy">
                    <i className="fa-solid fa-cookie-bite"></i>
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link className="" href="/disclaimer">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="legal-panel glass-panel">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the ARLink28 website, applications, and services (together, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, please do not use the ARLink28 website or Services.
            </p>
            <h2 id="1-about-arlink28">
              1. About ARLink28
            </h2>
            <p>
              ARLink28 is a Pan-African travel ecosystem connecting travellers with flight bookings, hotel reservations, holiday packages, visa support services, tourism experiences, airport transfers, and future aviation operations across Africa.
            </p>
            <p>
              ARLink28 acts as a platform and, in many cases, as an intermediary connecting customers with third-party airlines, hotels, visa providers, and travel partners.
            </p>
            <h2 id="2-eligibility">
              2. Eligibility
            </h2>
            <p>
              To use our Services, you must be at least 18 years of age or be using the platform under the supervision of a parent or guardian. By using ARLink28, you confirm that you have the legal capacity to enter into these Terms.
            </p>
            <h2 id="3-account-responsibility">
              3. Account Responsibility
            </h2>
            <p>
              Where an account is required to access certain features, you are responsible for:
            </p>
            <ul className="legal-list">
              <li>
                Providing accurate and complete information
              </li>
              <li>
                Maintaining the confidentiality of your login credentials
              </li>
              <li>
                All activity that occurs under your account
              </li>
              <li>
                Notifying ARLink28 promptly of any unauthorised use
              </li>
            </ul>
            <h2 id="4-bookings-and-third-party-services">
              4. Bookings and Third-Party Services
            </h2>
            <p>
              Many bookings made through ARLink28 are fulfilled by third-party suppliers, including airlines, hotels, tour operators, and partners such as Sherpa, Viator, Trip.com, GetYourGuide, iVisa, and Travelstart.
            </p>
            <p>
              When you make a booking:
            </p>
            <ul className="legal-list">
              <li>
                You enter into a contract with the relevant supplier, subject to that supplier's own terms and conditions
              </li>
              <li>
                ARLink28 facilitates the transaction but is not the supplier of the underlying travel service
              </li>
              <li>
                Pricing, availability, and fare rules are determined by the supplier and may change without notice
              </li>
              <li>
                You are responsible for reviewing all booking details, fare conditions, and supplier terms before confirming a purchase
              </li>
            </ul>
            <h2 id="5-payments">
              5. Payments
            </h2>
            <p>
              All payments made through ARLink28 or its partner platforms must be made using accepted payment methods. You confirm that any payment information provided is accurate and that you are authorised to use the chosen payment method.
            </p>
            <p>
              ARLink28 reserves the right to cancel or refuse any booking suspected of fraud, error, or unauthorised use.
            </p>
            <h2 id="6-visa-and-travel-documentation">
              6. Visa and Travel Documentation
            </h2>
            <p>
              Where ARLink28 provides visa assistance or travel documentation support, you remain solely responsible for:
            </p>
            <ul className="legal-list">
              <li>
                Ensuring your passport, visa, and travel documents are valid and meet entry requirements
              </li>
              <li>
                Verifying requirements with the relevant embassy, consulate, or government authority
              </li>
              <li>
                Any consequences arising from incomplete, inaccurate, or outdated travel documentation
              </li>
            </ul>
            <p>
              ARLink28 does not guarantee visa approval, as this decision rests solely with the relevant government authority.
            </p>
            <h2 id="7-cancellations-and-refunds">
              7. Cancellations and Refunds
            </h2>
            <p>
              Cancellation and refund eligibility is governed by our 
              <Link href="/refund-policy" style={{ color: 'var(--primary-red)' }}>
                Refund & Cancellation Policy
              </Link>
              , as well as the policies of the relevant airline, hotel, or supplier involved in your booking.
            </p>
            <h2 id="8-acceptable-use">
              8. Acceptable Use
            </h2>
            <p>
              When using the ARLink28 website, you agree not to:
            </p>
            <ul className="legal-list">
              <li>
                Use the Services for any unlawful purpose
              </li>
              <li>
                Attempt to gain unauthorised access to our systems or other users' accounts
              </li>
              <li>
                Submit false, misleading, or fraudulent booking information
              </li>
              <li>
                Interfere with the security or proper functioning of the website
              </li>
              <li>
                Scrape, copy, or republish our content without authorisation
              </li>
            </ul>
            <h2 id="9-intellectual-property">
              9. Intellectual Property
            </h2>
            <p>
              All content on the ARLink28 website, including text, graphics, logos, and software, is the property of ARLink28 or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
            </p>
            <h2 id="10-affiliate-and-partner-relationships">
              10. Affiliate and Partner Relationships
            </h2>
            <p>
              ARLink28 participates in affiliate and partnership programmes with third-party travel providers, as outlined in our 
              <Link href="/affiliate-disclosure" style={{ color: 'var(--primary-red)' }}>
                Affiliate Disclosure
              </Link>
              . ARLink28 may earn a commission when bookings are completed through partner links, at no additional cost to the customer.
            </p>
            <h2 id="11-disclaimer-of-warranties">
              11. Disclaimer of Warranties
            </h2>
            <p>
              The ARLink28 website and Services are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, ARLink28 disclaims all warranties, express or implied, regarding the accuracy, reliability, or availability of the Services. Please refer to our 
              <Link href="/disclaimer" style={{ color: 'var(--primary-red)' }}>
                Disclaimer
              </Link>
               for further detail.
            </p>
            <h2 id="12-limitation-of-liability">
              12. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, ARLink28 shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of the Services, reliance on information provided, or actions of third-party suppliers, as further described in our Disclaimer.
            </p>
            <h2 id="13-force-majeure">
              13. Force Majeure
            </h2>
            <p>
              ARLink28 shall not be held responsible for failure or delay in performance caused by circumstances beyond its reasonable control, including natural disasters, government action, border closures, public health emergencies, strikes, or airline operational disruptions.
            </p>
            <h2 id="14-termination">
              14. Termination
            </h2>
            <p>
              ARLink28 reserves the right to suspend or terminate your access to the Services at any time, without notice, where there is reasonable belief of a breach of these Terms, fraudulent activity, or misuse of the platform.
            </p>
            <h2 id="15-governing-law">
              15. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable Nigerian law, without prejudice to any mandatory consumer protection laws that may apply in your country of residence.
            </p>
            <h2 id="16-changes-to-these-terms">
              16. Changes to These Terms
            </h2>
            <p>
              ARLink28 reserves the right to update or modify these Terms at any time to reflect operational, legal, or regulatory changes. Updated Terms will be published on our website with a revised effective date. Continued use of our Services following any changes constitutes acceptance of the updated Terms.
            </p>
            <h2 id="17-contact-information">
              17. Contact Information
            </h2>
            <p>
              If you have questions regarding these Terms of Service, please contact:
            </p>
            <p>
              ARLink28
            </p>
            <p>
              Email: 
              <a href="mailto:info@arlink28.com" style={{ color: 'var(--primary-red)' }}>
                info@arlink28.com
              </a>
            </p>
            <p>
              Website: 
              <a href="http://www.arlink28.com" style={{ color: 'var(--primary-red)' }}>
                www.arlink28.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
