import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Motaz Mcqs",
  description: "motaz mcqs website",
};

export default function RootLayout({ children }) {  
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./logo-nav.svg" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
