import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./providers/storeProvider";
import TransparentNavbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixArt | Create pixel art from images",
  description: "Create pixel art from images",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className=" hidden md:flex">
              <TransparentNavbar />
            </div>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
