import { type Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "@/src/styles/global.css";
import { meta } from "@/src/constants";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

const inter = Inter({ subsets: ["latin"] });

export default async function Authlayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <main className="flex justify-center items-center h-screen">
          {children}
          </main>
          </body>
      </html>
    </ClerkProvider>
  );
}
