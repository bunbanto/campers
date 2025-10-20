import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata = {
  title: 'TravelTrucks',
  description: 'Camper rental frontend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <TanStackProvider>
        <body>
          <Header />
          <main className="container">{children}</main>
        </body>
      </TanStackProvider>
    </html>
  );
}
