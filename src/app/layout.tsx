import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Domine, Geist, Geist_Mono } from "next/font/google";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

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
  description: "A Twitter clone made with Next.js",
  authors: { name: "Aakash Kc" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          domineSerif.variable,
        )}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          {children}
          <div className="fixed right-5 bottom-5">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
