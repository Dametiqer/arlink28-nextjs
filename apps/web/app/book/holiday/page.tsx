import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import BookingWidget from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "Book a Holiday Package | ARLink28",
  description: "Browse curated holiday packages and book your next getaway with ARLink28.",
};

/**
 * NOTE: In the original static export, /book/holiday.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact original markup
 * could not be recovered, so this page reuses the fully-recovered booking
 * widget from the homepage hero section, pre-selecting the "holiday" tab.
 */
export default function BookHolidayPage() {
  return (
    <section className="book-page">
      <div className="book-header">
        <span className="section-tag">Holiday Package</span>
        <h1>Book a Holiday Package</h1>
      </div>
      <BookingWidget initialTab="holiday" />
    </section>
  );
}
