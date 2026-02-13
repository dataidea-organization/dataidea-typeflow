import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dataidea typeflow - Typing Speed Test",
  description: "Test your typing speed and accuracy with dataidea typeflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8076040302380238"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
