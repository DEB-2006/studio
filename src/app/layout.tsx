import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// GeistSans and GeistMono are objects, their .variable property provides the CSS class
// to enable the font variables. We don't call them as functions.

export const metadata: Metadata = {
  title: 'SnapRecipe - AI Powered Recipes from Photos',
  description: 'Upload a photo of your ingredients and get an instant recipe!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
