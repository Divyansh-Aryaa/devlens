import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Syne, JetBrains_Mono } from "next/font/google";
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "GitHub Profile Analyzer",
  description: "Analyze GitHub profiles, view top repositories, and language statistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#060912]">
      <body className={`${syne.variable} ${mono.variable} antialiased bg-[#060912] m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}
