# Rescisão CLT — Calculadora de Rescisão Trabalhista

Calculadora web de rescisão trabalhista e salário líquido, construída com Next.js, TypeScript e TailwindCSS. Segue a legislação CLT + Reforma Trabalhista 2017, com tabelas fiscais de 2026. Motor de cálculos com funções puras e testadas, UI responsiva com dark/light mode, e arquitetura separando lógica de negócio da apresentação.

## Visão Geral

- Calculadora de rescisão com suporte a 7 tipos de desligamento
- Calculadora de salário líquido com deduções detalhadas
- Tabelas progressivas de INSS, IRRF (com Lei 15.270/2025) e Seguro Desemprego 2026
- Cálculos em tempo real, sem submit
- Responsivo, dark/light mode, copiar/imprimir resultados
- FAQ estruturada com JSON-LD para SEO

---

## Funcionalidades

### Calculadora de Rescisão CLT

- **Informações de Emprego**:
  - Salário bruto mensal (R$)
  - Data de admissão (seletor de data)
  - Data de desligamento (seletor de data)
  - Tipo de desligamento (7 opções)
  - Horas extras e outros adicionais
  - Tipo de aviso prévio (trabalhado, indenizado, dispensado)

- **Seção Avançada (retrátil)**:
  - Férias vencidas não gozadas
  - Meses de férias vencidas
  - FGTS depositado (ou estimado automaticamente)
  - Número de dependentes (para cálculo de IRRF)

- **Resultados em Tempo Real**:
  - Cálculo atualizado à medida que os campos são preenchidos
  - Resumo com total líquido estimado
  - Tabela detalhada de verbas e deduções
  - Informações sobre FGTS (saldo, retirada, multa)
  - Informações sobre Seguro Desemprego (parcelas, valor)
  - Duração do emprego formatada (anos, meses, dias)

- **Ações do Usuário**:
  - Copiar resultado como texto
  - Imprimir resultados em formato otimizado
  - Tooltips explicativos em cada linha item (confira com ?)

### Calculadora de Salário Líquido

- **Entradas de Remuneração**:
  - Salário bruto
  - Número de dependentes
  - Vale transporte (% customizável)
  - Vale refeição/alimentação
  - Plano de saúde
  - Pensão alimentícia (% ou valor fixo)
  - Previdência privada
  - Contribuição sindical

- **Cálculos de Deduções**:
  - INSS (tabela progressiva 2026)
  - IRRF com Lei 15.270/2025 (redução para salários até R$ 7.350)
  - Deduções por dependente
  - Deduções simples

- **Saída**:
  - Salário líquido estimado
  - Detalhamento de cada dedução
  - Alíquotas efetivas (INSS %, IRRF %, Total %)

### Recursos Gerais

- **Dark/Light Mode**: Tema claro e escuro, com persistência de preferência
- **Responsividade Completa**: Layout otimizado para mobile, tablet e desktop
- **SEO Otimizado**: Estrutura semântica com JSON-LD, meta tags e FAQ estruturada
- **FAQ Estruturada**: Perguntas frequentes com schema.org para melhor indexação
- **Performance**: Cálculos em tempo real, assets otimizados, carregamento rápido
- **Acessibilidade**: Semântica HTML adequada, contraste suficiente, navegação por teclado

---

## Stack Tecnológica

| Tecnologia | Versão | Propósito |
|---|---|---|
| **Next.js** | 16.2.1 | Framework React com App Router e RSC |
| **React** | 19.2.4 | Biblioteca UI com Hooks e useReducer |
| **TypeScript** | 5 | Tipagem estática (strict mode) |
| **TailwindCSS** | 4 | Utility-first CSS framework |
| **shadcn/ui** | 4.1.0 | Componentes acessíveis pré-estilizados |
| **Base UI React** | 1.3.0 | Componentes headless complementares |
| **Lucide React** | 1.6.0 | Ícones SVG |
| **next-themes** | 0.4.6 | Gerenciamento de tema dark/light |
| **Biome** | 2.4.9 | Linting e formatação de código |
| **Vitest** | 4.1.1 | Framework de testes unitários |

---

## Estrutura do Projeto

```
rescisao-clt/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout raiz com provider de tema
│   │   ├── page.tsx                # Página inicial com abas (rescisão + salário)
│   │   └── globals.css             # Estilos globais
│   │
│   ├── components/
│   │   ├── ui/                     # Componentes shadcn/ui
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
│   │   ├── calculator/             # Componentes da calculadora de rescisão
│   │   │   ├── form.tsx            # Formulário principal (entradas)
│   │   │   ├── results.tsx         # Container de resultados
│   │   │   ├── summary-card.tsx    # Resumo com total líquido
│   │   │   ├── breakdown-table.tsx # Tabela de verbas e deduções
│   │   │   ├── fgts-info.tsx       # Informações sobre FGTS
│   │   │   ├── seguro-info.tsx     # Informações sobre Seguro Desemprego
│   │   │   ├── currency-input.tsx  # Input customizado para moeda
│   │   │   ├── tooltip-explainer.tsx # Tooltip com explicação
│   │   │   ├── salary-form.tsx     # Formulário da calculadora de salário
│   │   │   └── salary-results.tsx  # Resultados da calculadora de salário
│   │   │
│   │   ├── layout/                 # Componentes de layout
│   │   │   ├── header.tsx          # Cabeçalho da página
│   │   │   ├── footer.tsx          # Rodapé
│   │   │   └── faq.tsx             # Seção de FAQ estruturada
│   │   │
│   │   └── theme-provider.tsx      # Provider NextThemes
│   │
│   ├── lib/
│   │   ├── calculations/           # Motor de cálculos (funções puras)
│   │   │   ├── index.ts            # Orquestrador: calcularRescisao()
│   │   │   ├── saldo-salario.ts    # Cálculo de saldo de salário
│   │   │   ├── aviso-previo.ts     # Cálculo de aviso prévio
│   │   │   ├── decimo-terceiro.ts  # Cálculo de 13º proporcional
│   │   │   ├── ferias.ts           # Cálculo de férias
│   │   │   ├── fgts.ts             # Cálculo e estimativa de FGTS
│   │   │   ├── seguro-desemprego.ts # Cálculo de seguro-desemprego
│   │   │   ├── inss.ts             # Cálculo de INSS (tabela progressiva)
│   │   │   ├── irrf.ts             # Cálculo de IRRF (com Lei 15.270/2025)
│   │   │   ├── salario-liquido.ts  # Orquestrador de salário líquido
│   │   │   └── utils.ts            # Utilitários: datas, arredondamento, etc.
│   │   │
│   │   ├── tables/                 # Tabelas fiscais
│   │   │   ├── inss-2026.ts        # Faixas progressivas INSS 2026
│   │   │   ├── irrf-2026.ts        # Faixas progressivas IRRF 2026
│   │   │   └── seguro-desemprego-2026.ts # Bandas seguro-desemprego 2026
│   │   │
│   │   ├── types.ts                # Tipos TypeScript principais
│   │   ├── salary-types.ts         # Tipos para calculadora de salário
│   │   ├── calculator-reducer.ts   # useReducer para formulário de rescisão
│   │   ├── salary-reducer.ts       # useReducer para formulário de salário
│   │   └── formatter.ts            # Formatação de moeda e datas
│   │
│   └── __tests__/                  # Suite de testes
│       ├── utils.test.ts           # Testes de funções auxiliares
│       └── calculations/
│           ├── saldo-salario.test.ts
│           ├── aviso-previo.test.ts
│           ├── decimo-terceiro.test.ts
│           ├── ferias.test.ts
│           ├── fgts.test.ts
│           ├── inss.test.ts
│           ├── irrf.test.ts
│           ├── seguro-desemprego.test.ts
│           ├── salario-liquido.test.ts
│           └── integration.test.ts (testes de fluxo completo)
│
├── public/                         # Arquivos estáticos
├── package.json
├── tsconfig.json
├── next.config.ts
├── biome.json                      # Configuração de linting
├── vitest.config.ts                # Configuração de testes
├── tailwind.config.js
├── postcss.config.js
├── CLAUDE.md                       # Especificações do projeto
└── README.md                       # Este arquivo
```

---

## Motor de Cálculos

O motor de cálculos é o coração da aplicação. Todas as funções são **puras** (sem efeitos colaterais), **testadas**, e baseadas na legislação CLT + Reforma Trabalhista 2017.

### Arquitetura

1. **Funções Especializadas** (`src/lib/calculations/*.ts`): Cada verba tem sua função isolada
2. **Orquestrador** (`calcularRescisao` em `index.ts`): Coordena o fluxo, aplica regras por tipo de desligamento
3. **Tabelas Fiscais** (`src/lib/tables/*.ts`): INSS, IRRF e Seguro Desemprego 2026
4. **Utilitários** (`utils.ts`): Funções de data, arredondamento, cálculos auxiliares

### Tipos de Rescisão

A aplicação suporta 7 tipos de desligamento, cada um com regras específicas:

#### 1. Demissão sem justa causa
**Quando:** Empregador dispede o funcionário sem motivo válido.

**Direitos:**
- ✅ Saldo de salário
- ✅ Aviso prévio indenizado (30 + 3 dias/ano, máx 90 dias)
- ✅ 13º proporcional
- ✅ Férias proporcionais + 1/3
- ✅ Férias vencidas + 1/3 (se houver)
- ✅ Multa 40% do FGTS
- ✅ Saque do FGTS (100%)
- ✅ Seguro desemprego

**Deduções:**
- INSS sobre saldo de salário
- IRRF sobre verbas tributáveis

#### 2. Demissão com justa causa
**Quando:** Funcionário cometeu ato falta grave (roubo, agressão, etc.).

**Direitos:**
- ✅ Saldo de salário apenas
- ✅ Férias vencidas + 1/3 (se houver)

**Não tem direito:**
- ❌ Aviso prévio
- ❌ 13º proporcional
- ❌ Férias proporcionais
- ❌ Multa FGTS
- ❌ Saque FGTS
- ❌ Seguro desemprego

#### 3. Pedido de demissão
**Quando:** Funcionário pede para sair.

**Direitos:**
- ✅ Saldo de salário
- ✅ 13º proporcional
- ✅ Férias proporcionais + 1/3
- ✅ Férias vencidas + 1/3 (se houver)

**Não tem direito:**
- ❌ Aviso prévio
- ❌ Multa FGTS
- ❌ Saque FGTS
- ❌ Seguro desemprego

**Desconto:**
- Desconto de 30 dias de aviso prévio não cumprido (se não indenizado)

#### 4. Acordo mútuo
**Quando:** Empregador e funcionário entram em acordo (Lei 13.467/2017).

**Direitos:**
- ✅ Saldo de salário
- ✅ Aviso prévio 50% indenizado (se aplicável)
- ✅ 13º proporcional
- ✅ Férias proporcionais + 1/3
- ✅ Férias vencidas + 1/3 (se houver)
- ✅ Multa 20% do FGTS
- ✅ Saque do FGTS (até 80%)

**Não tem direito:**
- ❌ Seguro desemprego (Lei 13.877/2019 permite em alguns casos, mas não consta aqui)

#### 5. Término de contrato de experiência
**Quando:** Período de experiência termina sem continuação.

**Direitos:**
- ✅ Saldo de salário
- ✅ 13º proporcional
- ✅ Férias proporcionais + 1/3
- ✅ Férias vencidas + 1/3 (se houver)

**Não tem direito:**
- ❌ Aviso prévio
- ❌ Multa FGTS
- ❌ Saque FGTS
- ❌ Seguro desemprego

#### 6. Rescisão antecipada de experiência pelo empregador
**Quando:** Empregador rescinde contrato de experiência antes do término.

**Direitos:**
- ✅ Saldo de salário
- ✅ Aviso prévio indenizado
- ✅ 13º proporcional
- ✅ Férias proporcionais + 1/3
- ✅ Férias vencidas + 1/3 (se houver)
- ✅ Multa 40% do FGTS
- ✅ Saque do FGTS (100%)
- ✅ Seguro desemprego

#### 7. Rescisão antecipada de experiência pelo empregado
**Quando:** Funcionário pede para sair durante período de experiência.

**Direitos:**
- ✅ Saldo de salário
- ✅ 13º proporcional
- ✅ Férias proporcionais + 1/3
- ✅ Férias vencidas + 1/3 (se houver)

**Não tem direito:**
- ❌ Aviso prévio
- ❌ Multa FGTS
- ❌ Saque FGTS
- ❌ Seguro desemprego

**Desconto:**
- Desconto de 30 dias de aviso prévio não cumprido

### Funções de Cálculo

#### Saldo de Salário

**Assinatura:**
```typescript
calcularSaldoSalario(baseRemuneracao: number, dias: number): number
```

**Fórmula:**
```
saldoSalario = (baseRemuneracao / 30) × dias
```

Calcula o salário proporcional aos dias trabalhados no mês final. A CLT considera 30 dias como máximo.

**Parâmetros:**
- `baseRemuneracao`: Salário bruto + horas extras + adicionais
- `dias`: Dias trabalhados no mês final (máx 30)

**Exemplo:**
```
Salário: R$ 3.000
Dias trabalhados: 15
Saldo = (3000 / 30) × 15 = R$ 1.500
```

---

#### Aviso Prévio

**Assinatura:**
```typescript
calcularDiasAvisoPrevio(anosCompletos: number): number
calcularValorAvisoPrevio(baseRemuneracao: number, dias: number): number
```

**Fórmula de dias:**
```
diasAviso = min(30 + 3 × anosCompletos, 90)
```

**Fórmula de valor:**
```
valorAviso = (baseRemuneracao / 30) × diasAviso
```

O aviso prévio é calculado como 30 dias base mais 3 dias por ano completo trabalhado, com teto de 90 dias.

**Casos especiais:**
- **Acordo mútuo**: O aviso é 50% do calculado
- **Demissão sem causa**: 100% do calculado (indenizado)
- **Pedido de demissão**: Desconto de 30 dias se não cumprido
- **Com justa causa**: Não há aviso

**Exemplo:**
```
3 anos completos
Dias = min(30 + 3×3, 90) = 39 dias
Salário: R$ 2.000
Valor = (2000 / 30) × 39 = R$ 2.600
```

---

#### 13º Salário Proporcional

**Assinatura:**
```typescript
calcularDecimoTerceiro(baseRemuneracao: number, mesesNoAno: number): number
```

**Fórmula:**
```
decimoTerceiro = (baseRemuneracao / 12) × mesesNoAno
```

Um mês conta se o funcionário trabalhou **≥ 15 dias** naquele mês (regra CLT).

**Regra de 15 dias:**
- Janeiro com 20 dias = conta como 1 mês
- Fevereiro com 14 dias = não conta
- Dezembro (último mês) com 1 dia = não conta

**Exemplo:**
```
Salário: R$ 1.800
Meses no ano da demissão: 8 (trabalhou ≥ 15 dias em cada)
13º = (1800 / 12) × 8 = R$ 1.200
```

---

#### Férias Proporcionais + 1/3 Constitucional

**Assinatura:**
```typescript
calcularFeriasProporcionais(baseRemuneracao: number, meses: number): number
```

**Fórmula:**
```
base = (baseRemuneracao / 12) × meses
terco = base / 3
feriasProporcionais = base + terco
```

Calcula as férias proporcionais desde o último período aquisitivo, acrescidas de 1/3 (direito constitucional).

O **período aquisitivo** é de 12 meses. Para funcionários ainda no primeiro ano, conta desde a data de admissão.

**Exemplo:**
```
Salário: R$ 2.400
Meses desde último período aquisitivo: 6
Base = (2400 / 12) × 6 = R$ 1.200
Terço = 1200 / 3 = R$ 400
Total = R$ 1.200 + R$ 400 = R$ 1.600
```

---

#### Férias Vencidas + 1/3

**Assinatura:**
```typescript
calcularFeriasVencidas(baseRemuneracao: number, emDobro: boolean): number
```

**Fórmula:**
```
base = baseRemuneracao
terco = base / 3
total = base + terco
total = emDobro ? total × 2 : total
```

Calcula as férias que já estavam vencidas (não gozadas) pelo empregado. Se estão vencidas há mais de 12 meses, a CLT prevê **dobro** (Art. 137 CLT).

**Exemplo sem dobro:**
```
Salário: R$ 2.500
Férias vencidas (1 período)
Total = (2500 + 2500/3) = R$ 3.333,33
```

**Exemplo com dobro (> 12 meses vencidas):**
```
Salário: R$ 2.500
Férias vencidas (2+ períodos)
Total = (2500 + 2500/3) × 2 = R$ 6.666,67
```

---

#### FGTS (Estimativa e Multa)

**Assinatura:**
```typescript
estimarSaldoFgts(baseRemuneracao: number, meses: number): number
calcularMultaFgts(saldoFgts: number, percentual: number): number
```

**Fórmula de estimativa:**
```
saldoEstimado = baseRemuneracao × 0.08 × meses
```

Se o saldo não for informado, estima-se como 8% do salário por mês trabalhado.

**Fórmula de multa:**
```
multa = saldoFgts × percentual
```

**Percentuais por tipo:**
- **Demissão sem causa**: 40%
- **Rescisão antecipada por empregador**: 40%
- **Acordo mútuo**: 20%
- **Demais casos**: 0%

**Saque autorizado:**
- **Demissão sem causa**: 100%
- **Rescisão antecipada por empregador**: 100%
- **Acordo mútuo**: 80%
- **Demais casos**: 0%

**Exemplo:**
```
Salário: R$ 3.000
Meses trabalhados: 24
FGTS estimado = 3000 × 0.08 × 24 = R$ 5.760
Multa (demissão sem causa) = 5760 × 0.4 = R$ 2.304
Saque autorizado = 5760 × 1.0 = R$ 5.760
```

---

#### INSS (Tabela Progressiva 2026)

**Assinatura:**
```typescript
calcularInss(salario: number): number
```

A contribuição ao INSS é calculada aplicando alíquotas progressivas sobre cada faixa salarial. Cada porção do salário dentro de uma faixa paga apenas aquela alíquota.

**Tabela 2026:**
```
Faixa 1: até R$ 1.621,00          → 7,5%
Faixa 2: R$ 1.621,01 a R$ 2.902,84 → 9%
Faixa 3: R$ 2.902,85 a R$ 4.354,27 → 12%
Faixa 4: R$ 4.354,28 a R$ 8.475,55 → 14%
Teto: R$ 8.475,55
```

**Cálculo por faixa:**
```
INSS = (min(salario, teto_f1) - 0) × 0.075
     + (min(salario, teto_f2) - teto_f1) × 0.09
     + (min(salario, teto_f3) - teto_f2) × 0.12
     + (min(salario, teto_f4) - teto_f3) × 0.14
```

**Exemplo (salário de R$ 3.500):**
```
F1: (1621 - 0) × 0.075 = R$ 121,58
F2: (2902,84 - 1621) × 0.09 = R$ 115,55
F3: (3500 - 2902,84) × 0.12 = R$ 71,57
Total INSS = R$ 308,70
```

---

#### IRRF (Tabela Progressiva 2026 com Lei 15.270/2025)

**Assinatura:**
```typescript
calcularIrrf(
  rendimentoTributavel: number,
  dependentes: number,
  salarioBrutoMensal: number
): number
```

O IRRF (Imposto de Renda Retido na Fonte) é calculado em 5 passos:

1. **Escolher melhor dedução:**
   - Dedução por dependentes: R$ 189,59 × número de dependentes
   - Dedução simplificada: R$ 607,20
   - Usa o maior dos dois

2. **Calcular base:**
   ```
   base = rendimentoTributavel - melhorDeducao
   ```

3. **Aplicar tabela progressiva:**

   **Tabela 2026:**
   ```
   Faixa 1: até R$ 2.428,80                  → 0% (isento)
   Faixa 2: até R$ 2.826,65                  → 7,5% (desc R$ 182,16)
   Faixa 3: até R$ 3.751,05                  → 15% (desc R$ 394,16)
   Faixa 4: até R$ 4.664,68                  → 22,5% (desc R$ 675,49)
   Faixa 5: acima de R$ 4.664,68             → 27,5% (desc R$ 896,00)
   ```

   ```
   impostoTabela = base × aliquota - deducao
   ```

4. **Aplicar Lei 15.270/2025 (redução para baixa renda):**

   Se salário bruto mensal ≤ R$ 5.000:
   ```
   reducao = impostoTabela (100%)
   ```

   Se R$ 5.000 < salário ≤ R$ 7.350:
   ```
   reducao = impostoTabela × ((7.350 - salarioBruto) / 2.350)
   ```

   Se salário > R$ 7.350:
   ```
   reducao = 0
   ```

5. **Resultado final:**
   ```
   irrf = max(0, impostoTabela - reducao)
   ```

**Exemplo (salário R$ 3.000, 1 dependente, sem Lei 15.270):**
```
Dedução dependente = 189,59 × 1 = R$ 189,59
Dedução simplificada = R$ 607,20
Usa maior = R$ 607,20

Base = 3000 - 607,20 = R$ 2.392,80

Faixa 2 (até 2.826,65):
IRRF = 2.392,80 × 0.075 - 182,16 = R$ 17,44

Com Lei 15.270:
Redução = 17,44 × ((7350 - 3000) / 2350) = R$ 32,44
IRRF final = max(0, 17,44 - 32,44) = R$ 0 (totalmente reduzido)
```

---

#### Seguro Desemprego

**Assinatura:**
```typescript
calcularParcelas(mesesTrabalhados: number): number
calcularValorParcela(mediaSalarios: number): number
```

O seguro desemprego é uma **informação** na calculadora de rescisão. O cálculo de parcelas e valor é fornecido para referência.

**Parcelas por tempo de serviço:**
```
< 6 meses: 0 parcelas
6-11 meses: 3 parcelas
12-23 meses: 4 parcelas
24+ meses: 5 parcelas
```

**Valor por faixa salarial (2026):**
```
Faixa 1: até R$ 2.222,17              → 80% do salário (mín R$ 1.621,00)
Faixa 2: até R$ 3.703,99              → R$ 1.777,74 + 50% acima de 2.222,17
Faixa 3: acima de R$ 3.703,99         → R$ 2.518,65 (máximo)
```

**Exemplo:**
```
Salário: R$ 2.500
Meses trabalhados: 18
Parcelas: 4
Valor parcela: 1.777,74 + (2500 - 2222,17) × 0,5 = R$ 2.116,11
Total seguro: 4 × 2.116,11 = R$ 8.464,45
```

---

#### Salário Líquido (Calculadora Secundária)

**Assinatura:**
```typescript
calcularSalarioLiquido(input: SalaryInput): SalaryResult
```

Calcula o salário líquido mensal considerando:

1. **INSS**: Tabela progressiva (7,5% a 14%)
2. **IRRF**: Com Lei 15.270/2025
3. **Deduções variáveis**:
   - Vale transporte (6% ou custom)
   - Vale refeição
   - Plano de saúde
   - Pensão alimentícia
   - Previdência privada
   - Contribuição sindical

**Fórmula geral:**
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

**Entrada (SalaryInput):**
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

**Saída (SalaryResult):**
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

### Orquestrador (calcularRescisao)

A função principal que coordena todo o cálculo de rescisão:

**Assinatura:**
```typescript
calcularRescisao(input: CalculatorInput): CalculationResult
```

**Entrada (CalculatorInput):**
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

**Lógica de fluxo:**

1. **Validação**: Garante que campos obrigatórios não são nulos
2. **Base de remuneração**: Soma salário + horas extras + adicionais
3. **Duração do emprego**: Calcula anos, meses e dias trabalhados
4. **Aviso prévio**: Calcula dias e valor conforme tipo de desligamento
5. **Data efetiva**: Projeta data de fim incluindo aviso (afeta 13º e férias)
6. **Verbas individuais**: Calcula cada verba conforme regras do tipo
7. **Deduções**: INSS e IRRF sobre bases específicas
8. **Agregação**: Soma verbas e deduções

**Saída (CalculationResult):**
```typescript
{
  verbas: LineItem[]           // Ganhos
  deducoes: LineItem[]          // Descontos
  totalBruto: number            // Soma das verbas
  totalDeducoes: number         // Soma das deduções
  totalLiquido: number          // Bruto - deduções
  fgtsInfo: FgtsInfo           // Saldo, multa, saque
  seguroInfo: SeguroDesempregoInfo // Parcelas e valor
  avisoPrevioDias: number       // Dias de aviso
  duracaoAnos: number           // Anos trabalhados
  duracaoMeses: number          // Meses adicionais
  duracaoDias: number           // Dias adicionais
  motivoDesligamento: TerminationType
}
```

**Regras especiais por tipo:**

```typescript
// Tem direito a 13º e férias?
const temDireito13Ferias =
  motivo !== TerminationType.COM_JUSTA_CAUSA

// Tem direito a aviso indenizado?
const TIPOS_AVISO_INDENIZADO = {
  SEM_JUSTA_CAUSA,
  ACORDO_MUTUO,
  RESCISAO_ANTECIPADA_EMPREGADOR
}

// Tem direito a seguro desemprego?
const TIPOS_SEGURO_DESEMPREGO = {
  SEM_JUSTA_CAUSA,
  RESCISAO_ANTECIPADA_EMPREGADOR
}

// Desconta aviso não cumprido?
const TIPOS_DESCONTO_AVISO = {
  PEDIDO_DEMISSAO,
  RESCISAO_ANTECIPADA_EMPREGADO
}

// Multa FGTS
function multaFgtsPercentual(tipo): 0.4 | 0.2 | 0
  SEM_JUSTA_CAUSA → 0.4
  ACORDO_MUTUO → 0.2
  demais → 0

// Saque FGTS
function saqueFgtsPercentual(tipo): 1.0 | 0.8 | 0
  SEM_JUSTA_CAUSA → 1.0 (100%)
  ACORDO_MUTUO → 0.8 (80%)
  demais → 0
```

---

### Tabelas Vigentes (2026)

#### INSS 2026

```typescript
// src/lib/tables/inss-2026.ts
export const INSS_TETO = 8475.55
export const SALARIO_MINIMO = 1621.0

export const INSS_FAIXAS = [
  { teto: 1621.0,    aliquota: 0.075 },  // 7,5%
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

// Deduções
export const DEDUCAO_POR_DEPENDENTE = 189.59
export const DEDUCAO_SIMPLIFICADA = 607.2

// Lei 15.270/2025 - Redução para baixa renda
export const REDUCAO_LIMITE_INFERIOR = 5000.0
export const REDUCAO_LIMITE_SUPERIOR = 7350.0
export const REDUCAO_FAIXA = 2350.0
```

#### Seguro Desemprego 2026

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

## Componentes

### Arquitetura de Componentes

A aplicação segue uma estrutura de componentes bem definida, com separação clara entre apresentação e lógica.

#### Componentes de Layout (`src/components/layout/`)

**header.tsx**
- Exibe o título da aplicação
- Informações sobre o que é a ferramenta
- Links úteis (GitHub, contato)

**footer.tsx**
- Rodapé com disclaimers legais
- Informações de atualização das tabelas fiscais
- Links de referência legal

**faq.tsx**
- Seção de perguntas frequentes estruturada
- Schema JSON-LD para SEO
- Perguntas sobre tipos de desligamento, cálculos, etc.

#### Componentes da Calculadora de Rescisão (`src/components/calculator/`)

**form.tsx**
- Formulário principal com abas (básico/avançado)
- Campos de entrada: salário, datas, tipo de desligamento
- Controles para férias vencidas, aviso prévio
- Dispatch de actions para redutor

**results.tsx**
- Container que organiza os resultados
- Exibe SummaryCard, BreakdownTable, FgtsInfo, SeguroInfo

**summary-card.tsx**
- Resumo destaque com total líquido estimado
- Badge do tipo de desligamento
- Duração do emprego formatada

**breakdown-table.tsx**
- Tabela com todas as verbas (ganhos)
- Tabela com todas as deduções
- Totals de bruto, deduções, líquido
- Tooltips explicativos em cada linha

**fgts-info.tsx**
- Informações sobre saldo FGTS (estimado ou informado)
- Multa aplicável
- Percentual e valor de saque autorizado

**seguro-info.tsx**
- Informações sobre direito ao seguro desemprego
- Número de parcelas
- Valor estimado por parcela e total

**currency-input.tsx**
- Input customizado para valores em reais
- Formatação automática com separadores
- Parsing de entrada do usuário

**tooltip-explainer.tsx**
- Componente reutilizável para tooltips
- Ícone de interrogação ao lado do label
- Explicação em português simples

#### Componentes da Calculadora de Salário Líquido (`src/components/calculator/`)

**salary-form.tsx**
- Formulário para dados salariais
- Campos de salário, dependentes, deduções
- Opção de vale transporte como % ou valor fixo
- Opção de pensão como % ou valor fixo

**salary-results.tsx**
- Exibição de resultados de salário líquido
- Card com salário bruto e líquido destaque
- Tabela de deduções detalhada
- Alíquotas efetivas

#### Componentes UI (`src/components/ui/`)

Componentes base do shadcn/ui, customizados com Tailwind:
- `button.tsx` - Botão com variantes
- `card.tsx` - Container card
- `input.tsx` - Input de texto
- `label.tsx` - Label associado a inputs
- `select.tsx` - Select dropdown
- `table.tsx` - Tabela semântica
- `badge.tsx` - Badge/tag para status
- `tooltip.tsx` - Tooltip com Radix
- `tabs.tsx` - Abas (rescisão / salário)
- `collapsible.tsx` - Seção retrátil (avançado)
- `switch.tsx` - Toggle switch
- `separator.tsx` - Linha divisória

---

## Gerenciamento de Estado

A aplicação usa o padrão **useReducer** do React 19 para gerenciar estado de formulários de forma previsível.

### Padrão de Reducer

Ambas as calculadoras seguem o mesmo padrão:

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

### Calculadora de Rescisão

**Estado (CalculatorInput):**
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

**Uso em componente:**
```tsx
const [input, dispatch] = useReducer(calculatorReducer, defaultInput)

// Setando um campo
dispatch({
  type: 'SET_FIELD',
  field: 'salarioBruto',
  value: 3000
})

// Resetando
dispatch({ type: 'RESET' })
```

### Calculadora de Salário Líquido

**Estado (SalaryInput):**
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

### Cálculos em Tempo Real

Ambas usam `useMemo` para recalcular apenas quando o estado muda:

```tsx
const result = useMemo(() => {
  if (!isValid(input)) return null
  return calcularRescisao(input)
}, [input])
```

Isso garante performance mesmo com cálculos complexos.

---

## Testes

A suite de testes cobre o motor de cálculos completamente. Todos os cálculos são funções puras, facilitando testes.

### Estrutura de Testes

```
src/__tests__/
├── utils.test.ts                    # Testes de funções auxiliares
└── calculations/
    ├── saldo-salario.test.ts        # Testes de saldo de salário
    ├── aviso-previo.test.ts         # Testes de aviso prévio
    ├── decimo-terceiro.test.ts      # Testes de 13º
    ├── ferias.test.ts               # Testes de férias
    ├── fgts.test.ts                 # Testes de FGTS
    ├── inss.test.ts                 # Testes de INSS
    ├── irrf.test.ts                 # Testes de IRRF
    ├── seguro-desemprego.test.ts    # Testes de seguro
    ├── salario-liquido.test.ts      # Testes de salário líquido
    └── integration.test.ts          # Testes end-to-end
```

### Executar Testes

```bash
# Rodar todos os testes uma vez
npm run test

# Rodar em modo watch (desenvolvimento)
npm run test:watch
```

### Cobertura de Testes

**Funções auxiliares (utils.test.ts):**
- `roundCurrency` - Arredondamento de moeda
- `calcularDiasNoMes` - Dias no mês final
- `calcularMesesTrabalhados` - Meses trabalhados (regra 15 dias)
- `calcularAnosCompletos` - Anos completos
- `calcularDuracaoEmprego` - Duração formatada
- `calcularMesesNoAnoParaDecimoTerceiro` - Meses no ano
- `calcularMesesPeriodoAquisitivo` - Meses desde último período

**Exemplos de cenários:**
- Menos de 15 dias = 0 meses
- Exatamente 15 dias = 1 mês
- Contraponto: <15 dias não contam
- Múltiplos anos
- Cruzamento de anos
- Mesmos mês/ano

### Padrão de Teste

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

### Testes de Integração

O arquivo `integration.test.ts` testa fluxos completos:
- Demissão sem causa com 3 anos de serviço
- Acordo mútuo
- Pedido de demissão
- Contrato de experiência
- Casos edge (menos de 1 mês, 30+ anos, etc.)

---

## Desenvolvimento

### Pré-requisitos

- **Node.js**: 18+ (recomendado 20+)
- **npm**: 9+
- **Git**: para versionamento

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/rescisao-clt.git
cd rescisao-clt

# Instalar dependências
npm install

# Verificar instalação
npm run test
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor local (http://localhost:3000)
npm run build              # Build de produção
npm run start              # Inicia servidor de produção

# Linting e Formatação
npm run lint               # Verifica código com Biome
npm run lint:fix           # Corrige issues automaticamente

# Testes
npm run test               # Roda testes uma vez
npm run test:watch         # Modo watch para desenvolvimento
```

### Estrutura de Pastas para Desenvolvimento

```
src/
├── app/                    # App Router do Next.js
├── components/             # Componentes React
│   ├── ui/                # Componentes base (shadcn)
│   ├── calculator/        # Componentes da calculadora
│   └── layout/            # Layout compartilhado
├── lib/                    # Lógica de negócio
│   ├── calculations/      # Motor de cálculos
│   ├── tables/            # Tabelas fiscais
│   └── types.ts          # Tipos TypeScript
└── __tests__/             # Testes
```

### Padrões de Código

**Imports:**
```typescript
// Usar caminho absoluto com alias @
import { calcularRescisao } from '@/lib/calculations'
import { Card } from '@/components/ui/card'
```

**Funções puras:**
```typescript
// Sem efeitos colaterais
export function calcularSaldo(salario: number, dias: number): number {
  return roundCurrency((salario / 30) * dias)
}
```

**Tipos primeiro:**
```typescript
// Sempre usar interface para objects
export interface CalculatorInput {
  salarioBruto: number
  // ...
}
```

**Componentes servidor-first:**
```typescript
// Usar RSC quando possível, 'use client' apenas quando necessário
'use client'
import { useState } from 'react'
```

### Boas Práticas

1. **Testes**: Sempre testar funções de cálculo
2. **Tipos**: Nunca usar `any`, manter strict mode
3. **Linting**: Rodar `npm run lint:fix` antes de commit
4. **Documentação**: Comentar funções complexas
5. **Performance**: Usar `useMemo` para cálculos caros

### Adicionando uma Nova Função de Cálculo

1. Criar arquivo em `src/lib/calculations/nova-funcao.ts`
2. Implementar função pura com JSDoc
3. Criar testes em `src/__tests__/calculations/nova-funcao.test.ts`
4. Importar e usar no orquestrador (`index.ts`)
5. Rodar testes: `npm run test`

**Exemplo:**
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

### Linting e Formatação

O projeto usa **Biome** para linting e formatação:

```bash
# Verificar código
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

**Configuração (biome.json):**
- Espaços: 2
- Aspas: simples
- Pontos-e-vírgulas: opcionais
- Organizar imports automaticamente
- Recomendações ativadas

---

## Deploy

A aplicação é hospedada no **Vercel**, vinculada ao repositório Git.

### Deploy Automático

Qualquer push para a branch `main` dispara deploy automático:

1. **Build**: `npm run build`
2. **Testes**: Rodam automaticamente
3. **Deploy**: Vercel publica em produção
4. **URL**: [rescisao-clt.vercel.app](https://rescisao-clt.vercel.app)

### Variáveis de Ambiente

Nenhuma variável de ambiente necessária no momento. Tudo é código estático.

### Testar Build Localmente

```bash
# Simular build de produção
npm run build

# Servir localmente
npm run start
```

### Monitoramento

Vercel fornece:
- Analytics de performance
- Logs de erro
- Métricas de tráfego

Monitorar em [vercel.com/dashboard](https://vercel.com/dashboard)

---

## Considerações Legais

### Disclaimer

Esta calculadora é uma **ferramenta de estimativa** e não substitui orientação jurídica profissional.

**Importante:**
- Os valores são aproximados e podem variar conforme:
  - Convenções coletivas da categoria
  - Adicionais específicos (insalubridade, periculosidade)
  - Situação individual do trabalhador
  - Acordos internos da empresa

- As tabelas de INSS e IRRF são baseadas em valores vigentes em **2026**

- A legislação aplicada é:
  - Consolidação das Leis do Trabalho (CLT)
  - Reforma Trabalhista (Lei 13.467/2017)
  - Lei 15.270/2025 (redução de IRRF)

- **Última atualização das tabelas: 2026-03-25**

### Recomendação

Para rescisões com valores altos ou situações complexas, **sempre consulte um advogado trabalhista**.

---

## Referências Legais

- [CLT - Consolidação das Leis do Trabalho](http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm)
- [Reforma Trabalhista - Lei 13.467/2017](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm)
- [Lei 13.877/2019 - Seguro Desemprego](http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/L13877.htm)
- [Lei 15.270/2025 - Redução IRRF](http://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm)
- [INSS - Tabelas 2026](https://www.gov.br/inss)
- [Receita Federal - IRRF](https://www.gov.br/receitafederal)

---

## Licença

Este projeto está licenciado sob a MIT License.

---

## Contribuindo

Contribuições são bem-vindas!

**Para contribuir:**
1. Faça fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

**Código deve passar em:**
- `npm run lint:fix` (Biome)
- `npm run test` (todos os testes passando)

---

## Suporte

Problemas ou dúvidas?

- Abra uma [Issue no GitHub](https://github.com/seu-usuario/rescisao-clt/issues)
- Consulte a [FAQ](/) na aplicação

---

## Changelog

### v0.1.0 (2025-03-25)
- Lançamento inicial
- Calculadora de rescisão com 7 tipos de desligamento
- Calculadora de salário líquido
- Tabelas INSS, IRRF e Seguro Desemprego 2026
- Lei 15.270/2025 integrada
- Testes completos
- Dark/Light mode
- Responsivo
- SEO otimizado

---

## Roadmap

- [ ] Integração com dados do CAGED (histórico laboral)
- [ ] Exportar resultado em PDF
- [ ] Suporte a múltiplas moedas
- [ ] API REST para integração
- [ ] Aplicativo mobile nativo
- [ ] Histórico de cálculos (localStorage)
- [ ] Comparador de cenários (E se...?)

---

**Desenvolvido com ❤️ para trabalhadores CLT do Brasil.**
