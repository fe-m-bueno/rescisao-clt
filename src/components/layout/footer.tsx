import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="no-print mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <p>
            Esta calculadora é uma ferramenta de estimativa e não substitui
            orientação jurídica profissional.
          </p>
          <p>
            Os valores são aproximados e podem variar conforme convenção
            coletiva, adicionais, e situação específica.
          </p>
          <Separator className="my-1" />
          <p>Tabelas de INSS e IRRF baseadas nos valores vigentes em 2026.</p>
          <p className="font-medium">
            Última atualização das tabelas: Janeiro 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
