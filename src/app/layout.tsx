import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import meta from "@/data/meta.json";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: meta.title,
  description: meta.description,
  applicationName: "Mikheil Berishvili Portfolio",
  generator: "Next.js 15",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Mikheil Berishvili",
    "mberrish",
    "development",
    "georgia",
    "full-stack developer",
    "Portfolio",
    "Software Engineer",
    "Full-Stack Developer",
    "Georgia",
  ],
  authors: [{ name: "Mikheil Berishvili", url: meta.siteUrl }],
  creator: "Mikheil Berishvili",
  publisher: "Mikheil Berishvili",
  formatDetection: { email: true, address: false, telephone: true },
  category: "technology",
  alternates: { canonical: meta.siteUrl, languages: { "en-US": meta.siteUrl } },
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    title: meta.title,
    description: meta.description,
    url: meta.siteUrl,
    siteName: meta.title,
    images: [
      {
        url: meta.ogImage.startsWith("http") ? meta.ogImage : meta.siteUrl + meta.ogImage,
        width: 1200,
        height: 630,
        alt: "Mikheil Berishvili - Full-Stack Developer Portfolio",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Mikheil",
    lastName: "Berishvili",
    username: "mberrishdev",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    creator: "@mberrishdev",
    site: "@mberrishdev",
    images: {
      url: meta.ogImage.startsWith("http") ? meta.ogImage : meta.siteUrl + meta.ogImage,
      alt: "Mikheil Berishvili - Full-Stack Developer Portfolio",
    },
  },
  verification: { other: { me: ["mikheil.berishvili@outlook.com"] } },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mikheil Berishvili",
    alternateName: "mberrish",
    url: meta.siteUrl,
    image: meta.siteUrl + meta.ogImage,
    jobTitle: "Full-Stack Developer",
    description: meta.description,
    sameAs: [
      "https://github.com/mberrishdev",
      "https://linkedin.com/in/mberrishdev",
    ],
    address: { "@type": "PostalAddress", addressCountry: "GE", addressLocality: "Georgia" },
    email: "mikheil.berishvili@outlook.com",
    telephone: "+995591300569",
    knowsAbout: [
      ".NET", "C#", "React", "TypeScript", "JavaScript", "Node.js", "Next.js",
      "SQL Server", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "SignalR",
      "Microservices", "Cloud Computing", "Azure", "DevOps", "Clean Architecture",
      "CQRS", "System Design",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "s0v14qc0c0");`}
        </Script>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={dmSans.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
