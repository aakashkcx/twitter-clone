import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Domine, Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
  description: "A Twitter clone.",
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
          "flex min-h-screen flex-col gap-10",
          geistSans.variable,
          geistMono.variable,
          domineSerif.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <Header />
          <main className="container flex grow flex-col gap-5">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
