import type { Metadata } from 'next'
// ✅ SUBSTITUÍDO: De Geist para Inter, compatível com Next 13
import { Inter } from 'next/font/google' 
import './globals.css'

// ⚠️ Usando Inter, que é estável no Next.js v13
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Novo nome da variável
});

// A seção metadata permanece a mesma
export const metadata: Metadata = {
  title: 'Pequeno Prato - Receitas para Crianças',
  description: 'Aprenda receitas saudáveis e ganhe pontos jogando',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // ⬇️ CORREÇÃO AQUI: Aplicação da classe da nova fonte (inter)
    <html lang="pt-BR" className={`${inter.variable}`}>
      {/* O nome da classe do Tailwind deve ser 'font-inter' ou o nome da sua fonte, 
          garantindo que o CSS da fonte padrão esteja correto. */}
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}