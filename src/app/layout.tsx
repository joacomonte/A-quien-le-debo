import type { Metadata, Viewport } from "next";
import { Inter, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const IBM = IBM_Plex_Mono({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next Ape",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex h-[100svh] w-screen flex-col items-center `}
      >
        {children}
      </body>
    </html>
  );
}
