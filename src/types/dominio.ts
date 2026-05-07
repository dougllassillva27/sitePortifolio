export type StatusAgendamento =
  | 'pendente'
  | 'confirmado'
  | 'cancelado_pelo_cliente'
  | 'cancelado_pelo_admin'
  | 'remarcacao_solicitada'
  | 'remarcado'
  | 'concluido'
  | 'nao_compareceu';

export type TipoBloqueio =
  | 'feriado'
  | 'folga'
  | 'bloqueio_manual'
  | 'manutencao'
  | 'outro';

export interface Barbeiro {
  id: string;
  nome: string;
  apelido: string;
  fotoUrl: string;
  descricao: string;
  ativo: boolean;
  googleCalendarId?: string;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  precoCentavos: number;
  duracaoMinutos: number;
  ativo: boolean;
}

export interface Cliente {
  id?: string;
  nome: string;
  telefone: string;
  email?: string;
}

export interface Agendamento {
  id: string;
  barbeiroId: string;
  servicoId: string;
  cliente: Cliente;
  inicio: string;
  fim: string;
  status: StatusAgendamento;
  observacao?: string;
  motivoCancelamento?: string;
  googleEventId?: string;
  tokenCliente: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface NovoAgendamento {
  barbeiroId: string;
  servicoId: string;
  cliente: Cliente;
  inicio: string;
  fim: string;
  observacao?: string;
}

export interface BloqueioAgenda {
  id: string;
  barbeiroId: string;
  inicio: string;
  fim: string;
  motivo: string;
  tipo: TipoBloqueio;
}
