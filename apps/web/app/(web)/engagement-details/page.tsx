import type { Metadata } from "next";
import "../styles/engagement-details-inline.css";

import "../styles/people.css";
import "../styles/content-shared.css";

import Link from "next/link";

export const metadata: Metadata = {
  title: "ARLinks - Engagement Details",
  description: "Full details of ARLink28's industry engagements, summits, expos and airshows across Africa and internationally.",
};

export default function EngagementDetailsPage() {
  return (
    <>
      <section className="about-hero" style={{ minHeight: 'unset', padding: '170px 8% 80px', alignItems: 'center', textAlign: 'center' }}>
        <div className="about-hero-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link className="btn btn-secondary" href="/engagement" style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-arrow-left"></i>
             Back to Engagement
          </Link>
          <br />
          <span className="about-hero-tag hero-tag-entrance" style={{ justifyContent: 'center' }}>
            <i className="fa-solid fa-circle" style={{ fontSize: '8px', color: 'var(--primary-red)', marginRight: '8px' }}></i>
            Industry & Community
          </span>
          <h1 className="hero-h1-entrance">
            Our Engagement 
            <span className="highlight-red">
              Archive
            </span>
          </h1>
          <p className="hero-p-entrance" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Full write-ups of every summit, expo and airshow ARLink28 has taken part in as we build toward greater African connectivity.
          </p>
        </div>
      </section>
      <section className="about-section" id="engagement-details" style={{ padding: '80px 8%' }}>
        <div className="section-header reveal">
          <span className="section-tag">
            Engagement Details
          </span>
          <h2>
            Full 
            <span className="highlight-red">
              Engagement
            </span>
             Details
          </h2>
          <p>
            Our development is informed not only by internal planning, but by active participation in the industries, markets and conversations shaping the future of African mobility.
          </p>
        </div>
        <div className="events-list">
          <div className="event-item event-item-split glass-panel reveal" id="sustainable-skies-2025" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="Sustainable Skies World Summit 2025" loading="lazy" src="/images/Sustainable Skies Summit.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Sustainable Skies World Summit 2025" loading="lazy" src="/images/Sustainable Skies Summit 2.JPG" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      MAY
                    </span>
                    <span className="event-day">
                      14
                    </span>
                    <span className="event-year">
                      2025
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-blue">
                      Sustainability
                    </span>
                    <h3>
                      ARLink28 at Sustainable Skies World Summit 2025
                    </h3>
                  </div>
                </div>
                <p>
                  ARLink28 attended the Sustainable Skies World Summit 2025, held on 14–15 May 2025 at Farnborough International Exhibition & Conference Centre in the UK. Organised by Farnborough International in collaboration with Sustainable Aviation, the summit brought together senior leaders from airlines, aerospace manufacturers, airports, regulators, government, finance, energy, academia, and sustainability organisations to discuss how aviation can accelerate its transition towards net zero.
                </p>
                <p>
                  The event attracted more than 1,300 attendees and over 90 speakers, making it a significant international platform for sustainable aviation. Discussions focused on sustainable aviation fuel, carbon removal, zero-emission technologies, operational efficiency, future aircraft propulsion, infrastructure, investment, and the regulatory frameworks required to support aviation decarbonisation.
                </p>
                <div className="event-full-text">
                  <p>
                    Among the senior industry participants were Alan Newby, Director of Aerospace Technology and Future Programmes at Rolls-Royce; Jonathan Counsell, Group Head of Sustainability at IAG; Harry Armstrong, Head of Sustainability at the UK Civil Aviation Authority; Haldane Dodd, Executive Director of the Air Transport Action Group; Diana Birkett Rakow, Senior Vice President of Public Affairs and Sustainability at Alaska Airlines; Gary Elliott, CEO of the Aerospace Technology Institute; and senior representatives from Heathrow Airport, Schiphol, the UK Department for Transport, Airbus, TUI and other major aviation organisations.
                  </p>
                  <p>
                    For ARLink28, attending the summit was particularly important because sustainability must be considered before future airline operations begin, rather than treated as something to address afterwards.
                  </p>
                  <p>
                    A major area of interest was Sustainable Aviation Fuel (SAF). SAF can reduce lifecycle aviation emissions compared with conventional jet fuel and is expected to play a major role in aviation’s decarbonisation pathway. However, the summit also reinforced that SAF alone will not solve aviation’s environmental challenges; infrastructure, aircraft technology, financing, regulation, operational efficiency and energy systems must develop alongside it.
                  </p>
                  <p>
                    For Africa, SAF presents both a challenge and an opportunity. The continent has significant renewable-energy potential, agricultural and waste feedstock opportunities, growing aviation demand and the possibility of developing new fuel-production industries rather than remaining dependent entirely on imported aviation energy. With the right investment, regulation, certification and infrastructure, African countries could potentially participate not only as consumers of sustainable aviation fuel but also as producers and exporters within the future global SAF economy.
                  </p>
                  <p>
                    ARLink28’s purpose in attending Sustainable Skies World Summit was therefore broader than networking. It was about understanding the technologies, regulations, partnerships and investment structures that will shape aviation over the coming decades.
                  </p>
                  <p>
                    As ARLink28 continues building its aviation foundations, these insights help ensure that sustainability is incorporated into its long-term thinking from the beginning — including future fleet decisions, fuel strategy, airport relationships, operational efficiency and potential partnerships.
                  </p>
                  <p>
                    The summit reinforced an important principle for ARLink28: the future of African aviation should not simply replicate yesterday’s aviation model. It should have the opportunity to build something cleaner, more efficient and more sustainable from the outset.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   14–15 May 2025
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Farnborough International Exhibition & Conference Centre, United Kingdom
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="alm-africa-summit-london-2025" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="ALM Africa Summit London 2025" loading="lazy" src="/images/ALM Africa summit.JPG" />
              </div>
              <div className="event-carousel-slide">
                <img alt="ALM Africa Summit London 2025" loading="lazy" src="/images/ALM Africa summit2.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      JUL
                    </span>
                    <span className="event-day">
                      09
                    </span>
                    <span className="event-year">
                      2025
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge">
                      Leadership Summit
                    </span>
                    <h3>
                      ARLink28 at the ALM Africa Summit London 2025
                    </h3>
                  </div>
                </div>
                <p>
                  In July 2025, ARLink28 was represented at the ALM Africa Summit London, a high-level gathering organised by African Leadership Magazine and held across The Landmark London and the UK House of Lords. The summit brought together senior policymakers, governors, ministers, business leaders, investors, diplomats, and institutional decision-makers to discuss Africa’s economic future, leadership, investment, infrastructure, trade, and international partnerships.
                </p>
                <p>
                  Among the notable participants was H.E. Dr. Jakaya Kikwete, former President of Tanzania, who took part in the opening plenary and later a dedicated fireside discussion at the House of Lords. The summit also featured Baroness Sandy Verma, alongside senior African and UK business and policy figures.
                </p>
                <div className="event-full-text">
                  <p>
                    Governors including H.E. Peter Mbah of Enugu State and H.E. Agbu Kefas of Taraba State were among the influential public-sector leaders associated with the summit, while awardees and participants also included senior figures from finance, banking, infrastructure, investment, and development institutions.
                  </p>
                  <p>
                    The summit’s central theme focused on reimagining Africa’s future through purpose-driven leadership and strategic partnerships. Discussions addressed public-private cooperation, intra-African trade, infrastructure development, investment flows, digital transformation, climate-smart finance, and stronger UK-Africa commercial relationships. A dedicated UK-Africa Trade and Business Leaders Roundtable at the House of Lords was designed to connect African CEOs, policymakers, investors, development finance institutions, and UK business leaders around opportunities in sectors including infrastructure, energy, healthcare, agriculture, and technology.
                  </p>
                  <p>
                    For ARLink28, attending the summit as Founder and CEO was strategically important because the company’s long-term vision depends on far more than aviation alone. Building stronger connectivity across Africa requires relationships with governments, investors, tourism authorities, infrastructure stakeholders, financial institutions, and business leaders who understand the economic importance of movement between African markets.
                  </p>
                  <p>
                    The summit provided an opportunity to observe directly how African governments and private-sector leaders are thinking about investment, trade, infrastructure, regional integration, and international collaboration. Those conversations are highly relevant to ARLink28’s ambition to strengthen mobility across the continent and to develop travel and aviation services that support tourism, business, investment, and economic connectivity.
                  </p>
                  <p>
                    Participation also helped position ARLink28 within a wider ecosystem of African leadership and development. Rather than approaching aviation as an isolated industry, the summit reinforced the importance of understanding how transport connects with trade, tourism, infrastructure, finance, diplomacy, and economic development.
                  </p>
                  <p>
                    For ARLink28, the purpose of attending was therefore both strategic and educational: to build relationships, understand the priorities of African decision-makers, identify potential partnerships, and ensure that the company’s future development remains connected to the broader ambitions of the continent.
                  </p>
                  <p>
                    The ALM Africa Summit reinforced a principle central to ARLink28’s vision: better African connectivity is not simply a transport objective; it is an economic, social, and strategic opportunity for the continent as a whole.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   9–10 July 2025
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   The Landmark London & UK House of Lords, London
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="alm-africa-summit-lords-2025" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="ALM Africa Summit UK House of Lords 2025" loading="lazy" src="/images/House Of Lords - African Leadership.JPG" />
              </div>
              <div className="event-carousel-slide">
                <img alt="ALM Africa Summit UK House of Lords 2025" loading="lazy" src="/images/House Of Lords - African Leadership 2.JPG" />
              </div>
              <div className="event-carousel-slide">
                <img alt="ALM House of Lords Group" loading="lazy" src="/images/engagement-alm-lords-group.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      JUL
                    </span>
                    <span className="event-day">
                      10
                    </span>
                    <span className="event-year">
                      2025
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge">
                      Leadership Summit
                    </span>
                    <h3>
                      ARLink28 at the ALM Africa Summit 2025 – UK House of Lords, London
                    </h3>
                  </div>
                </div>
                <p>
                  ARLink28 participated in the ALM Africa Summit London 2025, held on 9–10 July 2025, with the second day taking place at the UK House of Lords, Houses of Parliament. Organised by the African Leadership Organisation, the summit was designed as a high-level platform bringing together African political leaders, policymakers, investors, business executives, diplomats, development institutions, and UK stakeholders to discuss Africa’s future through leadership, investment, trade, and strategic partnerships.
                </p>
                <p>
                  The House of Lords programme featured senior figures including H.E. Dr. Jakaya Mrisho Kikwete, former President of Tanzania and Chair of the ALO Global Advisory Board, Baroness Sandy Verma, and Dr. Ken Giami, Founder and CEO of the African Leadership Organisation.
                </p>
                <div className="event-full-text">
                  <p>
                    The wider summit also brought together ministers, governors, central bank leaders, CEOs, and investors from across the continent. Participants included senior figures such as Dr. Ahmed Kouchouk, Egypt’s Minister of Finance; Bihi Iman Egeh, Somalia’s Minister of Finance; Dr. Rama Krishna Sithanen, Governor of the Bank of Mauritius; Governor Abdullahi Sule of Nasarawa State; and senior representatives from Enugu, Taraba and Akwa Ibom States.
                  </p>
                  <p>
                    Ethiopian representation was also significant within the wider summit ecosystem. Among the notable Ethiopian-linked participants were Dr. Aklilu Wubet Lemma, CEO of Wegagen Bank, and Harry Anagnostaras-Adams, Executive Chairman of KEFI Gold and Copper Plc, Ethiopia. Ethiopian Airlines was also recognised as African Brand of the Year within the summit’s business leadership awards programme.
                  </p>
                  <p>
                    For ARLink28, the House of Lords engagement was particularly valuable because it created direct access to conversations around UK–Africa trade, investment, infrastructure, finance, regional integration, and cross-border business development. The dedicated UK–Africa Trade and Business Leaders Roundtable was designed to connect African CEOs, UK investors, policymakers, and development finance institutions around opportunities in sectors including infrastructure, energy, fintech, agriculture, healthcare, and other high-growth industries.
                  </p>
                  <p>
                    The event also created meaningful relationship-building opportunities for ARLink28. Engagements with Ethiopian delegates were especially important, resulting in a direct invitation to visit Ethiopia and continue discussions there. For ARLink28, that connection was strategically relevant given Ethiopia’s importance within African aviation, regional connectivity, tourism, and the wider East African market.
                  </p>
                  <p>
                    The purpose of attending was therefore not simply visibility. It was to position ARLink28 within conversations involving governments, investors, financial institutions, and African business leaders whose decisions directly influence transport, tourism, infrastructure, and economic mobility.
                  </p>
                  <p>
                    The House of Lords summit reinforced a central principle behind ARLink28’s development: aviation connectivity cannot be built in isolation. It depends on policy, investment, trade relationships, tourism, infrastructure, and trusted partnerships across borders.
                  </p>
                  <p>
                    For ARLink28, participating in the ALM Africa Summit 2025 represented another important step in building those relationships and ensuring that its long-term aviation and travel vision remains connected to the wider economic ambitions of Africa.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   9–10 July 2025
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   UK House of Lords, Houses of Parliament, London
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="sustainable-skies-2026" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="Sustainable Skies World Summit 2026 – Farnborough" loading="lazy" src="/images/ARLink28 at Sustainable Skies World Summit 2026 – Farnborough.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Sustainable Skies World Summit 2026 – Farnborough 2" loading="lazy" src="/images/ARLink28 at Sustainable Skies World Summit 2026 – Farnborough 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Sustainable Skies World Summit 2026 – Farnborough 3" loading="lazy" src="/images/ARLink28 at Sustainable Skies World Summit 2026 – Farnborough 3.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      MAR
                    </span>
                    <span className="event-day">
                      17
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-blue">
                      Sustainability
                    </span>
                    <h3>
                      ARLink28 at Sustainable Skies World Summit 2026 – Farnborough
                    </h3>
                  </div>
                </div>
                <p>
                  ARLink28 attended the Sustainable Skies World Summit 2026, held on 17–18 March 2026 at the Farnborough International Exhibition & Conference Centre in the United Kingdom. The summit is one of the aviation industry’s leading platforms focused on accelerating progress toward Net Zero and brought together aviation leaders, regulators, policymakers, investors, innovators, manufacturers, airports, airlines and sustainability specialists from across the global aerospace ecosystem.
                </p>
                <p>
                  The 2026 edition focused strongly on the practical transition to sustainable aviation, including Sustainable Aviation Fuel (SAF), carbon reduction, zero-emission technologies, operational efficiency, future flight systems, financing, and regulatory cooperation. SAF remained a major theme, with discussions examining not only its environmental benefits but also the supply-chain, investment, policy and infrastructure challenges that must be addressed before it can be deployed at meaningful scale.
                </p>
                <div className="event-full-text">
                  <p>
                    For ARLink28, the event was particularly valuable because of the diversity of people present. It created opportunities to engage with aviation professionals from different parts of the world, including representatives connected to African aviation markets. During the summit, ARLink28 was able to engage with individuals from across Africa, including representatives linked to Kenya and professionals associated with Nigeria’s civil aviation environment. These conversations were especially relevant because African aviation faces a unique sustainability challenge: the continent must expand connectivity and capacity while also preparing for the global transition toward lower-carbon aviation.
                  </p>
                  <p>
                    The event was highly interactive and designed around networking, panels, workshops, roundtables and direct industry engagement. Farnborough International highlights networking as one of the summit’s core strengths, with attendees using the event to connect with decision-makers, regulators, innovators and companies they may not otherwise have direct access to.
                  </p>
                  <p>
                    For ARLink28, the purpose of attending extended far beyond simply observing sustainability discussions. It provided an opportunity to better understand the technologies, policy frameworks, partnerships and commercial models that will influence the aviation industry in the coming years.
                  </p>
                  <p>
                    As ARLink28 continues developing its aviation foundations, these insights are particularly important. The organisation is still at a stage where future systems, partnerships and operating principles can be shaped deliberately. Understanding SAF, future propulsion technologies, regulatory expectations, airport infrastructure and emissions-reduction strategies now allows sustainability to be considered at the foundation stage rather than added later as a compliance exercise.
                  </p>
                  <p>
                    The summit also reinforced the importance of Africa being actively represented in global sustainability conversations. African aviation is expected to grow significantly, and the continent has an opportunity to participate not only as a future consumer of sustainable aviation technology but also through renewable energy, SAF production, infrastructure development and innovation.
                  </p>
                  <p>
                    For ARLink28, Sustainable Skies World Summit 2026 therefore represented an important learning and relationship-building platform — connecting the company with the wider global aviation ecosystem while helping shape a long-term approach to aviation that is commercially viable, environmentally responsible and relevant to Africa’s future connectivity needs.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   17–18 March 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Farnborough International Exhibition & Conference Centre, United Kingdom
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="african-business-leadership-summit-2026" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="African Business & Leadership Summit 2026" loading="lazy" src="/images/African Business & Leadership Summit.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="African Business & Leadership Summit 2026" loading="lazy" src="/images/African Business & Leadership Summit 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="African Business & Leadership Summit 2026" loading="lazy" src="/images/African Business & Leadership Summit 3.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      MAY
                    </span>
                    <span className="event-day">
                      12
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-green">
                      Business Summit
                    </span>
                    <h3>
                      ARLink28 at the African Business & Leadership Summit 2026 – Lagos
                    </h3>
                  </div>
                </div>
                <p>
                  ARLink28 attended the African Business & Leadership Summit (ABLS 2026), held on 12–13 May 2026 at the MUSON Centre, Onikan, Lagos. The inaugural two-day summit was organised by Solid Foundation Group under the theme “Driving Africa’s Growth Through Innovation, Strategic Leadership, and Collaboration.” It brought together business leaders, policymakers, investors, entrepreneurs, innovators, and executives from Nigeria and across Africa to discuss sustainable growth, continental transformation, and stronger cross-border collaboration.
                </p>
                <p>
                  The event was broad in scope, covering sectors including investment and export, real estate and infrastructure, information technology and innovation, governance and public policy, aviation and logistics, education, entertainment, and healthcare. The organisers positioned the summit as both a B2B and B2C platform for partnership-building, investment discussions, trade opportunities, and high-level networking.
                </p>
                <div className="event-full-text">
                  <p>
                    ARLink28 was represented across both days of the summit, creating an opportunity to engage directly with professionals from a wide range of industries and markets. The environment was particularly valuable because it was not limited to aviation alone. It brought together the wider ecosystem that affects how African businesses grow, including finance, policy, infrastructure, trade, investment, technology, and logistics.
                  </p>
                  <p>
                    For ARLink28, this was strategically important. The company’s long-term ambition to strengthen travel and aviation connectivity across Africa depends on much more than aircraft or routes. It also requires strong relationships with investors, policymakers, tourism stakeholders, infrastructure providers, corporate organisations, and institutions that influence how people, capital, and businesses move across the continent.
                  </p>
                  <p>
                    The summit also created space for meaningful networking and relationship-building. ARLink28 was able to make new contacts, engage with potential collaborators, exchange ideas, and gain a better understanding of how other African businesses and leaders are approaching growth, innovation, and regional expansion. That type of engagement is valuable at ARLink28’s current stage because every credible relationship contributes to a stronger commercial and institutional network.
                  </p>
                  <p>
                    The scale of the summit reinforced that value. Organisers reported more than 1,000 participants, with representation from dozens of countries, strategic partners, and exhibitors.
                  </p>
                  <p>
                    For ARLink28, the purpose of attending ABLS 2026 was therefore threefold: to learn, to connect, and to position the company within the wider African business ecosystem.
                  </p>
                  <p>
                    The summit supported ARLink28’s broader philosophy that African connectivity must be built through collaboration. Aviation, tourism, trade, investment, infrastructure, and leadership are interconnected, and stronger movement across Africa will require cooperation between all of them.
                  </p>
                  <p>
                    Attending both days of ABLS 2026 provided ARLink28 with another opportunity to deepen its understanding of that ecosystem while building relationships that may support the company’s continued growth across the continent.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   12–13 May 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   MUSON Centre, Onikan, Lagos, Nigeria
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="spotlight-travelexpo-harare" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="Spotlight TravelExpo — Harare, Zimbabwe" loading="lazy" src="/images/Spotlight TravelExpo Harare.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Spotlight TravelExpo — Harare, Zimbabwe" loading="lazy" src="/images/Spotlight TravelExpo Harare 2.JPG" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Spotlight TravelExpo Hall" loading="lazy" src="/images/engagement-spotlight-harare-hall.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Delroy Clyde Mahove - ARLink28" loading="lazy" src="/images/team-delroy-mahove.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
                <span className="carousel-dot" data-index="3"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      JUL
                    </span>
                    <span className="event-day">
                      09
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-green">
                      Travel Expo
                    </span>
                    <h3>
                      ARLink28 at Spotlight TravelExpo Harare 2026 – Zimbabwe
                    </h3>
                  </div>
                </div>
                <p>
                  ARLink28 was represented at the Spotlight TravelExpo Harare 2026, held on 9 July 2026 at the Hyatt Regency Harare – The Meikles in Zimbabwe. The event was designed to connect tourism suppliers from across Africa, the Indian Ocean islands and international markets with Zimbabwe-based travel agents, tour operators, corporate buyers and other tourism-sector stakeholders.
                </p>
                <p>
                  ARLink28 was represented by Delroy Clyde Mahove, whose attendance provided an important opportunity to engage directly with tourism professionals in Zimbabwe and strengthen the company’s growing network across Southern Africa.
                </p>
                <div className="event-full-text">
                  <p>
                    The Harare edition formed part of the wider Spotlight TravelExpo programme, which creates practical business-to-business networking opportunities for travel professionals across the continent. The event brought together a diverse range of tourism organisations, including hotels, travel agencies, destination representatives and airlines. Published exhibitor information included organisations such as the Zimbabwe Tourism Authority, South African Airways, and hospitality brands participating in the regional travel ecosystem.
                  </p>
                  <p>
                    The purpose of attending was not simply to gain visibility. It was to identify genuine commercial opportunities for ARLink28’s travel and tourism operations, particularly in areas such as hotel and resort partnerships, destination packages, tour operator relationships, regional travel services and future collaboration with tourism stakeholders.
                  </p>
                  <p>
                    The event proved particularly valuable from a relationship-building perspective. Delroy was able to engage with industry professionals, establish new contacts, develop friendships within the tourism community and open conversations that could potentially develop into future partnership opportunities. While not every conversation immediately becomes a formal agreement, these early relationships are important because many successful commercial partnerships begin through direct engagement, trust and consistent follow-up.
                  </p>
                  <p>
                    For ARLink28, events such as Spotlight TravelExpo are especially relevant because the company is continuing to expand its travel-service offering alongside its broader aviation ambitions. Building a strong hospitality and tourism network gives ARLink28 access to products, destination knowledge, supplier relationships and market intelligence that can later support wider travel packages and regional connectivity.
                  </p>
                  <p>
                    The Harare event also provided insight into Zimbabwe’s travel market. Spotlight specifically targets local travel agents and tour operators selling domestic, regional and international travel, giving participants the opportunity to understand what Zimbabwean customers are buying, which destinations are in demand and where commercial gaps may exist.
                  </p>
                  <p>
                    Delroy’s participation was therefore a successful step for ARLink28. His ability to communicate, network and build genuine relationships helped create new points of contact that the company can continue developing over time.
                  </p>
                  <p>
                    For ARLink28, the wider purpose of attending Spotlight TravelExpo Harare was clear: to strengthen its presence within the African travel ecosystem, build relationships before they are needed, identify future partnership opportunities and deepen its understanding of Southern African tourism markets.
                  </p>
                  <p>
                    The event reinforced an important part of ARLink28’s strategy: sustainable expansion across Africa begins with relationships, local market knowledge and trusted commercial connections.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   9 July 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Hyatt Regency Harare – The Meikles, Harare, Zimbabwe
                </span>
                <span className="engage-rep-tag">
                  <i className="fa-solid fa-user"></i>
                   Delroy Clyde Mahove
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="farnborough-airshow-2026" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="Farnborough International Airshow 2026" loading="lazy" src="/images/Farnborough International Airshow.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Farnborough International Airshow 2026" loading="lazy" src="/images/Farnborough International Airshow 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Farnborough International Airshow 2026" loading="lazy" src="/images/Farnborough International Airshow 3.PNG" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      JUL
                    </span>
                    <span className="event-day">
                      20
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge">
                      Airshow
                    </span>
                    <h3>
                      ARLink28 at Farnborough International Airshow 2026 – United Kingdom
                    </h3>
                  </div>
                </div>
                <p>
                  ARLink28 attended the Farnborough International Airshow 2026 on 20 July 2026, the opening day of one of the world’s most important aerospace, aviation, defence, and space exhibitions. The event ran from 20–24 July 2026 at the Farnborough International Exhibition & Conference Centre and brought together global manufacturers, airlines, investors, regulators, governments, defence organisations, technology companies, and aviation professionals from around the world.
                </p>
                <p>
                  For ARLink28, attending the show as CEO was an opportunity to experience the aviation industry at its highest level. Farnborough is not simply an airshow; it is a major international business platform where the future of commercial aviation, defence, propulsion, sustainability, advanced air mobility, and aerospace technology is presented in one place. The 2026 edition ultimately attracted more than 141,000 trade and public visitors from 136 countries and generated over US$84.7 billion in commercial deals.
                </p>
                <div className="event-full-text">
                  <p>
                    The aircraft displays were one of the strongest parts of the event. The flying and static programmes featured a wide range of commercial, military, experimental, and next-generation aircraft. Among those announced were the Airbus A350-1000, U.S. Air Force F-35A Lightning II, RAF Eurofighter Typhoon, Bombardier Global 8000, Embraer C-390 Millennium, BETA Technologies CX300, Vertical Aerospace VA-1X, Saab 340B, and historic aircraft such as the Rolls-Royce Vickers Supermarine Spitfire PR.Mk.XIX and P-51D Mustang. Static displays also included aircraft such as the Embraer E195-E2, JAS-39 Gripen, DHL Boeing 777-200LRMF, GE Aerospace Boeing 747-400, and other advanced platforms.
                  </p>
                  <p>
                    The exhibition halls were equally important. Major companies including Airbus, Boeing, Embraer, Rolls-Royce, Pratt & Whitney, BAE Systems, MBDA, GE Aerospace, and numerous aerospace technology, defence, propulsion, and supply-chain organisations showcased products, systems, aircraft interiors, engineering capability, defence technologies, and future aviation concepts.
                  </p>
                  <p>
                    It was also particularly encouraging to see African representation. Enugu Air from Nigeria was present at Farnborough 2026, using the event to engage with manufacturers, investors, regulators, and other international aviation stakeholders. Seeing an emerging Nigerian airline represented on such a global platform was an important reminder that African aviation is increasingly participating in the wider international aerospace conversation.
                  </p>
                  <p>
                    For ARLink28, the purpose of attending was strategic. Farnborough provided direct exposure to aircraft manufacturers, aviation technology, defence and aerospace innovation, future fleet options, sustainability developments, financing conversations, and the commercial relationships that shape the global aviation industry.
                  </p>
                  <p>
                    At ARLink28’s current stage, this kind of engagement is especially valuable because it allows the company to understand the industry before future aircraft operations begin. It provides insight into how airlines are built, how fleets are selected, how manufacturers position their products, how aviation technology is evolving, and how partnerships are created at the highest level.
                  </p>
                  <p>
                    The experience reinforced ARLink28’s long-term approach: build knowledge, relationships, regulatory understanding, and commercial foundations before the aircraft arrive. Farnborough International Airshow 2026 was therefore not simply an event to attend; it was an opportunity to study the global aviation ecosystem firsthand and bring those insights back into ARLink28’s wider vision for African connectivity.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   20–24 July 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Farnborough, United Kingdom
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="spotlight-travelexpo-dar-es-salaam" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="Spotlight TravelExpo — Dar es Salaam, Tanzania" loading="lazy" src="/images/Spotlight On Africa & Indian Ocean Islands TravelExpo.JPG" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Spotlight TravelExpo Hall" loading="lazy" src="/images/Spotlight On Africa & Indian Ocean Islands TravelExpo  2.JPG" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Ezra Asanyo Rasugu - ARLink28" loading="lazy" src="/images/engagement-spotlight-tz-ezra.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Spotlight TravelExpo Dar es Salaam Exhibition" loading="lazy" src="/images/engagement-spotlight-tz-hall.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
                <span className="carousel-dot" data-index="3"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      JUL
                    </span>
                    <span className="event-day">
                      31
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-green">
                      Travel Expo
                    </span>
                    <h3>
                      ARLink28 at Spotlight on Africa & Indian Ocean Islands TravelExpo 2026 – Dar es Salaam
                    </h3>
                  </div>
                </div>
                <p>
                  ARLink28 was represented at the Spotlight on Africa & Indian Ocean Islands TravelExpo, held on 31 July 2026 in Dar es Salaam, Tanzania. The event formed part of the wider Spotlight TravelExpo programme and was designed to connect tourism suppliers from across Africa, overseas destinations, and the Indian Ocean Islands with Dar es Salaam-based travel agents, inbound and outbound tour operators, corporate buyers, and other travel-industry professionals.
                </p>
                <p>
                  ARLink28 was represented by Ezra, who engaged with a wide range of tourism and hospitality stakeholders, including organisations such as Safarilink Aviation, ONOMO Hotels, Konokono Safari, and other regional travel and tourism businesses.
                </p>
                <div className="event-full-text">
                  <p>
                    The Dar es Salaam edition took place at Johari Rotana, with the main TravelExpo running from 1:00 PM to 7:00 PM, followed by networking over drinks and snacks. Organisers expected approximately 125–150 attendees, creating an environment focused on direct trade engagement rather than a large-scale public exhibition.
                  </p>
                  <p>
                    What made the event particularly significant for ARLink28 was the recognition the brand had already begun to receive. Some participants and tourism suppliers recognised ARLink28 not because they personally knew Ezra, but because they had previously encountered the company’s branding and representation through Delroy’s attendance at the earlier Spotlight TravelExpo in Zimbabwe.
                  </p>
                  <p>
                    For ARLink28, recognition across separate events and countries demonstrates the value of consistent representation, professional branding, and repeated engagement within the African travel ecosystem. Trust in travel and tourism is rarely created through one conversation alone. It develops when organisations repeatedly appear in the right environments, engage professionally, follow up responsibly, and demonstrate that they are serious about building long-term relationships.
                  </p>
                  <p>
                    Ezra’s participation therefore helped continue a relationship-building process that had already begun elsewhere.
                  </p>
                  <p>
                    The event also exposed ARLink28 to different parts of the tourism value chain. Spotlight TravelExpos are structured around suppliers such as hotels, resorts, safari lodges, tourism organisations, airlines, car-hire companies, tour operators, and other tourism products, connecting them directly with buyers and travel professionals.
                  </p>
                  <p>
                    For ARLink28, the purpose of attending was clear: to strengthen relationships, identify future partnership opportunities, understand the East African travel market more deeply, and continue positioning the company as a credible participant within Africa’s wider tourism and aviation ecosystem.
                  </p>
                  <p>
                    The event was also valuable from a commercial-development perspective. Conversations created potential pathways for future cooperation with hotels, safari operators, aviation businesses, and tourism suppliers without prematurely presenting those discussions as confirmed partnerships.
                  </p>
                  <p>
                    Overall, Ezra’s attendance was highly successful. He represented ARLink28 professionally, built new relationships, strengthened existing brand recognition, and contributed to the company’s growing presence across East and Southern Africa.
                  </p>
                  <p>
                    The Dar es Salaam Spotlight TravelExpo reinforced an important lesson for ARLink28: recognition is built through consistency, and trust is built through repeated, meaningful engagement. Every event, introduction, conversation, and follow-up contributes to making ARLink28 a more familiar and credible name within Africa’s travel and aviation industry.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   31 July 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Johari Rotana, Dar es Salaam, Tanzania
                </span>
                <span className="engage-rep-tag">
                  <i className="fa-solid fa-user"></i>
                   Ezra Asanyo Rasugu
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="aerowest-summit-2026" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="AeroWest Africa Summit 2026 – Day One" loading="lazy" src="/images/AeroWest Summit Day 1.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="AeroWest Africa Summit 2026 – Opening Declaration" loading="lazy" src="/images/AeroWest Summit Day 1 - 2.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      SEP
                    </span>
                    <span className="event-day">
                      02
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-green">
                      Summit
                    </span>
                    <h3>
                      ARLink28 at AeroWest Africa Summit 2026 – Day One, Lagos
                    </h3>
                  </div>
                </div>
                <p>
                  Day One of the AeroWest Africa Summit 2026 marked an important external engagement for ARLink28, represented by Paul Damilola Agboola and Abdullahi Mohammed Sulaimon. The day began with the summit's opening programme, including remarks from Ms. Ola Wright, followed by presentations focused on aviation, tourism, destination development and African connectivity.
                </p>
                <p>
                  One of the notable sessions highlighted Benin's heritage and tourism potential, reinforcing the importance of connecting aviation development with tourism growth across the continent.
                </p>
                <div className="event-full-text">
                  <p>
                    Damilola and Sulaimon also used the day to network with aviation and tourism professionals attending the summit, creating opportunities to introduce ARLink28, understand other organisations operating within the sector and begin building relationships that could develop into future collaborations.
                  </p>
                  <p>
                    Organisations represented around the event included aviation, tourism, airline, payments and travel-sector stakeholders such as Jet Afrique, WATO, ASKY Airlines, Sion Airlines, TransactPay, the Federal Ministry of Aviation and Aerospace Development, and other industry participants.
                  </p>
                  <p>
                    For ARLink28, Day One was particularly valuable because it strengthened our visibility within the African aviation and tourism ecosystem while giving the team first-hand exposure to industry conversations, priorities and potential partners.
                  </p>
                  <p>
                    More importantly, the event supported our wider strategy of building relationships before full airline operations begin. These engagements contribute to our understanding of the market, expand our professional network and create potential pathways for future partnerships across aviation, hospitality, tourism and travel services.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   2 September 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Marriott Hotel, Ikeja, Lagos, Nigeria
                </span>
                <span className="engage-rep-tag">
                  <i className="fa-solid fa-user"></i>
                   Paul Damilola Agboola & Abdullahi Mohammed Sulaimon
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="aerowest-summit-2026-day2" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="AeroWest Africa Summit 2026 – Day Two with Equatorial Guinea Delegation" loading="lazy" src="/images/AeroWest Summit Day 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="ARLink28 with WATO and Barbados Delegation" loading="lazy" src="/images/AeroWest Summit Day 2 - 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="AeroWest Africa Summit 2026 – Day Two Stage Presentation" loading="lazy" src="/images/AeroWest Summit Day 2 - Stage.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      SEP
                    </span>
                    <span className="event-day">
                      03
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-green">
                      Summit
                    </span>
                    <h3>
                      ARLink28 at AeroWest Africa Summit 2026 – Day Two, Lagos
                    </h3>
                  </div>
                </div>
                <p>
                  Day Two of the AeroWest Africa Summit 2026 continued ARLink28’s engagement with key stakeholders across aviation, tourism, hospitality, regional development and supporting industries. ARLink28 was represented by Paul Damilola Agboola and Abdullahi Mohammed Sulaimon, who used the second day to deepen conversations and build relationships with individuals and organisations relevant to our long-term African travel ecosystem.
                </p>
                <p>
                  Among the notable engagements were Dr. Efetobo Awhana of Africa Tourism Awards/Brichone Experiences, Michael Wolf of Formula D, Karl Hala of Continental Hotels Nigeria, Emmanuel Frimpong of the Africa Medical Tourism Council, and Maria M. Nchama-Nzoho Abeso, representing Equatorial Guinea’s tourism sector.
                </p>
                <div className="event-full-text">
                  <p>
                    The team also engaged with Asher Payne of Barbados Tourism Marketing Inc., H.E. Juliette Bynoe-Sutherland, Barbados High Commissioner, and Ola Wright of WATO. These conversations broadened ARLink28’s exposure beyond traditional aviation into destination promotion, hospitality, medical tourism, international tourism cooperation and regional travel development.
                  </p>
                  <p>
                    Discussions during Day Two also touched on themes including African connectivity, private aviation, charter opportunities, destination development and strategic travel partnerships.
                  </p>
                  <p>
                    For ARLink28, the value of Day Two was not simply attendance, but relationship building. The contacts established provide possible pathways for future collaborations across hotels, destination marketing, tourism services, aviation and premium travel.
                  </p>
                  <p>
                    As ARLink28 continues developing its travel services and preparing for future aviation operations, engagements like AeroWest help us understand the market, strengthen our industry network and position the company within the wider African travel and aviation ecosystem.
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--primary,#e61e2b)', marginTop: '12px' }}>
                    Connecting Dreams, Connecting Africa.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   3 September 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Marriott Hotel, Ikeja, Lagos, Nigeria
                </span>
                <span className="engage-rep-tag">
                  <i className="fa-solid fa-user"></i>
                   Paul Damilola Agboola & Abdullahi Mohammed Sulaimon
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="aviation-africa-2026-day1" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="ARLink28 Representatives at Aviation Africa 2026" loading="lazy" src="/images/Aviation Africa 2026 Day 1.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="ARLink28 with KCAA and Industry Stakeholders" loading="lazy" src="/images/Aviation Africa 2026 Day 1 - 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Aviation Africa 2026 Summit Hall" loading="lazy" src="/images/Aviation Africa 2026 Day 1 - Stage.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      SEP
                    </span>
                    <span className="event-day">
                      09
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-blue">
                      Expo & Summit
                    </span>
                    <h3>
                      ARLink28 at Aviation Africa 2026 – Day One, Nairobi
                    </h3>
                  </div>
                </div>
                <p>
                  Day One of Aviation Africa 2026 marked an important industry engagement for ARLink28, with the company represented by Delroy Clyde Mahove, Ezra Asanyo Rasugu and Muhanguzi Mark Arthur at the Sarit Expo Centre in Nairobi.
                </p>
                <p>
                  Throughout the opening day, the team engaged with a range of aviation, tourism and infrastructure organisations, using the opportunity to introduce ARLink28, understand industry priorities and explore potential areas for future collaboration.
                </p>
                <div className="event-full-text">
                  <p>
                    Among the organisations engaged were SITA, Kenya Tourism Board, Air Charter Service, Jetways Airlines, the Kenya Civil Aviation Authority (KCAA), and AGS. Particularly valuable discussions were held with KCAA, AGS and Jetways Airlines, allowing the team to gain deeper insight into aviation operations, regulatory environments, industry infrastructure and potential commercial relationships.
                  </p>
                  <p>
                    The representatives also used the exhibition environment to strengthen ARLink28’s visibility among aviation professionals and gather information relevant to the company’s future development across travel services, aviation partnerships and regional connectivity.
                  </p>
                  <p>
                    For ARLink28, participation in Aviation Africa was not simply about attending an industry exhibition. Day One provided an opportunity to build relationships with organisations already operating across different areas of African aviation while expanding the company’s understanding of the ecosystem it intends to operate within.
                  </p>
                  <p>
                    These conversations contribute directly to ARLink28’s wider strategy of developing strong industry relationships before future airline operations, while continuing to expand its current travel and aviation services.
                  </p>
                  <p>
                    Day One reinforced the importance of collaboration, industry learning and maintaining an active presence within Africa’s aviation community.
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--primary,#e61e2b)', marginTop: '12px' }}>
                    Connecting Dreams, Connecting Africa.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   9 September 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Sarit Expo Centre, Nairobi, Kenya
                </span>
                <span className="engage-rep-tag">
                  <i className="fa-solid fa-user"></i>
                   Delroy Clyde Mahove, Ezra Asanyo Rasugu & Muhanguzi Mark Arthur
                </span>
              </div>
            </div>
          </div>
          <div className="event-item event-item-split glass-panel reveal" id="aviation-africa-2026-day2" style={{ scrollMarginTop: '110px' }}>
            <div className="event-img-left-wrapper event-carousel">
              <div className="event-carousel-slide active">
                <img alt="ARLink28 with Industry Stakeholders at ACASS Booth" loading="lazy" src="/images/Aviation Africa 2026 Day 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="ARLink28 Engagement with Aerospace & Maintenance Exhibitors" loading="lazy" src="/images/Aviation Africa 2026 Day 2 - 2.jpg" />
              </div>
              <div className="event-carousel-slide">
                <img alt="Aviation Africa 2026 Official Entrance Portal" loading="lazy" src="/images/Aviation Africa 2026 Day 2 - Entrance.jpg" />
              </div>
              <div className="event-carousel-dots">
                <span className="carousel-dot active" data-index="0"></span>
                <span className="carousel-dot" data-index="1"></span>
                <span className="carousel-dot" data-index="2"></span>
              </div>
            </div>
            <div className="event-right-body">
              <div>
                <div className="event-right-top">
                  <div className="event-date-box">
                    <span className="event-month">
                      SEP
                    </span>
                    <span className="event-day">
                      10
                    </span>
                    <span className="event-year">
                      2026
                    </span>
                  </div>
                  <div>
                    <span className="event-type-badge badge-blue">
                      Expo & Summit
                    </span>
                    <h3>
                      ARLink28 at Aviation Africa 2026 – Day Two, Nairobi
                    </h3>
                  </div>
                </div>
                <p>
                  Day Two of Aviation Africa 2026 continued ARLink28’s industry engagement in Nairobi, with the company represented by Delroy Clyde Mahove, Ezra Asanyo Rasugu and Mark Arthur Muhanguzi.
                </p>
                <p>
                  Following the relationships and industry conversations established on Day One, the team used the second day to continue engaging aviation professionals, gather market intelligence and explore opportunities relevant to ARLink28’s long-term development across African aviation and travel.
                </p>
                <div className="event-full-text">
                  <p>
                    A particularly significant engagement took place with Daniele Cereghetti, CEO of ZIMEX Aviation Group. The discussion provided an opportunity to understand ZIMEX’s aviation capabilities and explore areas that could potentially align with ARLink28’s future development, including charter operations, regional and remote African aviation, cargo services, maintenance and technical support, aviation training and turboprop operations.
                  </p>
                  <p>
                    The wider day also allowed Delroy, Ezra and Mark to continue networking with exhibitors, operators and industry stakeholders while representing ARLink28 and strengthening awareness of the company within Africa’s aviation ecosystem.
                  </p>
                  <p>
                    For ARLink28, Day Two reinforced the importance of building relationships with established aviation organisations before expanding into more complex aviation services. Conversations such as the engagement with ZIMEX provide valuable insight into how experienced operators structure their services and where future commercial collaboration may be possible.
                  </p>
                  <p>
                    Participation in Aviation Africa 2026 therefore served not only as an opportunity for visibility, but also as an important part of ARLink28’s ongoing industry learning, partnership development and preparation for future aviation operations across the continent.
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--primary,#e61e2b)', marginTop: '12px' }}>
                    Connecting Dreams, Connecting Africa.
                  </p>
                </div>
                <button className="btn-read-more">
                  Read Full Write-Up 
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div className="event-meta">
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                   10 September 2026
                </span>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                   Sarit Expo Centre, Nairobi, Kenya
                </span>
                <span className="engage-rep-tag">
                  <i className="fa-solid fa-user"></i>
                   Delroy Clyde Mahove, Ezra Asanyo Rasugu & Mark Arthur Muhanguzi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
