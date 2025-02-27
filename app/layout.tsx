import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "./components/navigation/header";

config.autoAddCss = false;

const valve = localFont({
  src: [
    {
      path: "./fonts/PPValve-PlainExtralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/PPValve-PlainRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPValve-PlainMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PPValve-PlainSemibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/PPValve-PlainExtrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-valve",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Presidential Daily Briefs",
  description: "Generate custom PDBs with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${valve.variable} antialiased`}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
