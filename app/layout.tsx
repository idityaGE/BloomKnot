import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bloomknot - We Tie Your Dreams',
  description: 'Premium Wedding Planning Services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className} style={{ isolation: 'isolate' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <div className="relative z-0">
            {children}
          </div>

          {/* Toaster for notifications */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
