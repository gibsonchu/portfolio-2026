import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: {
    default: "Gibson Chu Portfolio",
    template: "%s · Gibson Chu"
  },
  description:
    "Urban planning, product strategy, civic technology, mobility, public space, housing, and urban storytelling portfolio by Gibson Chu."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <div className="book-page-turn">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
