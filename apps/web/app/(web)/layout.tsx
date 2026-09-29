import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "ARLinks - Premium African Aviation",
  description: "Connecting you to the world with affordable, premium flights. ARLink28 — Africa's next great airline.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ClientEffects />
      <BackToTop />
    </>
  );
}
