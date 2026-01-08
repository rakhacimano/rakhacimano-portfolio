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

export const metadata: Metadata = {
  title: {
    default: "Rakha Putra Pratama | UI/UX Designer",
    template: "%s | Rakha Putra Pratama",
  },
  description: "Portfolio of Rakha Putra Pratama (Rakhacimano), a Senior UI/UX Designer and Creative Web Developer specializing in immersive digital experiences and neo-brutalist design.",
  keywords: ["Rakhacimano", "Rakha Putra Pratama", "Rakha UI/UX", "Portfolio", "Web Developer", "Next.js", "React", "Creative Developer", "UI/UX Designer"],
  openGraph: {
    title: "Rakhacimano - Rakha Putra Pratama | Creative Developer & UI/UX",
    description: "Senior UI/UX Designer and Creative Web Developer. Explore my portfolio of immersive digital experiences.",
    url: "https://rakhacimano.vercel.app",
    siteName: "Rakhacimano Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakhacimano - Rakha Putra Pratama | Portfolio",
    description: "Creative Web Developer and UI/UX Designer.",
    creator: "@rakhacimano",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";

import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rakha Putra Pratama",
    alternateName: ["Rakhacimano", "Rakha UI/UX"],
    url: "https://rakhacimano.com",
    jobTitle: "Senior UI/UX Designer & Web Developer",
    sameAs: [
      "https://github.com/rakhacimano",
      "https://linkedin.com/in/rakhaputra",
      "https://instagram.com/rakhacimano", // Replace with actual links if known, these are placeholders based on username
    ],
    description: "Creative Web Developer and UI/UX Designer specializing in immersive digital experiences.",
    image: "https://rakhacimano.vercel.app/og-image.jpg", // Placeholder
  };

  return (
    <html lang="en" className={`${onest.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-dark font-sans cursor-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Cursor />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
