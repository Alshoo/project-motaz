import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";



export const metadata = {
  title: "Motaz Mcqs",
  description: "motaz mcqs website",
};

export default function RootLayout({ children }) {  
  return (
    <html lang="en"> 
      
        <link rel="icon" href="MOTAZ MCQs_20250317_230630rrg.svg"/>
      
      <body>
        
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
