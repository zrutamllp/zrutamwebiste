import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { SITE_DESCRIPTION } from "@/shared/constants/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zrutam | AI-Powered Corporate L&D Solutions",
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://www.zrutam.com"),
  icons: {
    icon: "/logo.png?v=3",
    shortcut: "/logo.png?v=3",
    apple: "/logo.png?v=3",
  },
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
