import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/component/navbar/page';

const futura = localFont({
  src: [
    {
      path: './fonts/futurabook.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/futuraheavy.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-futura',
});

const ragick = localFont({
  src: [
    {
      path: './fonts/ragick.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-ragick',
});

export const metadata = {
  title: 'Derbi Tri Julian',
  description: 'Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${futura.variable} ${ragick.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main className="mx-4 md:mx-30">{children}</main>
      </body>
    </html>
  );
}
