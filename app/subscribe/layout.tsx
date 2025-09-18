import type { Metadata } from "next";
import { montserrat, poppins, nunito } from "../layout";

export const metadata: Metadata = {
  title: "Subscribe to Our Newsletter | Climate Action Association UPEI",
  description: "Get emails with the latest news about events and initiatives!",
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${montserrat.variable} ${poppins.variable} ${nunito.variable} font-nunito flex min-h-[90vh] items-center justify-center bg-base-bg p-4 text-tertiary`}
    >
      {children}
    </div>
  );
}