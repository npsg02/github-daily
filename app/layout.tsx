import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub Trending Daily | Discover Hot Repositories",
  description: "Automatically crawl and archive GitHub trending repositories daily, weekly, and monthly. Discover the hottest projects with search and filtering capabilities.",
  keywords: ["GitHub", "trending", "repositories", "open source", "development", "coding"],
  authors: [{ name: "GitHub Daily" }],
  openGraph: {
    title: "GitHub Trending Daily",
    description: "Discover the hottest repositories on GitHub",
    type: "website",
    siteName: "GitHub Trending Daily",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Trending Daily",
    description: "Discover the hottest repositories on GitHub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
