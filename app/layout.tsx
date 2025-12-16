import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CaptionKiln — Bake captions into video",
  description: "Multi-video subtitle editing, baked into your final render.",
  applicationName: "CaptionKiln",
  keywords: ["multi video", "subtitle editor", "burn-in captions", "export", "render", "video tools"],
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-kiln-black text-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
