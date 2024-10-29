import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import globe from '@/public/logo.png';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const mcFont = localFont({
  src: './fonts/Minecraft.ttf',
  variable: '--font-minecraft',
});

export const metadata: Metadata = {
  title: 'WorldXplorer',
  description:
    'Explore the world through Street View with random locations and custom Overpass QL queries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href={globe.src} />
          <link
            rel="preconnect"
            href="https://maps.googleapis.com"
            crossOrigin="use-credentials"
          />
          <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        </head>
        <body
          className={`${geistMono.className} ${mcFont.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
