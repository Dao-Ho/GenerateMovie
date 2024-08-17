import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";


const manrope = Manrope({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-Midnight">
      <body className={`${manrope.className} bg-Midnight`} >
          <Navbar />
          <main className="bg-Midnight">{children}</main>
        </body>
      </html>
  );
}
