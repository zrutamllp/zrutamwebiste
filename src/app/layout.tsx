import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { SITE_DESCRIPTION } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Zrutam | AI-Powered Corporate L&D Solutions",
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://www.zrutam.com"),
  openGraph: {
    title: "Zrutam | AI-Powered Corporate L&D Solutions",
    description: SITE_DESCRIPTION,
    url: "https://www.zrutam.com",
    siteName: "Zrutam",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zrutam | AI-Powered Corporate L&D Solutions",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased bg-paper text-ink">
        <MotionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
