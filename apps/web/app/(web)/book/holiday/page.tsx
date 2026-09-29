import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import { Suspense } from "react";

import BookHolidayContent from "./BookHolidayContent";

export const metadata: Metadata = {
  title: "Book a Holiday Package | ARLink28",
  description: "Browse curated holiday packages and book your next getaway with ARLink28.",
};

/**
 * In the original static export, /book/holiday.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact markup was
 * recovered from the page's own JS chunk in that export and reimplemented
 * here as BookHolidayContent (partner cards + the Zanzibar/Blue Ocean
 * featured getaway section) instead of the "could not be recovered" stub.
 */
export default function BookHolidayPage() {
  return (
    <Suspense fallback={<div className="book-page" style={{ color: "#fff" }}>Loading...</div>}>
      <BookHolidayContent />
    </Suspense>
  );
}
