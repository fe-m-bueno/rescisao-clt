# Rescisão CLT

Build a complete, polished CLT severance calculator web app called **Rescisão CLT**. The most accurate and user-friendly tool for Brazilian workers to calculate exactly what they're owed when leaving a job. Every Brazilian needs this at least once in their life, and every existing tool online is either ugly, inaccurate, or full of ads.

## The Product

A single-page web app. The user fills in their employment details, picks the type of termination, and instantly sees a full breakdown of everything they're owed — with explanations for each line item. No login, no ads, no bullshit.

## Tech Stack

- **Framework:** Next.js 15 (App Router, RSC)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS v4 + shadcn/ui
- **State:** React 19 (useState/useReducer, no external state lib needed)
- **Calculations:** Pure TypeScript functions, fully tested
- **Deployment:** Vercel
- **Linting:** Biome
- **Testing:** Vitest for the calculation engine

## Input Fields

### Employment Info
- **Salário bruto mensal** (R$) — gross monthly salary
- **Data de admissão** — hire date (date picker)
- **Data de desligamento** — termination date (date picker)
- **Motivo do desligamento** — termination type (select):
  - Demissão sem justa causa (fired without cause)
  - Demissão com justa causa (fired with cause)
  - Pedido de demissão (voluntary resignation)
  - Acordo mútuo (mutual agreement — post-2017 reform)
  - Término de contrato de experiência (end of trial period)
  - Rescisão antecipada de contrato de experiência pelo empregador
  - Rescisão antecipada de contrato de experiência pelo empregado

### Optional / Advanced (collapsible section)
- **Férias vencidas?** (boolean) — has a full vacation period that was never taken?
- **Meses de férias vencidas** — how many months of untaken vacation (if applicable)
- **Média de horas extras mensais** (R$) — average monthly overtime pay (factors into calculations)
- **Outros adicionais habituais** (R$) — other recurring bonuses (insalubridade, periculosidade, comissões)
- **FGTS depositado** (R$) — total FGTS balance (for 40%/20% fine calculation). If blank, estimate from salary × 8% × months.
- **Aviso prévio** — notice period type:
  - Trabalhado (worked)
  - Indenizado (paid in lieu)
  - Dispensado (waived by employer)

## Calculation Engine

All calculations must follow current Brazilian labor law (CLT + Reforma Trabalhista 2017). Each function is pure, tested, and documented.

### What to Calculate (by termination type)

#### Demissão sem justa causa
- Saldo de salário (remaining salary days in final month)
- Aviso prévio indenizado (30 days + 3 days per year worked, max 90 days)
- 13º salário proporcional (proportional 13th salary)
- Férias proporcionais + 1/3 constitucional
- Férias vencidas + 1/3 (if applicable)
- Multa de 40% do FGTS
- Saque do FGTS (entitled)
- Seguro desemprego (entitled — show number of installments based on time worked)

#### Demissão com justa causa
- Saldo de salário only
- Férias vencidas + 1/3 (if applicable, only vencidas)
- 13º proporcional: NOT entitled
- FGTS: NOT entitled to withdraw or receive fine
- Seguro desemprego: NOT entitled

#### Pedido de demissão
- Saldo de salário
- 13º salário proporcional
- Férias proporcionais + 1/3
- Férias vencidas + 1/3 (if applicable)
- NO multa FGTS
- NO saque FGTS
- NO seguro desemprego
- Employee must give 30 days notice (or employer discounts it)

#### Acordo mútuo (Art. 484-A CLT — Reforma 2017)
- Saldo de salário
- 13º proporcional
- Férias proporcionais + 1/3
- Férias vencidas + 1/3
- Aviso prévio: 50% (if indenizado)
- Multa FGTS: 20% (instead of 40%)
- Saque FGTS: up to 80% of balance
- NO seguro desemprego

### Calculation Details

**Saldo de salário:**
`(salário / 30) × dias trabalhados no último mês`

**Aviso prévio indenizado:**
`30 + (3 × anos completos trabalhados)` days, capped at 90 days total.
Value: `(salário / 30) × dias de aviso`
The projected aviso prévio period counts for 13th and vacation calculations.

**13º proporcional:**
`(salário / 12) × meses trabalhados no ano` (month counts if worked ≥ 15 days in that month)

**Férias proporcionais + 1/3:**
`(salário / 12) × meses desde último período aquisitivo` + 1/3 of that value

**Férias vencidas + 1/3:**
`salário + (salário / 3)` per vencida period. If over 12 months past due, doubles (Art. 137 CLT).

**FGTS balance estimate (if not provided):**
`salário × 0.08 × meses trabalhados` (simplified, doesn't account for raises)

**Multa FGTS:**
`saldo FGTS × 0.40` (sem justa causa) or `× 0.20` (acordo mútuo)

**Seguro desemprego (informational):**
- 6-11 months worked: 3 installments
- 12-23 months: 4 installments
- 24+ months: 5 installments
- Value: based on average of last 3 salaries, with government table bands (show current bands or link to official table)

### Deductions to Show
- INSS sobre saldo de salário (use current INSS progressive table)
- IRRF sobre verbas tributáveis (use current IR table)
- Aviso prévio não cumprido (if employee resigns without notice)

## Output / Results

Show a clean, detailed breakdown:

### Summary Card (top)
- **Total líquido estimado: R$ XX.XXX,XX** (big, prominent)
- Termination type badge
- Employment duration (X anos, Y meses, Z dias)

### Detailed Breakdown (table)
| Verba | Valor |
|-------|-------|
| Saldo de salário (X dias) | R$ X.XXX,XX |
| Aviso prévio indenizado (X dias) | R$ X.XXX,XX |
| 13º proporcional (X/12) | R$ X.XXX,XX |
| Férias proporcionais + 1/3 | R$ X.XXX,XX |
| Multa 40% FGTS | R$ X.XXX,XX |
| **Subtotal bruto** | **R$ XX.XXX,XX** |
| (-) INSS | - R$ X.XXX,XX |
| (-) IRRF | - R$ X.XXX,XX |
| **Total líquido** | **R$ XX.XXX,XX** |

### Additional Info Section
- FGTS: can/cannot withdraw (amount if applicable)
- Seguro desemprego: entitled/not entitled (number of installments + estimated value)
- Aviso prévio: X days (explain the 3 days/year rule)
- Prazo para pagamento: employer has up to 10 calendar days to pay (Art. 477 CLT)

### Each Line Item Has a (?) Tooltip
Explaining what it is and how it was calculated, in simple Portuguese. Not legalese. Example: "O 13º proporcional é calculado dividindo seu salário por 12 e multiplicando pelos meses trabalhados no ano. Um mês conta se você trabalhou pelo menos 15 dias nele."

## UI / UX

### Layout
- Clean single page, no navigation needed
- Form on the left (or top on mobile), results on the right (or below on mobile)
- Results update in real-time as the user fills fields (no submit button)
- Results section is hidden until minimum required fields are filled (salary + dates + termination type)

### Design
- Professional but approachable — not a government site aesthetic
- Dark mode default, light mode toggle
- Currency inputs with R$ prefix and thousand separators (format as you type)
- Date inputs with Brazilian format (DD/MM/YYYY)
- Mobile-first responsive design

### Extras
- Share/copy results as text (for sending to lawyer or HR)
- Print-friendly version
- SEO optimized (this should rank for "calculadora rescisão CLT")
- Add structured FAQ at the bottom (helps SEO + genuinely useful)

## Testing

The calculation engine must be **thoroughly tested**. This is financial software people will trust.

- Unit test every calculation function
- Test each termination type end-to-end
- Test edge cases:
  - Less than 1 month worked
  - Exactly 1 year (vacation vencida threshold)
  - 30+ years worked (aviso prévio cap at 90 days)
  - Hired and fired in same month
  - Trial period contracts
  - Minimum wage salary
  - Very high salary (INSS ceiling behavior)

## Important Legal Notes (show as disclaimer)

- "Esta calculadora é uma ferramenta de estimativa e não substitui orientação jurídica profissional."
- "Os valores são aproximados e podem variar conforme convenção coletiva, adicionais, e situação específica."
- "Tabelas de INSS e IRRF baseadas nos valores vigentes em 2025."
- Show last update date of tax tables prominently

## File Structure

```
rescisao-clt/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── calculator/
│   │   │   ├── form.tsx
│   │   │   ├── results.tsx
│   │   │   ├── summary-card.tsx
│   │   │   ├── breakdown-table.tsx
│   │   │   ├── fgts-info.tsx
│   │   │   ├── seguro-info.tsx
│   │   │   └── tooltip-explainer.tsx
│   │   └── layout/
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       └── faq.tsx
│   ├── lib/
│   │   ├── calculations/
│   │   │   ├── index.ts
│   │   │   ├── saldo-salario.ts
│   │   │   ├── aviso-previo.ts
│   │   │   ├── decimo-terceiro.ts
│   │   │   ├── ferias.ts
│   │   │   ├── fgts.ts
│   │   │   ├── seguro-desemprego.ts
│   │   │   ├── inss.ts
│   │   │   ├── irrf.ts
│   │   │   └── utils.ts
│   │   ├── tables/
│   │   │   ├── inss-2025.ts
│   │   │   └── irrf-2025.ts
│   │   └── types.ts
│   └── __tests__/
│       ├── calculations/
│       │   ├── saldo-salario.test.ts
│       │   ├── aviso-previo.test.ts
│       │   ├── decimo-terceiro.test.ts
│       │   ├── ferias.test.ts
│       │   ├── fgts.test.ts
│       │   ├── inss.test.ts
│       │   ├── irrf.test.ts
│       │   └── integration.test.ts
│       └── utils.test.ts
├── package.json
├── tsconfig.json
├── next.config.ts
├── biome.json
├── vitest.config.ts
└── CLAUDE.md
```
