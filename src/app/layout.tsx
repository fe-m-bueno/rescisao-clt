import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Faq } from '@/components/layout/faq'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title:
    'Calculadora de Rescisão CLT 2026 - Calcule seus direitos trabalhistas',
  description:
    'Calcule grátis o valor da sua rescisão CLT. Demissão sem justa causa, pedido de demissão, acordo mútuo e mais. Atualizado com tabelas INSS e IRRF 2026.',
  keywords: [
    'calculadora rescisão CLT',
    'rescisão trabalhista',
    'demissão sem justa causa',
    'direitos trabalhistas',
    'FGTS',
    'seguro desemprego',
    '13º salário',
    'aviso prévio',
    'férias proporcionais',
  ],
  openGraph: {
    title: 'Calculadora de Rescisão CLT 2026',
    description:
      'A calculadora mais precisa e fácil de usar para calcular seus direitos na rescisão do contrato de trabalho.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Header />
            {children}
            <Faq />
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
