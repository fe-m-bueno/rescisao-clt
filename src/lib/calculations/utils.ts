/**
 * Rounds a number to 2 decimal places (currency precision).
 * Uses Math.round with epsilon correction to avoid floating-point issues.
 */
export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/**
 * Calculates the number of days worked in the final month.
 * CLT considers a month as 30 days max.
 */
export function calcularDiasNoMes(dataDesligamento: Date): number {
  const dia = dataDesligamento.getDate()
  return Math.min(dia, 30)
}

/**
 * Calculates total months worked between two dates.
 * A partial month counts as full if >= 15 days were worked in it.
 */
export function calcularMesesTrabalhados(inicio: Date, fim: Date): number {
  const startYear = inicio.getFullYear()
  const startMonth = inicio.getMonth()
  const endYear = fim.getFullYear()
  const endMonth = fim.getMonth()

  // Total full months difference
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth)

  // Days in partial final month
  const startDay = inicio.getDate()
  const endDay = fim.getDate()

  // If same month
  if (totalMonths === 0) {
    const daysWorked = endDay - startDay + 1
    return daysWorked >= 15 ? 1 : 0
  }

  // Days in first partial month (from start day to end of month)
  const daysInStartMonth = daysInMonth(startYear, startMonth) - startDay + 1
  const firstMonthCounts = daysInStartMonth >= 15 ? 1 : 0

  // Full months in between (excluding first and last month)
  const fullMonths = totalMonths - 1

  // Days in last partial month
  const lastMonthCounts = endDay >= 15 ? 1 : 0

  return firstMonthCounts + fullMonths + lastMonthCounts
}

/**
 * Calculates complete years worked.
 */
export function calcularAnosCompletos(inicio: Date, fim: Date): number {
  let years = fim.getFullYear() - inicio.getFullYear()

  // Check if we haven't reached the anniversary yet this year
  const monthDiff = fim.getMonth() - inicio.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && fim.getDate() < inicio.getDate())) {
    years--
  }

  return Math.max(0, years)
}

/**
 * Calculates employment duration in years, months, and days.
 */
export function calcularDuracaoEmprego(
  inicio: Date,
  fim: Date,
): { anos: number; meses: number; dias: number } {
  let anos = fim.getFullYear() - inicio.getFullYear()
  let meses = fim.getMonth() - inicio.getMonth()
  let dias = fim.getDate() - inicio.getDate()

  if (dias < 0) {
    meses--
    const prevMonth = new Date(fim.getFullYear(), fim.getMonth(), 0)
    dias += prevMonth.getDate()
  }

  if (meses < 0) {
    anos--
    meses += 12
  }

  return {
    anos: Math.max(0, anos),
    meses: Math.max(0, meses),
    dias: Math.max(0, dias),
  }
}

/**
 * Calculates months in current year for 13th salary calculation.
 * Uses the 15-day rule: a month counts if worker worked >= 15 days in it.
 */
export function calcularMesesNoAnoParaDecimoTerceiro(
  dataAdmissao: Date,
  dataDesligamento: Date,
): number {
  const anoDesligamento = dataDesligamento.getFullYear()

  // Determine the start date for counting in the termination year
  const inicioAno =
    dataAdmissao.getFullYear() === anoDesligamento
      ? dataAdmissao
      : new Date(anoDesligamento, 0, 1)

  return calcularMesesTrabalhados(inicioAno, dataDesligamento)
}

/**
 * Calculates months since last vacation accrual period started.
 * The accrual period starts on the hire date anniversary each year.
 */
export function calcularMesesPeriodoAquisitivo(
  dataAdmissao: Date,
  dataDesligamento: Date,
): number {
  const anosCompletos = calcularAnosCompletos(dataAdmissao, dataDesligamento)

  // Last anniversary date
  const ultimoAniversario = new Date(
    dataAdmissao.getFullYear() + anosCompletos,
    dataAdmissao.getMonth(),
    dataAdmissao.getDate(),
  )

  return calcularMesesTrabalhados(ultimoAniversario, dataDesligamento)
}

/** Helper: get number of days in a specific month */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}
