import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/components/provider/theme-provider";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Binance Vision Scrapper",
  description:
    "With just a few clicks, fetch and merge Binance Exchange's historical datas into a CSV file from data.binance.vision"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
