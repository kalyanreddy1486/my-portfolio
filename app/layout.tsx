import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content";
import { head } from "@/lib/head";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const hand = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--font-caveat" });

const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
  title: site.title,
  description: site.desc,
  authors: [{ name: site.name }],
  openGraph: { title: site.title, description: site.desc, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.title, description: site.desc },
};

export const viewport: Viewport = { themeColor: "#09090b", colorScheme: "dark" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${geist.variable} ${mono.variable} ${hand.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: head }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
