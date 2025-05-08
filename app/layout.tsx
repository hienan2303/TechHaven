import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
export const metadata: Metadata = {
  title: "Tech Haven",
  description: "Buy cool products",
  icons: {
    icon: [
      { url: '/TechHaven.png', type: 'image/png' },
      // Add these alternative sizes if available
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' } // For iOS devices
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
