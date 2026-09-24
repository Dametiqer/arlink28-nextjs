import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 8% 80px",
      }}
    >
      <span className="section-tag">404</span>
      <h1 style={{ margin: "16px 0" }}>This page could not be found.</h1>
      <p style={{ marginBottom: "24px" }}>
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to Home <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </section>
  );
}
