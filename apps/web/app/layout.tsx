import type { Metadata } from "next";
import { Onest, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { Toaster } from "sonner";

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
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rakha Putra Pratama",
    alternateName: ["rakhacimano", "Rakha UI/UX"],
    url: "https://rakhacimano.com",
    jobTitle: "UI/UX Designer & Web Developer",
    sameAs: [
      "https://github.com/rakhacimano",
      "https://linkedin.com/in/rakhacimano",
      "https://dribbble.com/rakhacimano",
      "https://behance.net/rakhacimano",
      "https://github.com/rakhacimano",
      "https://instagram.com/rakhacimano",
    ],
    description: "Creative Web Developer and UI/UX Designer specializing in immersive digital experiences.",
    image: "https://rakhacimano.vercel.app/og-image.jpg",
  };

  return (
    <html lang="en" className={`${onest.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-dark font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
            },
          }}
        />
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
