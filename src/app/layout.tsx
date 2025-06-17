import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import meta from "@/data/meta.json";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
    "developemnt",
    "georgia",
    "full-stack developer",
    "Portfolio",
    "Software Engineer",
    "Full-Stack Developer",
    "Georgia",
  ],
  authors: [
    { name: "Mikheil Berishvili", url: meta.siteUrl }
  ],
  creator: "Mikheil Berishvili",
  publisher: "Mikheil Berishvili",
  formatDetection: {
    email: true,
    address: false,
    telephone: true
  },
  category: "technology",
  alternates: {
    canonical: meta.siteUrl,
    languages: {
      "en-US": meta.siteUrl
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico"
  },
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
      "max-snippet": -1
    }
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
        alt: meta.title
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    creator: "@mberrishdev",
    images: [meta.ogImage.startsWith("http") ? meta.ogImage : meta.siteUrl + meta.ogImage]
  },
  facebook: {
    appId: ""
  },
  pinterest: {
    richPin: true
  },
  verification: {
    google: "",
    yandex: "",
    yahoo: "",
    other: {
      me: ["mikheil.berishvili@outlook.com"]
    }
  },
  appLinks: {
    ios: {
      url: meta.siteUrl,
      app_store_id: ""
    },
    android: {
      package: "",
      app_name: "Mikheil Berishvili Portfolio"
    },
    web: {
      url: meta.siteUrl,
      should_fallback: true
    }
  },
  archives: [],
  assets: [],
  bookmarks: [],
  other: {
    custom: "meta"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </head>
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
