import type { Metadata } from "next";
import "../styles/team-inline.css";

import "../styles/people.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet the Team - ARLink28 Leadership & Coordinators",
  description: "Meet the experienced leadership team, advisory board, and key coordinators driving ARLink28's strategy, finance, technology, partnerships, HR, and regional growth across Africa.",
};

export default function TeamPage() {
  return (
    <>
      <section className="team-hero">
        <div className="team-hero-container">
          <span className="team-hero-tag">
            <i className="fa-solid fa-users"></i>
             Leadership & Coordinators
          </span>
          <h1>
            Meet The Visionaries Behind 
            <br />
            <span className="highlight-red">
              ARLink28
            </span>
          </h1>
          <p>
            Our team unites seasoned aviation executives, financial strategists, digital technology experts, partnership coordinators, and market development professionals dedicated to building Africa's next great travel ecosystem.
          </p>
        </div>
      </section>
      <section className="team-grid-section">
        <div className="team-grid-container">
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-chairman">
                Advisory Chairman
              </span>
              <img src="/images/team-richard-aisuebeogun.jpg" alt="Dr. Richard O. Aisuebeogun" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Dr. Richard O. Aisuebeogun
                </h3>
                <div className="team-card-title">
                  Advisory Founding Chairman
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Dr. Richard O. Aisuebeogun is a highly respected aviation executive, scholar and leadership consultant with more than 30 years of experience across Nigeria’s aviation industry. He has held several senior leadership positions, including Managing Director and Chief Executive Officer of the Federal Airports Authority of Nigeria, Pioneer Chief Operating Officer of Overland Airways, and Executive Director/COO for International Operations at Air Nigeria.
                </p>
                <p>
                  He holds advanced qualifications in transportation and aviation and has contributed extensively to aviation policy, airport management, operational strategy and industry development. As Advisory Founding Chairman of ARLink28, Dr. Aisuebeogun provides strategic guidance, regulatory insight and high-level industry counsel, supporting the organisation’s long-term vision to strengthen connectivity, operational excellence and sustainable aviation development across Africa.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-finance">
                Finance & Admin
              </span>
              <img src="/images/team-abdullahi-sulaiman.jpg" alt="Abdullahi Mohammed Sulaiman" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Abdullahi Mohammed Sulaiman
                </h3>
                <div className="team-card-title">
                  Finance & Administration Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Abdullahi Mohammed Sulaiman is a results-driven finance and administration professional with more than 10 years of progressive experience in financial management, budgeting, compliance and organisational administration across the development and humanitarian sectors. He has worked with respected organisations including Search for Common Ground, the Centre for Community Development & Research Network, AS & Co Chartered Accountants and the Rural Women Development Initiative.
                </p>
                <p>
                  He holds a Master’s degree in Accounting and Financial Management, an MBA in Finance and Investment, and is an Associate Chartered Accountant of ICAN. At ARLink28, Abdullahi oversees financial planning, reporting, cost control, compliance and administrative systems, helping ensure that the organisation maintains strong financial governance, operational discipline and accurate decision-making as it continues to grow across Africa.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-tech">
                Digital & Tech
              </span>
              <img src="/images/team-paul-agboola.jpg" alt="Paul Damilola Agboola" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Paul Damilola Agboola
                </h3>
                <div className="team-card-title">
                  Digital Systems & Technology Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Paul Damilola Agboola is a results-driven technology professional with more than five years of experience across digital systems, IT operations, executive support and process improvement. He holds a B.Sc. in Computer Science and has built a strong track record of using technology, automation and digital infrastructure to improve efficiency, accuracy and organisational performance.
                </p>
                <p>
                  His professional experience includes work with organisations such as Bank of America, the Nigerian Army and Benue TV Station, where he supported digital systems, administrative operations and technology-enabled workflow improvements. At ARLink28, Paul oversees the organisation’s digital platforms, website infrastructure, systems security, integrations and technical operations. He plays a key role in strengthening ARLink28’s digital capabilities and supporting the organisation’s continued growth and operational development across Africa.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-bd">
                Partnerships & BD
              </span>
              <img src="/images/team-delroy-mahove.jpg" alt="Delroy Clyde Mahove" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Delroy Clyde Mahove
                </h3>
                <div className="team-card-title">
                  Strategic Partnerships & Business Development Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Delroy Clyde Mahove is a strategic partnerships and business development professional with close to eight years of experience in partnership development, stakeholder engagement, programme coordination, fundraising and organisational management. His career includes roles with organisations such as Uncommon.org, Fruition Consulting, Lungowe Mukaro Foundation, Dzikwa Trust Fund and the National Union of Metal and Allied Industries in Zimbabwe.
                </p>
                <p>
                  At ARLink28, Delroy leads the development of strategic relationships with airlines, hotels, tourism organisations, corporate partners and other key stakeholders across Africa. He supports business expansion by identifying commercial opportunities, coordinating partnership proposals and agreements, and strengthening long-term relationships that contribute to ARLink28’s growth. His ability to connect people, build trust and develop sustainable collaborations plays an important role in expanding our footprint.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-hr">
                Human Resources
              </span>
              <img src="/images/team-ezra-rasugu.jpg" alt="Ezra Asanyo Rasugu" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Ezra Asanyo Rasugu
                </h3>
                <div className="team-card-title">
                  Human Resources & Workforce Planning Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Ezra Asanyo Rasugu is a results-driven and detail-oriented professional with more than seven years of experience across corporate operations, administration, human resources support and records management. His background includes experience with organisations such as the United Nations, Rebbs Ventures and the Insurance Company of East Africa, where he developed strong capabilities in HR operations, compliance, documentation and process improvement.
                </p>
                <p>
                  At ARLink28, Ezra supports recruitment, candidate screening, onboarding, workforce planning, staff documentation and internal HR coordination. He also contributes to maintaining employee records, strengthening internal procedures, supporting performance tracking and improving workforce readiness across the organisation. His organised, proactive approach helps ARLink28 build a structured, accountable and effective people-management foundation as the company continues to grow across Africa.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-ops">
                Aviation Planning
              </span>
              <img src="/images/team-feysel-fereja.jpg" alt="Feysel Mussema Fereja" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Feysel Mussema Fereja
                </h3>
                <div className="team-card-title">
                  Aviation Research & Operational Planning Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Feysel Mussema Fereja is an aviation professional based in Addis Ababa, Ethiopia, with a BSc in Aviation Management from National Aviation College. His professional background includes serving as a Flight Operations Team Leader at Krimson Aviation, where he has supported aviation permits, regulatory compliance, ground-handling supervision and the coordination required for safe and timely flight operations. He previously worked as a Ground Handling Agent with ICAS Ethiopia, supporting airline operations involving Flynas, Saudia Airlines and Qatar Airways.
                </p>
                <p>
                  At ARLink28, Feysel serves as Aviation Research & Operational Planning Coordinator. His responsibilities include aviation research, route and airport intelligence, regulatory and operational planning, and supporting ARLink28 Elite through the assessment of licensed private aviation and charter operators. He also contributes to operational-readiness planning as ARLink28 develops its wider Pan-African aviation ecosystem.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-readiness">
                Flight Operations
              </span>
              <img src="/images/team-afomiya-tamer.jpg" alt="Afomiya Tamer" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Afomiya Tamer
                </h3>
                <div className="team-card-title">
                  Aviation Operations & Readiness Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Afomiya Tamer is an aviation professional based in Addis Ababa, Ethiopia, with training in flight operations, flight planning, dispatch procedures, aviation regulations and airline operations. She completed flight-operations training at National Aviation College and is also pursuing a Bachelor’s degree in Management at Jimma University. Her additional training includes an Airline Flight Planning Certificate from TBO Academy and First Aid certification. Her experience has strengthened her analytical thinking, operational awareness, communication, leadership and ability to work accurately under pressure.
                </p>
                <p>
                  At ARLink28, Afomiya serves as Aviation Operations & Readiness Coordinator. Her responsibilities include supporting pre-operational aviation research, route and airport intelligence, regulatory awareness, operational-readiness planning and documentation. She also helps monitor aviation developments in Ethiopia and approved East African markets, prepares readiness materials and checklists, and contributes practical recommendations that support ARLink28’s future aviation operations and wider Pan-African development strategy.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-cx">
                Customer Experience
              </span>
              <img src="/images/team-yonatan-ayalew.jpg" alt="Yonatan Ayalew" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Yonatan Ayalew
                </h3>
                <div className="team-card-title">
                  Customer Experience & Market Relations Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Yonatan Ayalew is an Ethiopian customer-service, hospitality, sales and marketing professional with a Bachelor’s degree in Hospitality Management from National Aviation College. His experience includes working as a Customer Service Agent with Ethiopian Airlines, supporting international flight departures and passenger handling, as well as previous work in marketing, sales and customer relations. He has also served as a Sales and Marketing Manager, developing sales strategies, identifying business opportunities, maintaining customer relationships and monitoring market trends.
                </p>
                <p>
                  At ARLink28, Yonatan serves as Customer Experience & Market Relations Coordinator. His responsibilities include monitoring the customer journey, identifying service gaps, gathering traveller and market feedback, researching customer expectations and supporting customer-facing communication. He also helps translate market intelligence and customer observations into practical recommendations that strengthen ARLink28’s services, packages and overall traveller experience across approved African markets.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-eng">
                Software Engineering
              </span>
              <img src="/images/team-prosper-tinarwo.jpg" alt="Prosper Tinarwo" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Prosper Tinarwo
                </h3>
                <div className="team-card-title">
                  Software Engineering & Systems Architecture Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Prosper Tinarwo is a senior software engineer, technical lead and solutions architect with more than eight years of experience delivering production-grade systems across healthcare, fintech, logistics and SaaS. His background includes leading engineering teams, designing scalable software architecture, managing CI/CD pipelines, APIs, databases, cloud environments and complex system integrations. He currently serves as a Senior Software Engineer and Technical Lead at Western Cape Blood Services and is also the Founder & CTO of ShiftTech Global Solutions.
                </p>
                <p>
                  At ARLink28, Prosper serves as Software Engineering & Systems Architecture Coordinator. He supports the architecture and development of ARLink28’s websites, backend services, APIs, integrations and digital infrastructure. His role also covers system scalability, performance, cybersecurity, deployment processes, technical documentation and troubleshooting. Prosper works closely with Damilola, Brendon and other team members to ensure ARLink28’s technology infrastructure can support future booking systems, partner integrations and continued business growth.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-sales">
                Sales & Administration
              </span>
              <img src="/images/team-elizabeth-nabankema.jpg" alt="Elizabeth Nabankema" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Elizabeth Nabankema
                </h3>
                <div className="team-card-title">
                  Sales & Administrative Support Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Elizabeth Nabankema is a Ugandan finance and accounting professional currently pursuing ACCA certification, with experience in partnership analysis, stakeholder reporting, budgeting, documentation and administrative coordination. She previously worked as a Partnerships & Administrative Support Officer at MobiKlinic Uganda, where she supported partnership development, maintained compliance records and coordinated stakeholder activities. She also worked as a Marketing Manager & Specialist at BEBE Solutions East Africa, managing client relationships, event logistics, budgeting and reporting for corporate clients including Shell Uganda and MultiChoice.
                </p>
                <p>
                  At ARLink28, Elizabeth serves as Sales & Administrative Support Coordinator. Her responsibilities include supporting customer and sales enquiries, booking-related communication, follow-ups, quotations, administrative documentation and records management. She also supports partnership coordination, reporting and internal organisation, helping ensure that customer interactions, sales activities and administrative processes are handled accurately, professionally and efficiently as ARLink28 continues to expand its travel and hospitality services.
                </p>
              </div>
            </div>
          </div>
          <div className="team-card reveal">
            <div className="team-card-image-wrapper">
              <span className="team-badge badge-design">
                Tech & Design
              </span>
              <img src="/images/team-brendon-sanyahawa.jpg" alt="Brendon Sanyahawa" className="team-card-img" />
            </div>
            <div className="team-card-body">
              <div className="team-card-header">
                <h3 className="team-card-name">
                  Brendon Sanyahawa
                </h3>
                <div className="team-card-title">
                  Technology & Creative Design Coordinator
                </div>
              </div>
              <div className="team-card-bio">
                <p>
                  Brendon Sanyahawa is a Zimbabwean technology and digital-design professional with experience in software engineering, web development, technical support, SEO and digital infrastructure. His background includes freelance technical support and web management, as well as a Software Engineering Internship with Runhare House, where he developed responsive websites, improved website performance, resolved technical issues and supported SEO optimisation. His technical skills include HTML, CSS, JavaScript, React, Node.js, WordPress, Python, Django, API integration, Git/GitHub and creative tools such as Figma, Canva, Photoshop and Illustrator.
                </p>
                <p>
                  At ARLink28, Brendon serves as Technology & Creative Design Coordinator. He supports creative production, social-media materials, website updates, user-experience checks, technical troubleshooting and brand consistency. He also works closely with Damilola and the wider technology team to ensure ARLink28’s digital content, design assets and customer-facing platforms remain professional, accurate, functional and aligned with the company’s brand standards.
                </p>
              </div>
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
