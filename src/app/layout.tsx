import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


// export const manrope = Manrope({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700", "800"],
//   fallback: ['Inter']
// });

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Paga Dios',
  description: 'Montech company',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-content'

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}  `}>{children}</body>
    </html>
  );
}
