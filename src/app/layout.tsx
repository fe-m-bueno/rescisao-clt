import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { Faq } from '@/components/layout/faq'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title:
    'Calculadora de Rescisão CLT e Salário Líquido 2026 - Calcule seus direitos trabalhistas',
  description:
    'Calcule grátis o valor da sua rescisão CLT e salário líquido. Demissão sem justa causa, pedido de demissão, acordo mútuo, descontos INSS, IRRF e mais. Atualizado com tabelas 2026.',
  keywords: [
    'calculadora rescisão CLT',
    'calculadora salário líquido',
    'cálculo salário líquido CLT',
    'desconto INSS',
    'desconto IRRF',
    'salário líquido CLT',
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
    title: 'Calculadora de Rescisão CLT e Salário Líquido 2026',
    description:
      'A calculadora mais precisa e fácil de usar para calcular seus direitos na rescisão e seu salário líquido.',
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
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
