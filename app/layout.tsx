// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Poppins, Nunito } from "next/font/google";
import "./globals.css";

// Font configuration
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // CSS Variable name
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Climate Action Association UPEI",
  description: "Leading change for a sustainable future at UPEI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable} ${nunito.variable} bg-base-bg text-tertiary font-nunito`}
      >
        {children}
      </body>
    </html>
  );
}