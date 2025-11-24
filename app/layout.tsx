import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
// A importação do CSS usa o caminho relativo padrão
import './globals.css'

// ⚠️ Usando apenas Geist para a fonte padrão. Geist_Mono não precisa ser importada se não for usada.
const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans', // Define o nome da variável CSS
});
// const geistMono = Geist_Mono({ subsets: ["latin"] }); // Removida se não for usada

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
      // 
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
    // ⬇️ CORREÇÃO AQUI: Aplicação da classe da fonte ao body
    <html lang="pt-BR" className={`${geistSans.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}