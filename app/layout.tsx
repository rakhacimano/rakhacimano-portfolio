import type { Metadata } from "next";
import { Onest, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

// Configure Onest font
const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

// Configure Instrument Sans
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Configure Instrument Serif
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Rakha P. | Digital Neo-Brutalist",
  description: "Senior UI/UX Designer Portfolio",
};

import Cursor from "@/components/Cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-dark font-sans cursor-none">
        <SmoothScroll>
          <Cursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
