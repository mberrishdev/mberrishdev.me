import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import meta from "@/data/meta.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
    url: meta.siteUrl,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
