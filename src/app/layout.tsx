import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Navbar from "@/components/myComponents/Navbar";
import Footer from "@/components/myComponents/Footer";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers()
  const pathname = headerList.get("x-pathname") || "/"
  const showNavbarAndFooter = pathname === "/login" || pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased transition-colors duration-300 ease-in-out`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {!showNavbarAndFooter && <Navbar />}
          <div className={`${!showNavbarAndFooter && "pt-16"}`}>
            {children}
          </div>
          {!showNavbarAndFooter && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
