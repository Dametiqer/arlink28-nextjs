import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import { Suspense } from "react";

import BookHotelContent from "./BookHotelContent";

export const metadata: Metadata = {
  title: "Book a Hotel | ARLink28",
  description: "Find and reserve trusted hotel partners for your next trip with ARLink28.",
};

/**
 * In the original static export, /book/hotel.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact markup was
 * recovered from the page's own JS chunk in that export and reimplemented
 * here as BookHotelContent (partner cards + the Zanzibar/Blue Ocean
 * featured getaway section) instead of the "could not be recovered" stub.
 */
export default function BookHotelPage() {
  return (
    <Suspense fallback={<div className="book-page" style={{ color: "#fff" }}>Loading...</div>}>
      <BookHotelContent />
    </Suspense>
  );
}
