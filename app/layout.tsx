"use client"
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./pageComponents/Footer";
import Header from "./pageComponents/Header";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollUp from "./pageComponents/ScrollUp";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        <AuthProvider>

          <Header />
          {children}
          <ScrollUp/>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
