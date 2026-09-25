import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARLink28 Admin",
  description: "Staff dashboard for packages, departures, bookings and customers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
