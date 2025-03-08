import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from "@/components/navigation"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      {/* Add isolation to create proper stacking context */}
      <body className={inter.className} style={{ isolation: 'isolate', position: 'relative' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          {/* Navigation - lowered z-index */}
          <div className="relative z-40">
            <Navigation />
          </div>

          {/* Main content */}
          <div className="relative z-0">
            {children}
          </div>

          {/* Toaster for notifications */}
          <Toaster />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
