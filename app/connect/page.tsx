import type { Metadata } from "next";
import "../styles/destinations.css";

import "../styles/connect-inline.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Connect | ARLink28 - Connecting Dreams, Connecting Africa",
  description: "ARLink28 is a Pan-African travel and aviation company building the foundations for seamless regional mobility, strategic partnerships, and African connectivity.",
};

export default function ConnectPage() {
  return (
    <>
      <section className="connect-hero">
        <div className="connect-hero-content">
          <span className="connect-hero-tag hero-tag-entrance">
            <i className="fa-solid fa-plane-departure" style={{ marginRight: '8px' }}></i>
            Connecting Dreams, Connecting Africa
      
          </span>
          <h1 className="hero-h1-entrance">
            
        ARLink28 — 
            <span className="highlight-red">
              Connecting Africa
            </span>
          </h1>
          <p className="hero-p-entrance">
            
        ARLink28 is a Pan-African travel and aviation-focused company created with a long-term vision of making movement across Africa easier, more connected, more efficient, and more commercially accessible.
      
          </p>
          <div className="hero-btn-entrance">
            <a className="btn btn-primary" href="#vision">
              Explore Our Vision
            </a>
            <Link className="btn btn-secondary" href="/contact" style={{ marginLeft: '12px' }}>
              Partner With Us
            </Link>
          </div>
        </div>
        <div className="connect-hero-globe" aria-hidden="true">
          <i className="fa-solid fa-globe"></i>
        </div>
      </section>
      <section className="connect-section" id="overview">
        <div className="dest-section-header reveal" style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 40px' }}>
          <span className="section-tag">
            Building The Ecosystem
          </span>
          <h2>
            Connecting The Links Between 
            <span className="highlight-red">
              African Nations
            </span>
          </h2>
          <p style={{ fontSize: '16.5px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)', marginTop: '16px' }}>
            
        Africa is a continent of enormous opportunity, yet moving between its countries can still be more difficult than it should be. In many cases, travellers must connect through Europe or the Middle East before reaching another African destination. Businesses face complex travel routes, tourists encounter fragmented booking experiences, and many destinations remain underserved despite their economic and tourism potential.
      
          </p>
        </div>
        <div className="philosophy-banner reveal-scale">
          <h3>
            Foundations First Philosophy
          </h3>
          <p>
            
        "We believe that a truly connected Africa requires more than aircraft. It requires tourism, technology, infrastructure, partnerships, distribution, trust, regulation, strong commercial relationships, and an understanding of how people actually move across the continent. That is the ecosystem ARLink28 is building."
      
          </p>
        </div>
      </section>
      <section className="connect-section" id="vision" style={{ paddingTop: '0' }}>
        <div className="dest-section-header reveal">
          <div className="dest-section-header-left">
            <span className="section-tag">
              Our Vision
            </span>
            <h2>
              Shaping The Future of 
              <span className="highlight-red">
                African Mobility
              </span>
            </h2>
          </div>
          <p>
            Building a future where travelling across Africa feels simpler, more natural, and accessible for everyone.
          </p>
        </div>
        <div className="editorial-content-box reveal">
          <div className="editorial-paragraph-item">
            <div className="editorial-item-header">
              <div className="connect-icon-inline">
                <i className="fa-solid fa-earth-africa"></i>
              </div>
              <h3>
                Accessible Travel
              </h3>
            </div>
            <p>
              
          We envision an Africa where people move easily between countries for business, tourism, education, investment, family, culture, and opportunity. By breaking down traditional barriers to intra-African travel, we aim to make regional mobility seamless and universally accessible for all travellers.
        
            </p>
          </div>
          <div className="editorial-paragraph-item">
            <div className="editorial-item-header">
              <div className="connect-icon-inline">
                <i className="fa-solid fa-diagram-project"></i>
              </div>
              <h3>
                Cross-Regional Links
              </h3>
            </div>
            <p>
              
          Our mission centers on creating stronger, direct connections between West Africa, East Africa, Central Africa, Southern Africa, and North Africa. Through integrated travel systems, we eliminate unnecessary multi-stop detours and connect key commercial and cultural hubs directly across regions.
        
            </p>
          </div>
          <div className="editorial-paragraph-item">
            <div className="editorial-item-header">
              <div className="connect-icon-inline">
                <i className="fa-solid fa-plane-up"></i>
              </div>
              <h3>
                Aviation Future
              </h3>
            </div>
            <p>
              
          We are actively building towards a wider, more inclusive aviation future. Our goal is to play a meaningful, transformative role in connecting underserved and fragmented African markets, laying down routes where commercial demand exists but travel options have traditionally been limited.
        
            </p>
          </div>
          <div className="editorial-paragraph-item">
            <div className="editorial-item-header">
              <div className="connect-icon-inline">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <h3>
                Sustainable Growth
              </h3>
            </div>
            <p>
              
          Our strategic expansion is grounded in connectivity before scale, strategic partnerships before unnecessary ownership, and rock-solid operational foundations before rapid growth. This disciplined focus ensures long-term commercial viability and sustainable value for African communities.
        
            </p>
          </div>
        </div>
      </section>
      <section className="connect-section" id="pillars">
        <div className="dest-section-header reveal">
          <div className="dest-section-header-left">
            <span className="section-tag">
              Current Operations
            </span>
            <h2>
              What ARLink28 
              <span className="highlight-red">
                Does Today
              </span>
            </h2>
          </div>
          <p>
            Developing commercial and strategic foundations while delivering high-quality travel services across the continent.
          </p>
        </div>
        <div className="editorial-pillars-container">
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              01
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-ticket"></i>
                <h3>
                  Travel Booking Services
                </h3>
              </div>
              <p>
                
            ARLink28 provides fully supported travel booking services through intuitive digital platforms and direct personalized channels such as WhatsApp. We ensure every customer feels guided, informed, and cared for from their initial search through to final arrival at their destination.
          
              </p>
            </div>
          </div>
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              02
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-hotel"></i>
                <h3>
                  Hotels & Resort Packages
                </h3>
              </div>
              <p>
                
            We collaborate closely with premium African hospitality properties—such as Blue Ocean Resort & Residences in Zanzibar—to deliver curated stays, luxury escapes, and safari packages that showcase the finest destinations across the continent.
          
              </p>
            </div>
          </div>
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              03
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-route"></i>
                <h3>
                  Tourism & Destination Development
                </h3>
              </div>
              <p>
                
            We actively strengthen regional tourism ecosystems by partnering with tourism boards, hospitality providers, and local tour operators. Together, we drive visitor traffic and foster vibrant economic activity across emerging and established African destinations.
          
              </p>
            </div>
          </div>
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              04
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-jet-fighter-up"></i>
                <h3>
                  Private Aviation Development
                </h3>
              </div>
              <p>
                
            Pioneering an asset-light charter model, we connect corporate executives, government delegations, and institutional clients with appropriately licensed aircraft operators, providing flexible, confidential, and efficient private air travel solutions.
          
              </p>
            </div>
          </div>
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              05
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-handshake"></i>
                <h3>
                  Strategic Aviation Partnerships
                </h3>
              </div>
              <p>
                
            We engage proactively with commercial airlines, airport authorities, aviation regulators, and industry leaders at global summits to build collaborative regional networks and streamline inter-airline connectivity across African markets.
          
              </p>
            </div>
          </div>
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              06
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-network-wired"></i>
                <h3>
                  Building an African Network
                </h3>
              </div>
              <p>
                
            We are establishing deliberate operational hubs starting with key gateways in the UK and Nigeria, focusing strategically on East Africa (Kenya & Ethiopia), and expanding into new markets wherever clear economic and commercial demand exists.
          
              </p>
            </div>
          </div>
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              07
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-code"></i>
                <h3>
                  Technology & Digital Systems
                </h3>
              </div>
              <p>
                
            By leveraging advanced travel data analytics and passenger booking patterns, we identify emerging route demand, optimize customer touchpoints, and map future flight schedules to better serve underserved travel corridors across Africa.
          
              </p>
            </div>
          </div>
          <div className="editorial-pillar-row reveal">
            <div className="editorial-pillar-badge">
              08
            </div>
            <div className="editorial-pillar-content">
              <div className="editorial-pillar-title">
                <i className="fa-solid fa-shield-halved"></i>
                <h3>
                  Compliance & Aviation Readiness
                </h3>
              </div>
              <p>
                
            We prioritize building robust corporate governance structures, legal frameworks, and regulatory credentials progressively before initiating full operational airline scaling, ensuring total safety, trust, and regulatory alignment.
          
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="connect-section" style={{ paddingTop: '0' }}>
        <div className="why-exists-box reveal">
          <span className="section-tag" style={{ background: 'rgba(230,30,43,0.15)', color: '#e61e2b' }}>
            Our Core Purpose
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginTop: '12px' }}>
            Why ARLink28 Exists
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginTop: '8px' }}>
            
        Africa deserves stronger internal connectivity. ARLink28 exists because the future of African travel should increasingly be shaped by organisations that understand Africa’s markets, people, challenges, and potential.
      
          </p>
          <div className="why-exists-list">
            <div className="why-exists-item">
              <i className="fa-solid fa-circle-check"></i>
              <p>
                <strong>
                  Internal Connectivity:
                </strong>
                 Making travel between African countries easier, faster, and direct.
              </p>
            </div>
            <div className="why-exists-item">
              <i className="fa-solid fa-circle-check"></i>
              <p>
                <strong>
                  Discoverable Destinations:
                </strong>
                 Showcasing extraordinary African culture, commercial centers, and natural wonders.
              </p>
            </div>
            <div className="why-exists-item">
              <i className="fa-solid fa-circle-check"></i>
              <p>
                <strong>
                  Business Mobility:
                </strong>
                 Enabling entrepreneurs and investors to move efficiently across regional markets.
              </p>
            </div>
            <div className="why-exists-item">
              <i className="fa-solid fa-circle-check"></i>
              <p>
                <strong>
                  Economic Opportunity:
                </strong>
                 Supporting local jobs, hospitality providers, and tourism growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-adventure">
        <div className="cta-banner reveal-scale">
          <div className="cta-content">
            <h2>
              Join Us In Building
              <br />
              The Future of African Travel
            </h2>
            <p>
              Connect with our team for strategic partnerships, travel arrangements, or commercial collaborations.
            </p>
            <Link className="btn btn-primary" href="/contact">
              Get in Touch 
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="cta-visual">
            <img alt="ARLinks Airplane" loading="lazy" width="580" height="350" decoding="async" className="cta-plane" src="/images/IMG_5238.png" style={{ width: '130%', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </section>
      <section className="newsletter-bar" id="register">
        <div className="newsletter-container">
          <div className="newsletter-info reveal-left">
            <i className="fa-regular fa-envelope-open newsletter-icon"></i>
            <div className="newsletter-text">
              <h4>
                Stay connected with ARLink28
              </h4>
              <p>
                Get the latest updates on regional travel routes, destination packages, and aviation announcements.
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
              <label htmlfor="newsletter-check">
                I agree to terms & privacy policy
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
