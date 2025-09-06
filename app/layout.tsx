// app/layout.tsx - (No changes needed)
import type { Metadata } from "next";
import { Montserrat, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
        className={`${montserrat.variable} ${poppins.variable} ${nunito.variable} font-nunito`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}