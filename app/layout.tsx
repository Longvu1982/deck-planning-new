import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deck planning v2",
  description: "Agile deck planning tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={10000}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
