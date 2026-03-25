import type { CalculatorInput } from './types'
import { AvisoPrevioType } from './types'

export const defaultInput: CalculatorInput = {
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

export type Action =
  | { type: 'SET_FIELD'; field: keyof CalculatorInput; value: unknown }
  | { type: 'RESET' }

export function calculatorReducer(
  state: CalculatorInput,
  action: Action,
): CalculatorInput {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return defaultInput
  }
}
