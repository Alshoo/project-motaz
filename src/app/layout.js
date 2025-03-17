import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";



export const metadata = {
  title: "MOTAZ MCQs",
  description: "motaz mcqs website",
};

export default function RootLayout({ children }) {  
  return (
    <html lang="en"> 
      
        <link rel="icon" href="الاحا.svg"/>
      
      <body>
        
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
