"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Partner = {
  name: string;
  logo: string;
  desc: string;
  tags: string[];
  getUrl: (params: { to: string; date: string }) => string;
};

const partners: Partner[] = [
  {
    name: "GetYourGuide",
    logo: "/images/get your guide.png",
    desc: "The world's largest tours and activities marketplace. Book skip-the-line tickets, day trips, and curated experiences across Africa and beyond.",
    tags: ["Tours & Activities", "Skip-the-line", "Day Trips", "Instant Confirmation"],
    getUrl: ({ to }) => `https://www.getyourguide.com/s/?q=${to || "Africa"}`,
  },
  {
    name: "Viator",
    logo: "/images/viator.jpg",
    desc: "The leading platform for tours, attractions and experiences worldwide. Book guided tours, adventure activities, and unforgettable experiences at your destination.",
    tags: ["Tours & Experiences", "Guided Tours", "Adventure", "Instant Confirmation"],
    getUrl: () => "https://www.viator.com/?pid=P00304315&mcid=42383&medium=link",
  },
  {
    name: "Trip.com",
    logo: "/images/trip.png",
    desc: "All-inclusive holiday packages combining flights, hotels and transfers. Great value bundles for solo travellers, couples and families.",
    tags: ["Flight + Hotel", "All-Inclusive", "Group Packages", "Flexible Dates"],
    getUrl: ({ to, date }) => `https://www.trip.com/holidays/?destination=${to}&date=${date}`,
  },
];

const zanzibarPackages = [
  { img: "/images/packages/zanzibar-escape.jpg", title: "Zanzibar Escape", meta: "4 Nights • 2 Adults", price: "$649" },
  { img: "/images/packages/zanzibar-mini-escape.jpg", title: "Zanzibar Mini Escape", meta: "3 Nights • 2 Adults", price: "$449" },
  { img: "/images/packages/zanzibar-family-friends-escape.jpg", title: "Zanzibar Family & Friends Escape", meta: "5 Nights • 4 Adults", price: "$1,499" },
  { img: "/images/packages/zanzibar-group-escape.jpg", title: "Zanzibar Group Escape", meta: "4 Nights • 6 Adults", price: "$1,399" },
  { img: "/images/packages/zanzibar-royal-escape.jpg", title: "Zanzibar Royal Escape", meta: "4 Nights • 6 Adults", price: "$3,099" },
  { img: "/images/packages/zanzibar-solo-escape.jpg", title: "Zanzibar Solo Escape", meta: "3 Nights • 1 Adult", price: "$369" },
  { img: "/images/packages/zanzibar-solo-sea-view-escape.jpg", title: "Zanzibar Solo Sea View Escape", meta: "3 Nights • 1 Adult", price: "$429" },
  { img: "/images/packages/zanzibar-solo-extended-escape.jpg", title: "Zanzibar Solo Extended Escape", meta: "4 Nights • 1 Adult", price: "$469" },
];

export default function BookHolidayContent() {
  const params = useSearchParams();
  const to = params.get("to") || "";
  const date = params.get("date") || "";

  return (
    <main className="book-page">
      <Link href="/" className="book-back-link">
        <i className="fa-solid fa-arrow-left"></i> Back to Search
      </Link>
      <div className="book-header">
        <span className="section-tag">Tours & Holiday Packages</span>
        <h1>
          Choose Your <span className="highlight-red">Holiday Partner</span>
        </h1>
        <p>
          Explore curated holiday packages and experiences with our trusted partners. Pick one to continue your booking.
        </p>
      </div>
      {(to || date) && (
        <div className="book-search-summary">
          {to && (
            <div className="book-search-tag">
              <i className="fa-solid fa-umbrella-beach"></i> Destination: <span>{to}</span>
            </div>
          )}
          {date && (
            <div className="book-search-tag">
              <i className="fa-solid fa-calendar"></i> Date: <span>{date}</span>
            </div>
          )}
        </div>
      )}
      <div className="partners-grid">
        {partners.map((partner, i) => (
          <div className="partner-card" key={i}>
            <img src={partner.logo} alt={partner.name} className="partner-card-logo" />
            <div className="partner-card-name">{partner.name}</div>
            <p className="partner-card-desc">{partner.desc}</p>
            <div className="partner-card-tags">
              {partner.tags.map((tag, j) => (
                <span className="partner-tag" key={j}>
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={partner.getUrl({ to, date })}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card-btn"
            >
              Explore with {partner.name} <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        ))}
      </div>
      <div className="zanzibar-pkgs-section" style={{ marginTop: "70px" }}>
        <div className="book-header" style={{ marginBottom: "36px" }}>
          <span className="section-tag">Featured Getaway</span>
          <h2 style={{ fontSize: "30px", fontWeight: 700, marginBottom: "10px" }}>
            ARLink28 x Blue Ocean — <span className="highlight-red">Zanzibar Escapes</span>
          </h2>
          <p>Curated Zanzibar holiday packages — from solo getaways to royal villas for groups.</p>
        </div>
        <div className="partners-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
          {zanzibarPackages.map((pkg, i) => (
            <a
              href="https://blueoceanhotels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card"
              style={{ padding: 0, overflow: "hidden", textDecoration: "none", color: "inherit" }}
              key={i}
            >
              <img src={pkg.img} alt={pkg.title} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "18px 20px 24px" }}>
                <div className="partner-card-name" style={{ fontSize: "17px" }}>
                  {pkg.title}
                </div>
                <p className="partner-card-desc" style={{ margin: "6px 0 14px" }}>
                  {pkg.meta} • from <strong style={{ color: "var(--primary-red)" }}>{pkg.price}</strong>
                </p>
                <span className="partner-card-btn">
                  Enquire Now <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
