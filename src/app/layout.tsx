import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptForge - AI Prompt Marketplace & Playground",
  description: "Explore, build & launch AI prompts beautifully. Browse tested prompts, try them live, no guesswork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
