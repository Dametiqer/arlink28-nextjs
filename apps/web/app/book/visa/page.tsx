import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import BookingWidget from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "Visa Support | ARLink28",
  description: "Get support with visa applications and travel documentation for your journey.",
};

/**
 * NOTE: In the original static export, /book/visa.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact original markup
 * could not be recovered, so this page reuses the fully-recovered booking
 * widget from the homepage hero section, pre-selecting the "visa" tab.
 */
export default function BookVisaPage() {
  return (
    <section className="book-page">
      <div className="book-header">
        <span className="section-tag">Visa Support</span>
        <h1>Visa Support</h1>
      </div>
      <BookingWidget initialTab="visa" />
    </section>
  );
}
