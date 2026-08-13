# Rescisão CLT — Brazilian Severance Calculator

A web calculator for Brazilian labor severance (*rescisão trabalhista*) and net salary, built with Next.js, TypeScript, and TailwindCSS. It follows the CLT plus the 2017 Labor Reform, with 2026 tax tables. The calculation engine is made of pure, tested functions; the UI is responsive with dark/light mode; and the architecture separates business logic from presentation.

> **Note on terminology:** this project models Brazilian labor law, so its domain terms (CLT, FGTS, INSS, IRRF, *aviso prévio*, *seguro-desemprego*) and all code identifiers are kept in Portuguese. Each term is glossed in English on first use.

## Overview

- Severance calculator supporting 7 termination types
- Net salary calculator with itemized deductions
- Progressive tables for INSS, IRRF (including Law 15.270/2025), and 2026 unemployment insurance
- Real-time calculation, with no submit step
- Responsive, dark/light mode, copy/print results
- A structured FAQ with JSON-LD for SEO

---

## Features

### CLT Severance Calculator

- **Employment information**:
  - Monthly gross salary (R$)
  - Hire date (date picker)
  - Termination date (date picker)
  - Termination type (7 options)
  - Overtime and other supplements
  - Notice period type (*aviso prévio*: worked, paid in lieu, waived)

- **Advanced section (collapsible)**:
  - Accrued unused vacation (*férias vencidas*)
  - Months of accrued vacation
  - FGTS deposited (or estimated automatically)
  - Number of dependents (for the IRRF calculation)

- **Real-time results**:
  - The calculation updates as fields are filled in
  - A summary with the estimated net total
  - A detailed table of entitlements and deductions
  - FGTS information (balance, withdrawal, penalty)
  - Unemployment insurance information (installments, amount)
  - Formatted employment duration (years, months, days)

- **User actions**:
  - Copy the result as text
  - Print the results in an optimized layout
  - Explanatory tooltips on each line item (check with ?)

### Net Salary Calculator

- **Compensation inputs**:
  - Gross salary
  - Number of dependents
  - Transport voucher (*vale transporte*, customizable %)
  - Meal/food voucher
  - Health plan
  - Alimony (% or fixed amount)
  - Private pension
  - Union dues

- **Deduction calculations**:
  - INSS (2026 progressive table)
  - IRRF with Law 15.270/2025 (a reduction for salaries up to R$ 7,350)
  - Deductions per dependent
  - Simplified deduction

- **Output**:
  - Estimated net salary
  - A breakdown of each deduction
  - Effective rates (INSS %, IRRF %, Total %)

### General Capabilities

- **Dark/Light mode**: Light and dark themes, with the preference persisted
- **Fully responsive**: A layout optimized for mobile, tablet, and desktop
- **SEO optimized**: Semantic structure with JSON-LD, meta tags, and a structured FAQ
- **Structured FAQ**: Frequently asked questions with schema.org markup for better indexing
- **Performance**: Real-time calculation, optimized assets, fast loading
- **Accessibility**: Proper HTML semantics, sufficient contrast, keyboard navigation

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.1 | React framework with App Router and RSC |
| **React** | 19.2.4 | UI library with Hooks and useReducer |
| **TypeScript** | 5 | Static typing (strict mode) |
| **TailwindCSS** | 4 | Utility-first CSS framework |
| **shadcn/ui** | 4.1.0 | Pre-styled accessible components |
| **Base UI React** | 1.3.0 | Complementary headless components |
| **Lucide React** | 1.6.0 | SVG icons |
| **next-themes** | 0.4.6 | Dark/light theme management |
| **Biome** | 2.4.9 | Code linting and formatting |
| **Vitest** | 4.1.1 | Unit testing framework |

---

## Project Structure

```
rescisao-clt/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with the theme provider
│   │   ├── page.tsx                # Home page with tabs (severance + salary)
│   │   └── globals.css             # Global styles
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── switch.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── calculator/             # Severance calculator components
│   │   │   ├── form.tsx            # Main form (inputs)
│   │   │   ├── results.tsx         # Results container
│   │   │   ├── summary-card.tsx    # Summary with the net total
│   │   │   ├── breakdown-table.tsx # Table of entitlements and deductions
│   │   │   ├── fgts-info.tsx       # FGTS information
│   │   │   ├── seguro-info.tsx     # Unemployment insurance information
│   │   │   ├── currency-input.tsx  # Custom currency input
│   │   │   ├── tooltip-explainer.tsx # Tooltip with an explanation
│   │   │   ├── salary-form.tsx     # Salary calculator form
│   │   │   └── salary-results.tsx  # Salary calculator results
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── header.tsx          # Page header
│   │   │   ├── footer.tsx          # Footer
│   │   │   └── faq.tsx             # Structured FAQ section
│   │   │
│   │   └── theme-provider.tsx      # NextThemes provider
│   │
│   ├── lib/
│   │   ├── calculations/           # Calculation engine (pure functions)
│   │   │   ├── index.ts            # Orchestrator: calcularRescisao()
│   │   │   ├── saldo-salario.ts    # Salary balance calculation
│   │   │   ├── aviso-previo.ts     # Notice period calculation
│   │   │   ├── decimo-terceiro.ts  # Pro-rata 13th salary calculation
│   │   │   ├── ferias.ts           # Vacation calculation
│   │   │   ├── fgts.ts             # FGTS calculation and estimation
│   │   │   ├── contrato-experiencia.ts # Art. 479/480 CLT indemnity
│   │   │   ├── seguro-desemprego.ts # Unemployment insurance calculation
│   │   │   ├── inss.ts             # INSS calculation (progressive table)
│   │   │   ├── irrf.ts             # IRRF calculation (with Law 15.270/2025)
│   │   │   ├── salario-liquido.ts  # Net salary orchestrator
│   │   │   └── utils.ts            # Utilities: dates, rounding, and so on
│   │   │
│   │   ├── tables/                 # Tax tables
│   │   │   ├── inss-2026.ts        # 2026 INSS progressive brackets
│   │   │   ├── irrf-2026.ts        # 2026 IRRF progressive brackets
│   │   │   └── seguro-desemprego-2026.ts # 2026 unemployment insurance bands
│   │   │
│   │   ├── types.ts                # Core TypeScript types
│   │   ├── salary-types.ts         # Types for the salary calculator
│   │   ├── calculator-reducer.ts   # useReducer for the severance form
│   │   ├── salary-reducer.ts       # useReducer for the salary form
│   │   └── formatter.ts            # Currency and date formatting
│   │
│   └── __tests__/                  # Test suite
│       ├── utils.test.ts           # Helper function tests
│       └── calculations/
│           ├── saldo-salario.test.ts
│           ├── aviso-previo.test.ts
│           ├── decimo-terceiro.test.ts
│           ├── ferias.test.ts
│           ├── fgts.test.ts
│           ├── contrato-experiencia.test.ts
│           ├── inss.test.ts
│           ├── irrf.test.ts
│           ├── seguro-desemprego.test.ts
│           ├── salario-liquido.test.ts
│           └── integration.test.ts (end-to-end flow tests)
│
├── public/                         # Static files
├── package.json
├── tsconfig.json
├── next.config.ts
├── biome.json                      # Linting configuration
├── vitest.config.ts                # Test configuration
├── tailwind.config.js
├── postcss.config.js
├── CLAUDE.md                       # Project specifications
└── README.md                       # This file
```

---

## Calculation Engine

The calculation engine is the heart of the application. Every function is **pure** (no side effects), **tested**, and based on the CLT plus the 2017 Labor Reform.

### Architecture

1. **Specialized functions** (`src/lib/calculations/*.ts`): each entitlement has its own isolated function
2. **Orchestrator** (`calcularRescisao` in `index.ts`): coordinates the flow and applies the rules for each termination type
3. **Tax tables** (`src/lib/tables/*.ts`): INSS, IRRF, and 2026 unemployment insurance
4. **Utilities** (`utils.ts`): date functions, rounding, helper calculations

### Termination Types

The application supports 7 termination types, each with its own rules:

#### 1. Dismissal without cause (*demissão sem justa causa*)
**When:** The employer dismisses the employee without a valid reason.

**Entitlements:**
- ✅ Salary balance
- ✅ Notice period paid in lieu (30 + 3 days/year, capped at 90 days)
- ✅ Pro-rata 13th salary
- ✅ Pro-rata vacation + 1/3
- ✅ Accrued vacation + 1/3 (if any)
- ✅ 40% FGTS penalty
- ✅ FGTS withdrawal (100%)
- ✅ Unemployment insurance

**Deductions:**
- INSS on the salary balance
- IRRF on taxable entitlements

#### 2. Dismissal for cause (*demissão com justa causa*)
**When:** The employee committed serious misconduct (theft, assault, and so on).

**Entitlements:**
- ✅ Salary balance only
- ✅ Accrued vacation + 1/3 (if any)

**Not entitled to:**
- ❌ Notice period
- ❌ Pro-rata 13th salary
- ❌ Pro-rata vacation
- ❌ FGTS penalty
- ❌ FGTS withdrawal
- ❌ Unemployment insurance

#### 3. Resignation (*pedido de demissão*)
**When:** The employee asks to leave.

**Entitlements:**
- ✅ Salary balance
- ✅ Pro-rata 13th salary
- ✅ Pro-rata vacation + 1/3
- ✅ Accrued vacation + 1/3 (if any)

**Not entitled to:**
- ❌ Notice period
- ❌ FGTS penalty
- ❌ FGTS withdrawal
- ❌ Unemployment insurance

**Deduction:**
- 30 days deducted for an unserved notice period (if not paid in lieu)

#### 4. Mutual agreement (*acordo mútuo*)
**When:** Employer and employee reach an agreement (Law 13.467/2017).

**Entitlements:**
- ✅ Salary balance
- ✅ Notice period paid in lieu at 50% (where applicable)
- ✅ Pro-rata 13th salary
- ✅ Pro-rata vacation + 1/3
- ✅ Accrued vacation + 1/3 (if any)
- ✅ 20% FGTS penalty
- ✅ FGTS withdrawal (up to 80%)

**Not entitled to:**
- ❌ Unemployment insurance (Law 13.877/2019 allows it in some cases, but that is not modeled here)

#### 5. End of a probationary contract (*término de contrato de experiência*)
**When:** The probationary period ends without continuation.

**Entitlements:**
- ✅ Salary balance
- ✅ Pro-rata 13th salary
- ✅ Pro-rata vacation + 1/3
- ✅ Accrued vacation + 1/3 (if any)
- ✅ FGTS withdrawal (100%)

**Not entitled to:**
- ❌ Notice period
- ❌ FGTS penalty
- ❌ Unemployment insurance

#### 6. Early termination of probation by the employer
**When:** The employer ends a probationary contract before its term.

**Entitlements:**
- ✅ Salary balance
- ✅ Notice period paid in lieu
- ✅ Pro-rata 13th salary
- ✅ Pro-rata vacation + 1/3
- ✅ Accrued vacation + 1/3 (if any)
- ✅ 40% FGTS penalty
- ✅ FGTS withdrawal (100%)
- ✅ Unemployment insurance
- ✅ Art. 479 CLT indemnity (half the pay for the contract's remaining days)

#### 7. Early termination of probation by the employee
**When:** The employee asks to leave during the probationary period.

**Entitlements:**
- ✅ Salary balance
- ✅ Pro-rata 13th salary
- ✅ Pro-rata vacation + 1/3
- ✅ Accrued vacation + 1/3 (if any)

**Not entitled to:**
- ❌ Notice period
- ❌ FGTS penalty
- ❌ FGTS withdrawal
- ❌ Unemployment insurance

**Deductions:**
- 30 days deducted for the unserved notice period
- Art. 480 CLT indemnity (half the pay for the contract's remaining days)

### Calculation Functions

#### Salary Balance

**Signature:**
```typescript
calcularSaldoSalario(baseRemuneracao: number, dias: number): number
```

**Formula:**
```
saldoSalario = (baseRemuneracao / 30) × dias
```

Computes the salary pro-rated over the days worked in the final month. The CLT treats 30 days as the maximum.

**Parameters:**
- `baseRemuneracao`: gross salary + overtime + supplements
- `dias`: days worked in the final month (max 30)

**Example:**
```
Salary: R$ 3,000
Days worked: 15
Balance = (3000 / 30) × 15 = R$ 1,500
```

---

#### Notice Period (*Aviso Prévio*)

**Signature:**
```typescript
calcularDiasAvisoPrevio(anosCompletos: number): number
calcularValorAvisoPrevio(baseRemuneracao: number, dias: number): number
```

**Formula for days:**
```
diasAviso = min(30 + 3 × anosCompletos, 90)
```

**Formula for the amount:**
```
valorAviso = (baseRemuneracao / 30) × diasAviso
```

The notice period is 30 base days plus 3 days per full year worked, capped at 90 days.

**Special cases:**
- **Mutual agreement**: the notice is 50% of the computed value
- **Dismissal without cause**: 100% of the computed value (paid in lieu)
- **Resignation**: 30 days deducted if not served
- **For cause**: no notice period

**Example:**
```
3 full years
Days = min(30 + 3×3, 90) = 39 days
Salary: R$ 2,000
Amount = (2000 / 30) × 39 = R$ 2,600
```

---

#### Pro-rata 13th Salary

**Signature:**
```typescript
calcularDecimoTerceiro(baseRemuneracao: number, mesesNoAno: number): number
```

**Formula:**
```
decimoTerceiro = (baseRemuneracao / 12) × mesesNoAno
```

A month counts if the employee worked **≥ 15 days** in it (a CLT rule).

**The 15-day rule:**
- January with 20 days = counts as 1 month
- February with 14 days = does not count
- December (the final month) with 1 day = does not count

**Example:**
```
Salary: R$ 1,800
Months in the termination year: 8 (worked ≥ 15 days in each)
13th = (1800 / 12) × 8 = R$ 1,200
```

---

#### Pro-rata Vacation + the Constitutional 1/3

**Signature:**
```typescript
calcularFeriasProporcionais(baseRemuneracao: number, meses: number): number
```

**Formula:**
```
base = (baseRemuneracao / 12) × meses
terco = base / 3
feriasProporcionais = base + terco
```

Computes the pro-rata vacation accrued since the last vesting period, plus the constitutional one-third bonus.

The **vesting period** (*período aquisitivo*) is 12 months. For employees still in their first year, it counts from the hire date.

**Example:**
```
Salary: R$ 2,400
Months since the last vesting period: 6
Base = (2400 / 12) × 6 = R$ 1,200
One-third = 1200 / 3 = R$ 400
Total = R$ 1,200 + R$ 400 = R$ 1,600
```

---

#### Accrued Vacation + 1/3

**Signature:**
```typescript
calcularFeriasVencidas(baseRemuneracao: number, emDobro: boolean): number
```

**Formula:**
```
base = baseRemuneracao
terco = base / 3
total = base + terco
total = emDobro ? total × 2 : total
```

Computes vacation the employee had already accrued but not taken. When it has been outstanding for more than 12 months, the CLT requires **double** payment (Art. 137 CLT).

**Example without doubling:**
```
Salary: R$ 2,500
Accrued vacation (1 period)
Total = (2500 + 2500/3) = R$ 3,333.33
```

**Example with doubling (> 12 months outstanding):**
```
Salary: R$ 2,500
Accrued vacation (2+ periods)
Total = (2500 + 2500/3) × 2 = R$ 6,666.67
```

---

#### FGTS (Estimate and Penalty)

**Signature:**
```typescript
estimarSaldoFgts(baseRemuneracao: number, meses: number): number
calcularMultaFgts(saldoFgts: number, percentual: number): number
```

**Estimation formula:**
```
saldoEstimado = baseRemuneracao × 0.08 × meses
```

If the balance is not provided, it is estimated at 8% of the salary per month worked.

**Penalty formula:**
```
multa = saldoFgts × percentual
```

**Percentages by type:**
- **Dismissal without cause**: 40%
- **Early termination by the employer**: 40%
- **Mutual agreement**: 20%
- **All other cases**: 0%

**Authorized withdrawal:**
- **Dismissal without cause**: 100%
- **Early termination by the employer**: 100%
- **End of a probationary contract**: 100%
- **Mutual agreement**: 80%
- **All other cases**: 0%

**Example:**
```
Salary: R$ 3,000
Months worked: 24
Estimated FGTS = 3000 × 0.08 × 24 = R$ 5,760
Penalty (dismissal without cause) = 5760 × 0.4 = R$ 2,304
Authorized withdrawal = 5760 × 1.0 = R$ 5,760
```

---

#### INSS (2026 Progressive Table)

**Signature:**
```typescript
calcularInss(salario: number): number
```

The INSS contribution is computed by applying progressive rates to each salary bracket. Each portion of the salary within a bracket pays only that bracket's rate.

**2026 table:**
```
Bracket 1: up to R$ 1,621.00           → 7.5%
Bracket 2: R$ 1,621.01 to R$ 2,902.84  → 9%
Bracket 3: R$ 2,902.85 to R$ 4,354.27  → 12%
Bracket 4: R$ 4,354.28 to R$ 8,475.55  → 14%
Ceiling: R$ 8,475.55
```

**Per-bracket calculation:**
```
INSS = (min(salario, teto_f1) - 0) × 0.075
     + (min(salario, teto_f2) - teto_f1) × 0.09
     + (min(salario, teto_f3) - teto_f2) × 0.12
     + (min(salario, teto_f4) - teto_f3) × 0.14
```

**Example (a salary of R$ 3,500):**
```
B1: (1621 - 0) × 0.075 = R$ 121.58
B2: (2902.84 - 1621) × 0.09 = R$ 115.55
B3: (3500 - 2902.84) × 0.12 = R$ 71.57
Total INSS = R$ 308.70
```

---

#### IRRF (2026 Progressive Table with Law 15.270/2025)

**Signature:**
```typescript
calcularIrrf(
  rendimentoTributavel: number,
  dependentes: number,
  salarioBrutoMensal: number
): number
```

IRRF (income tax withheld at source) is computed in 5 steps:

1. **Choose the better deduction:**
   - Deduction per dependent: R$ 189.59 × the number of dependents
   - Simplified deduction: R$ 607.20
   - Use whichever is larger

2. **Compute the base:**
   ```
   base = rendimentoTributavel - melhorDeducao
   ```

3. **Apply the progressive table:**

   **2026 table:**
   ```
   Bracket 1: up to R$ 2,428.80              → 0% (exempt)
   Bracket 2: up to R$ 2,826.65              → 7.5% (less R$ 182.16)
   Bracket 3: up to R$ 3,751.05              → 15% (less R$ 394.16)
   Bracket 4: up to R$ 4,664.68              → 22.5% (less R$ 675.49)
   Bracket 5: above R$ 4,664.68              → 27.5% (less R$ 908.73)
   ```

   ```
   impostoTabela = base × aliquota - deducao
   ```

4. **Apply Law 15.270/2025 (the low-income reduction):**

   If the monthly gross salary is ≤ R$ 5,000:
   ```
   reducao = impostoTabela (100%)
   ```

   If R$ 5,000 < salary ≤ R$ 7,350:
   ```
   reducao = impostoTabela × ((7,350 - salarioBruto) / 2,350)
   ```

   If the salary is > R$ 7,350:
   ```
   reducao = 0
   ```

5. **Final result:**
   ```
   irrf = max(0, impostoTabela - reducao)
   ```

**Example (salary R$ 3,000, 1 dependent, before Law 15.270):**
```
Dependent deduction = 189.59 × 1 = R$ 189.59
Simplified deduction = R$ 607.20
Use the larger = R$ 607.20

Base = 3000 - 607.20 = R$ 2,392.80

Bracket 2 (up to 2,826.65):
IRRF = 2,392.80 × 0.075 - 182.16 = R$ 17.44

With Law 15.270:
Reduction = 17.44 × ((7350 - 3000) / 2350) = R$ 32.44
Final IRRF = max(0, 17.44 - 32.44) = R$ 0 (fully reduced)
```

---

#### Unemployment Insurance (*Seguro Desemprego*)

**Signature:**
```typescript
calcularParcelas(mesesTrabalhados: number): number
calcularValorParcela(mediaSalarios: number): number
```

Unemployment insurance is **informational** in the severance calculator. The installment count and amount are provided for reference.

**Installments by length of service:**
```
< 6 months: 0 installments
6-11 months: 3 installments
12-23 months: 4 installments
24+ months: 5 installments
```

**Amount by salary band (2026):**
```
Band 1: up to R$ 2,222.17         → 80% of the salary (min R$ 1,621.00)
Band 2: up to R$ 3,703.99         → R$ 1,777.74 + 50% of the amount above 2,222.17
Band 3: above R$ 3,703.99         → R$ 2,518.65 (maximum)
```

**Example:**
```
Salary: R$ 2,500
Months worked: 18
Installments: 4
Installment amount: 1,777.74 + (2500 - 2222.17) × 0.5 = R$ 2,116.11
Total insurance: 4 × 2,116.11 = R$ 8,464.45
```

---

#### Net Salary (Secondary Calculator)

**Signature:**
```typescript
calcularSalarioLiquido(input: SalaryInput): SalaryResult
```

Computes the monthly net salary, taking into account:

1. **INSS**: the progressive table (7.5% to 14%)
2. **IRRF**: with Law 15.270/2025
3. **Variable deductions**:
   - Transport voucher (6% or custom)
   - Meal voucher
   - Health plan
   - Alimony
   - Private pension
   - Union dues

**General formula:**
```
salarioLiquido = salarioBruto
               - INSS
               - IRRF
               - valeTransporte
               - valeRefeicao
               - planoSaude
               - pensaoAlimenticia
               - previdenciaPrivada
               - contribuicaoSindical
```

**Input (SalaryInput):**
```typescript
{
  salarioBruto: number
  dependentes: number
  valeTransporte: boolean
  valeTransportePercentual: number (default 6)
  valeRefeicao: number
  planoSaude: number
  pensaoAlimenticia: number
  pensaoAlimenticiaPercentual: boolean
  previdenciaPrivada: number
  contribuicaoSindical: number
}
```

**Output (SalaryResult):**
```typescript
{
  salarioBruto: number
  inss: number
  irrfBase: number
  irrf: number
  valeTransporte: number
  valeRefeicao: number
  planoSaude: number
  pensaoAlimenticia: number
  previdenciaPrivada: number
  contribuicaoSindical: number
  totalDeducoes: number
  salarioLiquido: number
  items: SalaryLineItem[]
  aliquotaEfetiva: { inss: number, irrf: number, total: number }
}
```

---

### Orchestrator (calcularRescisao)

The main function that coordinates the whole severance calculation:

**Signature:**
```typescript
calcularRescisao(input: CalculatorInput): CalculationResult
```

**Input (CalculatorInput):**
```typescript
{
  salarioBruto: number
  dataAdmissao: Date | null
  dataDesligamento: Date | null
  motivoDesligamento: TerminationType | null
  feriasVencidas: boolean
  mesesFeriasVencidas: number
  mediaHorasExtras: number
  outrosAdicionais: number
  fgtsDepositado: number | null
  avisoPrevio: AvisoPrevioType
  dependentes: number
}
```

**Flow logic:**

1. **Validation**: ensures required fields are not null
2. **Compensation base**: sums salary + overtime + supplements
3. **Employment duration**: computes the years, months, and days worked
4. **Notice period**: computes days and amount according to the termination type
5. **Effective date**: projects the end date including the notice (this affects the 13th salary and vacation)
6. **Individual entitlements**: computes each entitlement according to the type's rules
7. **Deductions**: INSS and IRRF over their specific bases
8. **Aggregation**: sums entitlements and deductions

**Output (CalculationResult):**
```typescript
{
  verbas: LineItem[]           // Earnings
  deducoes: LineItem[]          // Deductions
  totalBruto: number            // Sum of the entitlements
  totalDeducoes: number         // Sum of the deductions
  totalLiquido: number          // Gross - deductions
  fgtsInfo: FgtsInfo           // Balance, penalty, withdrawal
  seguroInfo: SeguroDesempregoInfo // Installments and amount
  avisoPrevioDias: number       // Notice period days
  duracaoAnos: number           // Years worked
  duracaoMeses: number          // Additional months
  duracaoDias: number           // Additional days
  motivoDesligamento: TerminationType
}
```

**Special rules by type:**

```typescript
// Entitled to the 13th salary and vacation?
const temDireito13Ferias =
  motivo !== TerminationType.COM_JUSTA_CAUSA

// Entitled to a notice period paid in lieu?
const TIPOS_AVISO_INDENIZADO = {
  SEM_JUSTA_CAUSA,
  ACORDO_MUTUO,
  RESCISAO_ANTECIPADA_EMPREGADOR
}

// Entitled to unemployment insurance?
const TIPOS_SEGURO_DESEMPREGO = {
  SEM_JUSTA_CAUSA,
  RESCISAO_ANTECIPADA_EMPREGADOR
}

// Deduct an unserved notice period?
const TIPOS_DESCONTO_AVISO = {
  PEDIDO_DEMISSAO,
  RESCISAO_ANTECIPADA_EMPREGADO
}

// FGTS penalty
function multaFgtsPercentual(tipo): 0.4 | 0.2 | 0
  SEM_JUSTA_CAUSA → 0.4
  ACORDO_MUTUO → 0.2
  all others → 0

// FGTS withdrawal
function saqueFgtsPercentual(tipo): 1.0 | 0.8 | 0
  SEM_JUSTA_CAUSA → 1.0 (100%)
  ACORDO_MUTUO → 0.8 (80%)
  all others → 0
```

---

### Tables in Force (2026)

#### INSS 2026

```typescript
// src/lib/tables/inss-2026.ts
export const INSS_TETO = 8475.55
export const SALARIO_MINIMO = 1621.0

export const INSS_FAIXAS = [
  { teto: 1621.0,    aliquota: 0.075 },  // 7.5%
  { teto: 2902.84,   aliquota: 0.09  },  // 9%
  { teto: 4354.27,   aliquota: 0.12  },  // 12%
  { teto: 8475.55,   aliquota: 0.14  },  // 14%
]
```

#### IRRF 2026

```typescript
// src/lib/tables/irrf-2026.ts
export const IRRF_FAIXAS = [
  { teto: 2428.8,    aliquota: 0,      deducao: 0      },
  { teto: 2826.65,   aliquota: 0.075,  deducao: 182.16 },
  { teto: 3751.05,   aliquota: 0.15,   deducao: 394.16 },
  { teto: 4664.68,   aliquota: 0.225,  deducao: 675.49 },
  { teto: Infinity,  aliquota: 0.275,  deducao: 896.0  },
]

// Deductions
export const DEDUCAO_POR_DEPENDENTE = 189.59
export const DEDUCAO_SIMPLIFICADA = 607.2

// Law 15.270/2025 - the low-income reduction
export const REDUCAO_LIMITE_INFERIOR = 5000.0
export const REDUCAO_LIMITE_SUPERIOR = 7350.0
export const REDUCAO_FAIXA = 2350.0
```

#### Unemployment Insurance 2026

```typescript
// src/lib/tables/seguro-desemprego-2026.ts
export const SEGURO_FAIXA_1_TETO = 2222.17
export const SEGURO_FAIXA_1_MULT = 0.8

export const SEGURO_FAIXA_2_TETO = 3703.99
export const SEGURO_FAIXA_2_BASE = 2222.17
export const SEGURO_FAIXA_2_FIXA = 1777.74
export const SEGURO_FAIXA_2_MULT = 0.5

export const SEGURO_VALOR_FIXO = 2518.65
export const SEGURO_MINIMO = 1621.0
```

---

## Components

### Component Architecture

The application follows a well-defined component structure, with a clear separation between presentation and logic.

#### Layout Components (`src/components/layout/`)

**header.tsx**
- Shows the application title
- Information about what the tool is
- Useful links (GitHub, contact)

**footer.tsx**
- Footer with legal disclaimers
- Information about when the tax tables were updated
- Legal reference links

**faq.tsx**
- A structured frequently-asked-questions section
- JSON-LD schema for SEO
- Questions about termination types, calculations, and so on

#### Severance Calculator Components (`src/components/calculator/`)

**form.tsx**
- The main form with tabs (basic/advanced)
- Input fields: salary, dates, termination type
- Controls for accrued vacation and the notice period
- Dispatches actions to the reducer

**results.tsx**
- A container that organizes the results
- Renders SummaryCard, BreakdownTable, FgtsInfo, SeguroInfo

**summary-card.tsx**
- A prominent summary with the estimated net total
- A badge for the termination type
- The formatted employment duration

**breakdown-table.tsx**
- A table with every entitlement (earnings)
- A table with every deduction
- Gross, deduction, and net totals
- Explanatory tooltips on each row

**fgts-info.tsx**
- Information about the FGTS balance (estimated or provided)
- The applicable penalty
- The authorized withdrawal percentage and amount

**seguro-info.tsx**
- Information about eligibility for unemployment insurance
- The number of installments
- The estimated amount per installment and in total

**currency-input.tsx**
- A custom input for values in reais
- Automatic formatting with separators
- Parsing of the user's input

**tooltip-explainer.tsx**
- A reusable tooltip component
- A question-mark icon next to the label
- An explanation in plain Portuguese

#### Net Salary Calculator Components (`src/components/calculator/`)

**salary-form.tsx**
- A form for salary data
- Fields for salary, dependents, deductions
- The transport voucher as a % or a fixed amount
- Alimony as a % or a fixed amount

**salary-results.tsx**
- Displays the net salary results
- A card highlighting the gross and net salary
- A detailed deduction table
- Effective rates

#### UI Components (`src/components/ui/`)

Base shadcn/ui components, customized with Tailwind:
- `button.tsx` - Button with variants
- `card.tsx` - Card container
- `input.tsx` - Text input
- `label.tsx` - Label bound to inputs
- `select.tsx` - Select dropdown
- `table.tsx` - Semantic table
- `badge.tsx` - Badge/tag for status
- `tooltip.tsx` - Tooltip built on Radix
- `tabs.tsx` - Tabs (severance / salary)
- `collapsible.tsx` - Collapsible section (advanced)
- `switch.tsx` - Toggle switch
- `separator.tsx` - Divider line

---

## State Management

The application uses React 19's **useReducer** pattern to manage form state predictably.

### Reducer Pattern

Both calculators follow the same pattern:

```typescript
type Action =
  | { type: 'SET_FIELD'; field: keyof InputType; value: unknown }
  | { type: 'RESET' }

function reducer(state: InputType, action: Action): InputType {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return defaultInput
  }
}
```

### Severance Calculator

**State (CalculatorInput):**
```typescript
{
  salarioBruto: 0,
  dataAdmissao: null,
  dataDesligamento: null,
  motivoDesligamento: null,
  feriasVencidas: false,
  mesesFeriasVencidas: 0,
  mediaHorasExtras: 0,
  outrosAdicionais: 0,
  fgtsDepositado: null,
  avisoPrevio: AvisoPrevioType.INDENIZADO,
  dependentes: 0,
}
```

**Reducer:**
```typescript
// src/lib/calculator-reducer.ts
export function calculatorReducer(state, action) {
  // ...
}
```

**Use in a component:**
```tsx
const [input, dispatch] = useReducer(calculatorReducer, defaultInput)

// Setting a field
dispatch({
  type: 'SET_FIELD',
  field: 'salarioBruto',
  value: 3000
})

// Resetting
dispatch({ type: 'RESET' })
```

### Net Salary Calculator

**State (SalaryInput):**
```typescript
{
  salarioBruto: 0,
  dependentes: 0,
  valeTransporte: false,
  valeTransportePercentual: 6,
  valeRefeicao: 0,
  planoSaude: 0,
  pensaoAlimenticia: 0,
  pensaoAlimenticiaPercentual: false,
  previdenciaPrivada: 0,
  contribuicaoSindical: 0,
}
```

**Reducer:**
```typescript
// src/lib/salary-reducer.ts
export function salaryReducer(state, action) {
  // ...
}
```

### Real-Time Calculation

Both use `useMemo` to recompute only when the state changes:

```tsx
const result = useMemo(() => {
  if (!isValid(input)) return null
  return calcularRescisao(input)
}, [input])
```

This keeps performance good even with complex calculations.

---

## Tests

The test suite covers the calculation engine completely. Every calculation is a pure function, which makes testing straightforward.

### Test Structure

```
src/__tests__/
├── utils.test.ts                    # Helper function tests
└── calculations/
    ├── saldo-salario.test.ts        # Salary balance tests
    ├── aviso-previo.test.ts         # Notice period tests
    ├── decimo-terceiro.test.ts      # 13th salary tests
    ├── ferias.test.ts               # Vacation tests
    ├── fgts.test.ts                 # FGTS tests
    ├── inss.test.ts                 # INSS tests
    ├── irrf.test.ts                 # IRRF tests
    ├── seguro-desemprego.test.ts    # Unemployment insurance tests
    ├── salario-liquido.test.ts      # Net salary tests
    └── integration.test.ts          # End-to-end tests
```

### Running the Tests

```bash
# Run every test once
npm run test

# Run in watch mode (development)
npm run test:watch
```

### Test Coverage

**Helper functions (utils.test.ts):**
- `roundCurrency` - Currency rounding
- `calcularDiasNoMes` - Days in the final month
- `calcularMesesTrabalhados` - Months worked (the 15-day rule)
- `calcularAnosCompletos` - Full years
- `calcularDuracaoEmprego` - Formatted duration
- `calcularMesesNoAnoParaDecimoTerceiro` - Months in the year
- `calcularMesesPeriodoAquisitivo` - Months since the last vesting period

**Example scenarios:**
- Fewer than 15 days = 0 months
- Exactly 15 days = 1 month
- The counterexample: fewer than 15 days do not count
- Multiple years
- Spanning a year boundary
- Same month/year

### Test Pattern

```typescript
describe('calcularSaldoSalario', () => {
  it('calcula proporção correta', () => {
    const resultado = calcularSaldoSalario(3000, 15)
    expect(resultado).toBe(1500)
  })

  it('retorna 0 para dias inválidos', () => {
    expect(calcularSaldoSalario(3000, 0)).toBe(0)
    expect(calcularSaldoSalario(3000, -1)).toBe(0)
  })
})
```

### Integration Tests

`integration.test.ts` exercises complete flows:
- Dismissal without cause with 3 years of service
- Mutual agreement
- Resignation
- Probationary contract
- Edge cases (under 1 month, 30+ years, and so on)

---

## Development

### Prerequisites

- **Node.js**: 18+ (20+ recommended)
- **npm**: 9+
- **Git**: for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rescisao-clt.git
cd rescisao-clt

# Install the dependencies
npm install

# Verify the installation
npm run test
```

### Available Scripts

```bash
# Development
npm run dev                 # Starts the local server (http://localhost:3000)
npm run build              # Production build
npm run start              # Starts the production server

# Linting and formatting
npm run lint               # Checks the code with Biome
npm run lint:fix           # Fixes issues automatically

# Tests
npm run test               # Runs the tests once
npm run test:watch         # Watch mode for development
```

### Folder Structure for Development

```
src/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── ui/                # Base components (shadcn)
│   ├── calculator/        # Calculator components
│   └── layout/            # Shared layout
├── lib/                    # Business logic
│   ├── calculations/      # Calculation engine
│   ├── tables/            # Tax tables
│   └── types.ts          # TypeScript types
└── __tests__/             # Tests
```

### Code Conventions

**Imports:**
```typescript
// Use absolute paths with the @ alias
import { calcularRescisao } from '@/lib/calculations'
import { Card } from '@/components/ui/card'
```

**Pure functions:**
```typescript
// No side effects
export function calcularSaldo(salario: number, dias: number): number {
  return roundCurrency((salario / 30) * dias)
}
```

**Types first:**
```typescript
// Always use an interface for objects
export interface CalculatorInput {
  salarioBruto: number
  // ...
}
```

**Server-first components:**
```typescript
// Use RSC where possible, and 'use client' only when necessary
'use client'
import { useState } from 'react'
```

### Good Practices

1. **Tests**: Always test calculation functions
2. **Types**: Never use `any`; keep strict mode on
3. **Linting**: Run `npm run lint:fix` before committing
4. **Documentation**: Comment complex functions
5. **Performance**: Use `useMemo` for expensive calculations

### Adding a New Calculation Function

1. Create a file at `src/lib/calculations/nova-funcao.ts`
2. Implement a pure function with JSDoc
3. Create tests at `src/__tests__/calculations/nova-funcao.test.ts`
4. Import and use it in the orchestrator (`index.ts`)
5. Run the tests: `npm run test`

**Example:**
```typescript
// src/lib/calculations/nova-funcao.ts
import { roundCurrency } from './utils'

/**
 * Calcula algo importante.
 * Fórmula: X = A × B / C
 */
export function calcularAlgo(a: number, b: number): number {
  if (a <= 0 || b <= 0) return 0
  return roundCurrency((a * b) / 30)
}
```

```typescript
// src/__tests__/calculations/nova-funcao.test.ts
import { describe, expect, it } from 'vitest'
import { calcularAlgo } from '@/lib/calculations/nova-funcao'

describe('calcularAlgo', () => {
  it('calcula corretamente', () => {
    expect(calcularAlgo(600, 15)).toBe(300)
  })
})
```

### Linting and Formatting

The project uses **Biome** for linting and formatting:

```bash
# Check the code
npm run lint

# Fix automatically
npm run lint:fix
```

**Configuration (biome.json):**
- Spaces: 2
- Quotes: single
- Semicolons: optional
- Organize imports automatically
- Recommended rules enabled

---

## Deployment

The application is hosted on **Vercel**, linked to the Git repository.

### Automatic Deployment

Any push to the `main` branch triggers an automatic deployment:

1. **Build**: `npm run build`
2. **Tests**: run automatically
3. **Deploy**: Vercel publishes to production
4. **URL**: [rescisao-clt.vercel.app](https://rescisao-clt.vercel.app)

### Environment Variables

No environment variables are needed at the moment. Everything is static code.

### Testing the Build Locally

```bash
# Simulate a production build
npm run build

# Serve locally
npm run start
```

### Monitoring

Vercel provides:
- Performance analytics
- Error logs
- Traffic metrics

Monitor it at [vercel.com/dashboard](https://vercel.com/dashboard)

---

## Legal Considerations

### Disclaimer

This calculator is an **estimation tool** and does not replace professional legal advice.

**Important:**
- The values are approximate and may vary depending on:
  - Collective bargaining agreements for the job category
  - Specific supplements (hazard pay, unhealthy-conditions pay)
  - The worker's individual situation
  - Internal company agreements

- The INSS and IRRF tables are based on the values in force in **2026**

- The legislation applied is:
  - The Consolidation of Labor Laws (CLT)
  - The Labor Reform (Law 13.467/2017)
  - Law 15.270/2025 (the IRRF reduction)

- **Tables last updated: 2026-03-25**

### Recommendation

For severances involving large amounts or complex situations, **always consult a labor lawyer**.

---

## Legal References

- [CLT - Consolidation of Labor Laws](http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm)
- [Labor Reform - Law 13.467/2017](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm)
- [Law 13.877/2019 - Unemployment Insurance](http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/L13877.htm)
- [Law 15.270/2025 - IRRF Reduction](http://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm)
- [INSS - 2026 Tables](https://www.gov.br/inss)
- [Receita Federal - IRRF](https://www.gov.br/receitafederal)

---

## License

This project is licensed under the MIT License.

---

## Contributing

Contributions are welcome.

**To contribute:**
1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add MyFeature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

**Code must pass:**
- `npm run lint:fix` (Biome)
- `npm run test` (all tests passing)

---

## Support

Problems or questions?

- Open an [issue on GitHub](https://github.com/your-username/rescisao-clt/issues)
- Check the [FAQ](/) in the application

---

## Changelog

### v0.1.0 (2025-03-25)
- Initial release
- Severance calculator with 7 termination types
- Net salary calculator
- 2026 INSS, IRRF, and unemployment insurance tables
- Law 15.270/2025 integrated
- Complete tests
- Dark/Light mode
- Responsive
- SEO optimized

---

## Roadmap

- [ ] Integration with CAGED data (employment history)
- [ ] Export results as PDF
- [ ] Multi-currency support
- [ ] A REST API for integration
- [ ] A native mobile app
- [ ] Calculation history (localStorage)
- [ ] Scenario comparison ("what if...?")

---

**Built with ❤️ for Brazil's CLT workers.**
