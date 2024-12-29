import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import { Modal } from '@/components/modal';
import { Toast } from '@/components/toast';
import { Footer } from '@/components/footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Cosmic Bunny',
  description: 'Platform for buying and selling games like Steam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <head>
        <Script
          src={`${process.env.MIDTRANS_URL}/snap/snap.js`}
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        />
      </head>
      <body className="flex flex-col min-h-screen font-sans">
        <div className="flex-grow">
          {children}
        </div>
        <Toast />
        <Modal />
        <Footer />
      </body>
    </html>
  );
}

