import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import { Suspense } from "react";

import BookFlightContent from "./BookFlightContent";

export const metadata: Metadata = {
  title: "Book a Flight | ARLink28",
  description: "Search and book domestic and international flights across Africa and beyond with ARLink28.",
};

/**
 * In the original static export, /book/flight.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact markup was
 * recovered from the page's own JS chunk in that export and reimplemented
 * here as BookFlightContent (partner cards + the Zanzibar/Blue Ocean
 * featured getaway section) instead of the "could not be recovered" stub.
 */
export default function BookFlightPage() {
  return (
    <Suspense fallback={<div className="book-page" style={{ color: "#fff" }}>Loading...</div>}>
      <BookFlightContent />
    </Suspense>
  );
}
