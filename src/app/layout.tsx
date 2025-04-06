import type { Metadata } from "next";
import { Domine, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const domineSerif = Domine({
  variable: "--font-domine-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twitter",
  description: "A Twitter clone.",
  authors: { name: "Aakash Kc" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${domineSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
