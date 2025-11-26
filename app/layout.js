import { Comfortaa, Geist, Geist_Mono, Manrope, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Suspense } from "react";
import AnimatedLoader from "@/components/custom/animatedLogo";
import RouteLoader from "@/components/skeleton/RouteLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "500", "400", "600", "700"], // add more weights if needed
  display: "swap",
});

export const metadata = {
  title: "Noire",
  description:"Noire is a product design company, giving products a professional identity.",
  icons: {
    icon: "/favicon.ico", // your new favicon
    shortcut: "/favicon.ico", // optional for iOS
  },
  openGraph: {
    images: [
      {
        url: "/metadata_img.png", // replace with your actual image path or full URL
        width: 500,
        height: 500,
        alt: "Noire",
      },
    ],
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${comfortaa.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        <Suspense fallback={<RouteLoader />}>
          <Toaster position="top-right" />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
