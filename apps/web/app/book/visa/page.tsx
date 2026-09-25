import type { Metadata } from "next";
import "../../styles/book-inline.css";

import "../../styles/book.css";

import { Suspense } from "react";

import BookVisaContent from "./BookVisaContent";

export const metadata: Metadata = {
  title: "Visa Support | ARLink28",
  description: "Get support with visa applications and travel documentation for your journey.",
};

/**
 * In the original static export, /book/visa.html was a client-only
 * component that bailed out of static rendering (it only shipped a
 * "Loading..." placeholder in the exported HTML). Its exact markup was
 * recovered from the page's own JS chunk in that export and reimplemented
 * here as BookVisaContent (partner cards + the Zanzibar/Blue Ocean
 * featured getaway section) instead of the "could not be recovered" stub.
 */
export default function BookVisaPage() {
  return (
    <Suspense fallback={<div className="book-page" style={{ color: "#fff" }}>Loading...</div>}>
      <BookVisaContent />
    </Suspense>
  );
}
