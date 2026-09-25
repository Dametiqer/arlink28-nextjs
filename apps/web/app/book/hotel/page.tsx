import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import BookingWidget from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "Book a Hotel | ARLink28",
  description: "Find and reserve trusted hotel partners for your next trip with ARLink28.",
};

/**
 * NOTE: In the original static export, /book/hotel.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact original markup
 * could not be recovered, so this page reuses the fully-recovered booking
 * widget from the homepage hero section, pre-selecting the "hotel" tab.
 */
export default function BookHotelPage() {
  return (
    <section className="book-page">
      <div className="book-header">
        <span className="section-tag">Hotel Reservation</span>
        <h1>Book a Hotel</h1>
      </div>
      <BookingWidget initialTab="hotel" />
    </section>
  );
}
