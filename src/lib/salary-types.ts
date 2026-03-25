export interface SalaryInput {
  salarioBruto: number
  dependentes: number
  valeTransporte: boolean
  valeTransportePercentual: number
  valeRefeicao: number
  planoSaude: number
  pensaoAlimenticia: number
  pensaoAlimenticiaPercentual: boolean
  previdenciaPrivada: number
  contribuicaoSindical: number
}

export interface SalaryLineItem {
  label: string
  value: number
  description: string
  type: 'earning' | 'deduction'
}

export interface SalaryResult {
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
  aliquotaEfetiva: {
    inss: number
    irrf: number
    total: number
  }
}
