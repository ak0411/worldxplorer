import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import globe from '@/public/assets/logo.png';
import { Toaster } from '@/components/ui/toaster';

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
      <html lang="en" suppressHydrationWarning className="dark">
        <head>
          <link rel="icon" href={globe.src} />
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
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
