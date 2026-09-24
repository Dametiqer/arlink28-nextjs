import type { Metadata } from "next";
import "../styles/legal.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | ARLink28",
  description: "Important disclaimers regarding the information and services provided on the ARLink28 website.",
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="legal-hero">
        <div className="legal-hero-inner">
          <div className="legal-hero-icon">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <span className="legal-hero-tag">
            Legal
          </span>
          <h1>
            Disclaimer
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
                  <a href="#1-general-information-only">
                    1. General Information Only
                  </a>
                </li>
                <li>
                  <a href="#2-no-professional-or-legal-advice">
                    2. No Professional or Legal Advice
                  </a>
                </li>
                <li>
                  <a href="#3-third-party-services-and-suppliers">
                    3. Third-Party Services and Suppliers
                  </a>
                </li>
                <li>
                  <a href="#4-no-guarantee-of-results">
                    4. No Guarantee of Results
                  </a>
                </li>
                <li>
                  <a href="#5-limitation-of-liability">
                    5. Limitation of Liability
                  </a>
                </li>
                <li>
                  <a href="#6-external-links">
                    6. External Links
                  </a>
                </li>
                <li>
                  <a href="#7-forward-looking-statements">
                    7. Forward-Looking Statements
                  </a>
                </li>
                <li>
                  <a href="#8-changes-to-this-disclaimer">
                    8. Changes to This Disclaimer
                  </a>
                </li>
                <li>
                  <a href="#9-contact-information">
                    9. Contact Information
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
                  <Link className="" href="/terms-of-service">
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
                  <Link className="active" href="/disclaimer">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="legal-panel glass-panel">
            <p>
              The information provided on the ARLink28 website and through our services is provided in good faith. However, ARLink28 makes no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on our platform.
            </p>
            <p>
              By using the ARLink28 website or services, you acknowledge and agree to the disclaimers outlined below.
            </p>
            <h2 id="1-general-information-only">
              1. General Information Only
            </h2>
            <p>
              Content published by ARLink28, including destination guides, travel tips, pricing references, and service descriptions, is provided for general informational purposes only.
            </p>
            <p>
              This information should not be relied upon as a substitute for independent research, professional advice, or direct confirmation with the relevant airline, hotel, visa authority, or service provider.
            </p>
            <h2 id="2-no-professional-or-legal-advice">
              2. No Professional or Legal Advice
            </h2>
            <p>
              Nothing on the ARLink28 website constitutes legal, immigration, financial, medical, or other professional advice.
            </p>
            <p>
              Visa requirements, travel restrictions, health regulations, and entry requirements change frequently and vary by nationality and destination. Travellers should always verify current requirements directly with the relevant embassy, consulate, or government authority before travelling.
            </p>
            <h2 id="3-third-party-services-and-suppliers">
              3. Third-Party Services and Suppliers
            </h2>
            <p>
              ARLink28 works with airlines, hotels, tour operators, visa processing partners, and other third-party suppliers, including but not limited to Sherpa, Viator, Trip.com, GetYourGuide, iVisa, and Travelstart.
            </p>
            <p>
              ARLink28 does not own or operate these third-party services and is not responsible for:
            </p>
            <ul className="legal-list">
              <li>
                The accuracy of pricing, availability, or descriptions displayed by third parties
              </li>
              <li>
                The quality, safety, or legality of services provided by third parties
              </li>
              <li>
                Delays, cancellations, or disruptions caused by third-party suppliers
              </li>
              <li>
                Visa approval, refusal, or processing outcomes determined by government authorities
              </li>
            </ul>
            <p>
              Use of any third-party service is at your own discretion and subject to that provider's own terms and policies.
            </p>
            <h2 id="4-no-guarantee-of-results">
              4. No Guarantee of Results
            </h2>
            <p>
              ARLink28 does not guarantee that any booking, visa application, travel arrangement, or service request will be successful, error-free, uninterrupted, or completed within a specific timeframe.
            </p>
            <p>
              Outcomes may be affected by factors outside our control, including airline policy, government decisions, weather, supplier availability, and force majeure events.
            </p>
            <h2 id="5-limitation-of-liability">
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, ARLink28, its directors, employees, partners, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from:
            </p>
            <ul className="legal-list">
              <li>
                Use of, or inability to use, the ARLink28 website or services
              </li>
              <li>
                Reliance on any information published on our platform
              </li>
              <li>
                Actions or omissions of third-party suppliers or partners
              </li>
              <li>
                Travel disruptions, losses, or damages incurred during your trip
              </li>
            </ul>
            <p>
              This limitation applies whether the claim is based on contract, tort, negligence, or any other legal theory.
            </p>
            <h2 id="6-external-links">
              6. External Links
            </h2>
            <p>
              Our website may contain links to external websites that are not provided or maintained by ARLink28. We do not guarantee the accuracy, relevance, or completeness of any information on these external websites and are not responsible for their content or practices.
            </p>
            <h2 id="7-forward-looking-statements">
              7. Forward-Looking Statements
            </h2>
            <p>
              References to future services, aviation operations, expansion plans, or ARLink28's regional airline ambitions are forward-looking statements based on current intentions. They do not constitute a guarantee, commitment, or binding offer of future services, routes, or timelines, and are subject to change without notice.
            </p>
            <h2 id="8-changes-to-this-disclaimer">
              8. Changes to This Disclaimer
            </h2>
            <p>
              ARLink28 reserves the right to amend this Disclaimer at any time. Updated versions will be published on our website with a revised effective date. Continued use of our services following any changes constitutes acceptance of the updated Disclaimer.
            </p>
            <h2 id="9-contact-information">
              9. Contact Information
            </h2>
            <p>
              If you have questions regarding this Disclaimer, please contact:
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
