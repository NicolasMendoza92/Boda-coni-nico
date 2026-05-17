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
  metadataBase: new URL('https://boda-coni-nico.vercel.app'), // ← añadir
  title: 'Coni & Nico - Nuestra Boda',
  description: 'Te invitamos a celebrar nuestro amor en Tucumán, Argentina.',
  // generator: 'v0.app',  ← borrar esta línea
  icons: {
    icon: '/favicon.svg'
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
