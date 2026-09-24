import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import BookingWidget from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "Book a Flight | ARLink28",
  description: "Search and book domestic and international flights across Africa and beyond with ARLink28.",
};

/**
 * NOTE: In the original static export, /book/flight.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact original markup
 * could not be recovered, so this page reuses the fully-recovered booking
 * widget from the homepage hero section, pre-selecting the "flight" tab.
 */
export default function BookFlightPage() {
  return (
    <section className="book-page">
      <div className="book-header">
        <span className="section-tag">Flight Booking</span>
        <h1>Book a Flight</h1>
      </div>
      <BookingWidget initialTab="flight" />
    </section>
  );
}
