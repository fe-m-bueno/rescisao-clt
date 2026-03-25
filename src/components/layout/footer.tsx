export function Footer() {
  return (
    <footer className="no-print mt-auto border-t border-primary/10">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <span className="inline-block size-1 shrink-0 rounded-full bg-primary" />
            Esta calculadora é uma ferramenta de estimativa e não substitui
            orientação jurídica profissional.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block size-1 shrink-0 rounded-full bg-primary" />
            Os valores são aproximados e podem variar conforme convenção
            coletiva, adicionais, e situação específica.
          </p>
          <div className="mt-2 border-t border-border/50 pt-3">
            <p>Tabelas de INSS e IRRF baseadas nos valores vigentes em 2026.</p>
            <p className="mt-1 font-heading font-semibold text-foreground/80">
              Última atualização das tabelas: Janeiro 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
