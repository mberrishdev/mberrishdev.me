import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import meta from "@/data/meta.json";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { buildGraph } from "@/lib/structured-data";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: {
    default: meta.title,
    template: meta.titleTemplate,
  },
  description: meta.description,
  applicationName: meta.name,
  referrer: "origin-when-cross-origin",
  authors: [{ name: meta.name, url: meta.siteUrl }],
  creator: meta.name,
  publisher: meta.name,
  formatDetection: { email: true, address: false, telephone: true },
  category: "technology",
  alternates: {
    canonical: "/",
    // Feed autodiscovery: this is how RSS readers and browser extensions find
    // the feed. Without it, a feed only exists for people who guess the URL.
    types: {
      "application/rss+xml": [
        { url: "/blog/rss.xml", title: `${meta.name} — Blog` },
      ],
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    // Images come from the opengraph-image.tsx file convention.
    title: meta.title,
    description: meta.description,
    url: "/",
    siteName: meta.name,
    locale: "en_US",
    type: "profile",
    firstName: meta.givenName,
    lastName: meta.familyName,
    username: meta.alternateName,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    creator: meta.xHandle,
    site: meta.xHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="me" href={meta.socials.github} />
        <link rel="me" href={meta.socials.linkedin} />
        <link rel="me" href={meta.socials.x} />
        {/*
          A plain <script>, deliberately NOT next/script: next/script defers
          JSON-LD into the RSC flight payload, where it never appears as a
          parseable element in the served HTML — invisible to every crawler
          that does not execute JavaScript.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGraph()) }}
        />
      </head>
      <body className={dmSans.className}>
        {children}
        <Analytics />
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "s0v14qc0c0");`}
        </Script>
      </body>
    </html>
  );
}
