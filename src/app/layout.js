import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Axios from "@/lib/axiosInstance";

export async function generateMetadata() {
  let seoData = {};
  try {
    const res = await Axios.get("settings");
    seoData = res.data.data;
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
  }
  return {
    title: seoData?.seo?.title || "MOTAZ MCQs",
    description: seoData?.seo?.description || "motaz mcqs website",
    keywords: seoData?.seo?.keywords || "mcqs, motaz", 
  };

}
export default async function RootLayout({ children }) {
  let seoData = {};
  try {
    const res = await Axios.get("settings");
    seoData = res.data.data;
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
  }
  return (
    <html lang="en">
       <link rel="icon" 
       href="favicon.svg"
        />
      <body>
        <AuthProvider>
         {children}
        </AuthProvider>
      </body>
    </html>
  );
}
