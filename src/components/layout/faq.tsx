const FAQ_ITEMS = [
  {
    question: 'O que é rescisão CLT?',
    answer:
      'Rescisão é o encerramento do contrato de trabalho regido pela CLT. Dependendo do motivo, o trabalhador tem direito a diferentes verbas rescisórias como saldo de salário, aviso prévio, 13º proporcional, férias proporcionais e multa do FGTS.',
  },
  {
    question: 'Quais são meus direitos na demissão sem justa causa?',
    answer:
      'Você tem direito a: saldo de salário, aviso prévio (30 dias + 3 dias por ano trabalhado), 13º proporcional, férias proporcionais + 1/3, multa de 40% do FGTS, saque do FGTS e seguro desemprego.',
  },
  {
    question: 'Como funciona o aviso prévio?',
    answer:
      'O aviso prévio mínimo é de 30 dias, acrescido de 3 dias para cada ano completo trabalhado, até o máximo de 90 dias. Pode ser trabalhado, indenizado (pago sem trabalhar) ou dispensado pelo empregador.',
  },
  {
    question: 'O que é o acordo mútuo (Art. 484-A CLT)?',
    answer:
      'Criado pela Reforma Trabalhista de 2017, permite que empregado e empregador encerrem o contrato em comum acordo. O trabalhador recebe metade do aviso prévio indenizado, multa de 20% do FGTS (em vez de 40%), pode sacar até 80% do FGTS, mas não tem direito ao seguro desemprego.',
  },
  {
    question: 'Quanto recebo de seguro desemprego?',
    answer:
      'O valor é calculado com base na média dos últimos 3 salários. Em 2026: até R$ 2.222,17 recebe 80% da média; entre R$ 2.222,18 e R$ 3.703,99 usa fórmula mista; acima recebe o teto de R$ 2.518,65. O mínimo é R$ 1.621,00 (salário mínimo).',
  },
  {
    question: 'Como é calculado o 13º proporcional?',
    answer:
      'O 13º proporcional é calculado dividindo seu salário por 12 e multiplicando pelos meses trabalhados no ano. Um mês conta se você trabalhou pelo menos 15 dias nele.',
  },
  {
    question: 'O que são férias vencidas?',
    answer:
      'Férias vencidas são aquelas que o empregador deveria ter concedido mas não concedeu. O empregado tem direito a recebê-las com acréscimo de 1/3. Se passaram mais de 12 meses do período concessivo, o valor é pago em dobro (Art. 137 CLT).',
  },
  {
    question: 'Qual o prazo para o empregador pagar a rescisão?',
    answer:
      'O empregador tem até 10 dias corridos após o término do contrato para efetuar o pagamento das verbas rescisórias (Art. 477 CLT).',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export function Faq() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, safe static content
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h2 className="mb-6 text-2xl font-bold tracking-tight">
        Perguntas frequentes
      </h2>

      <div className="flex flex-col divide-y divide-border rounded-lg border">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group px-5 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
