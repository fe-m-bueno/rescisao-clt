export enum TerminationType {
  SEM_JUSTA_CAUSA = 'sem_justa_causa',
  COM_JUSTA_CAUSA = 'com_justa_causa',
  PEDIDO_DEMISSAO = 'pedido_demissao',
  ACORDO_MUTUO = 'acordo_mutuo',
  FIM_CONTRATO_EXPERIENCIA = 'fim_contrato_experiencia',
  RESCISAO_ANTECIPADA_EMPREGADOR = 'rescisao_antecipada_empregador',
  RESCISAO_ANTECIPADA_EMPREGADO = 'rescisao_antecipada_empregado',
}

export enum AvisoPrevioType {
  TRABALHADO = 'trabalhado',
  INDENIZADO = 'indenizado',
  DISPENSADO = 'dispensado',
}

export interface CalculatorInput {
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

export interface LineItem {
  label: string
  value: number
  description: string
  detail?: string
}

export interface FgtsInfo {
  saldoEstimado: number
  podeRetirar: boolean
  percentualRetirada: number
  valorRetirada: number
  multaPercentual: number
  multaValor: number
}

export interface SeguroDesempregoInfo {
  temDireito: boolean
  parcelas: number
  valorParcela: number
  valorTotal: number
}

export interface CalculationResult {
  verbas: LineItem[]
  deducoes: LineItem[]
  totalBruto: number
  totalDeducoes: number
  totalLiquido: number
  fgtsInfo: FgtsInfo
  seguroInfo: SeguroDesempregoInfo
  avisoPrevioDias: number
  duracaoAnos: number
  duracaoMeses: number
  duracaoDias: number
  motivoDesligamento: TerminationType
}

export interface InssFaixa {
  teto: number
  aliquota: number
}

export interface IrrfFaixa {
  teto: number
  aliquota: number
  deducao: number
}

export const TERMINATION_LABELS: Record<TerminationType, string> = {
  [TerminationType.SEM_JUSTA_CAUSA]: 'Demissão sem justa causa',
  [TerminationType.COM_JUSTA_CAUSA]: 'Demissão com justa causa',
  [TerminationType.PEDIDO_DEMISSAO]: 'Pedido de demissão',
  [TerminationType.ACORDO_MUTUO]: 'Acordo mútuo',
  [TerminationType.FIM_CONTRATO_EXPERIENCIA]:
    'Término de contrato de experiência',
  [TerminationType.RESCISAO_ANTECIPADA_EMPREGADOR]:
    'Rescisão antecipada de experiência pelo empregador',
  [TerminationType.RESCISAO_ANTECIPADA_EMPREGADO]:
    'Rescisão antecipada de experiência pelo empregado',
}

export const AVISO_PREVIO_LABELS: Record<AvisoPrevioType, string> = {
  [AvisoPrevioType.TRABALHADO]: 'Trabalhado',
  [AvisoPrevioType.INDENIZADO]: 'Indenizado',
  [AvisoPrevioType.DISPENSADO]: 'Dispensado',
}
