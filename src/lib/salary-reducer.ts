import type { SalaryInput } from './salary-types'

export const defaultSalaryInput: SalaryInput = {
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

export type SalaryAction =
  | { type: 'SET_FIELD'; field: keyof SalaryInput; value: unknown }
  | { type: 'RESET' }

export function salaryReducer(
  state: SalaryInput,
  action: SalaryAction,
): SalaryInput {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return defaultSalaryInput
  }
}
