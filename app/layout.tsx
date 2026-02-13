import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DATAIDEA TypeFlow",
  description: "Learn Programming for Data Science",
  authors: [{ name: "Juma Shafara" }],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "DATAIDEA TypeFlow",
    description: "Learn Programming for Data Science",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@datas_idea",
  },
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
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZD84FCME05"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZD84FCME05');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
