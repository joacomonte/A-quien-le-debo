import { Inter, Poppins, IBM_Plex_Mono, Manrope } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export const ibm = IBM_Plex_Mono({
  weight: "500",
  subsets: ["latin"],
});