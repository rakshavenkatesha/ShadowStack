import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProviderClient } from "@/components/layout/ThemeProviderClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShadowStack - AI Spend Audit Platform",
  description: "Identify and eliminate hidden overspending across your AI tool stack. ShadowStack helps startups optimize AI subscriptions and save thousands annually.",
  keywords: ["AI spend", "audit", "ChatGPT", "Claude", "cost optimization", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProviderClient>
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}
