import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner';

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Coni & Nico - Nuestra Boda',
  description: 'Te invitamos a celebrar nuestro amor en Tucumán, Argentina.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg'
    // icon: [
    //   {
    //     url: '/icon-light-32x32.png',
    //     media: '(prefers-color-scheme: light)',
    //   },
    //   {
    //     url: '/icon-dark-32x32.png',
    //     media: '(prefers-color-scheme: dark)',
    //   },
    //   {
    //     url: '/icon.svg',
    //     type: 'image/svg+xml',
    //   },
    // ],
    // apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${lato.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />

      </body>
    </html>
  )
}
