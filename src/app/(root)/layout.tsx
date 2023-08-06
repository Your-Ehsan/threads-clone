import "@/src/styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import {ReactNode} from "react";
import Topbar from "@/src/components/shared/Topbar";
import LeftSidebar from "@/src/components/shared/LeftSidebar";
import RightSidebar from "@/src/components/shared/RightSidebar";
import Bottombar from "@/src/components/shared/Bottombar";
import { meta } from "@/src/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1 text-white`}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
