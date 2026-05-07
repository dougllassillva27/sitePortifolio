import type { Agendamento, NovoAgendamento } from '../types/dominio';
import { supabase, supabaseConfigurado } from './supabase';

const chaveLocal = 'barberflow_agendamentos_demo';

function gerarId(): string {
  if ('crypto' in window && 'randomUUID' in window.crypto) {
    return window.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function lerAgendamentosLocais(): Agendamento[] {
  const bruto = localStorage.getItem(chaveLocal);

  if (!bruto) {
    return [];
  }

  try {
    return JSON.parse(bruto) as Agendamento[];
  } catch {
    return [];
  }
}

function salvarAgendamentosLocais(agendamentos: Agendamento[]): void {
  localStorage.setItem(chaveLocal, JSON.stringify(agendamentos));
}

export async function criarAgendamento(dados: NovoAgendamento): Promise<Agendamento> {
  const agora = new Date().toISOString();

  const agendamento: Agendamento = {
    id: gerarId(),
    barbeiroId: dados.barbeiroId,
    servicoId: dados.servicoId,
    cliente: dados.cliente,
    inicio: dados.inicio,
    fim: dados.fim,
    status: 'pendente',
    observacao: dados.observacao,
    tokenCliente: gerarId(),
    criadoEm: agora,
    atualizadoEm: agora,
  };

  if (!supabaseConfigurado) {
    const agendamentos = lerAgendamentosLocais();
    salvarAgendamentosLocais([agendamento, ...agendamentos]);
    return agendamento;
  }

  const { error } = await supabase.from('clientes').insert({
    id: agendamento.cliente.id,
    nome: agendamento.cliente.nome,
    telefone: agendamento.cliente.telefone,
    email: agendamento.cliente.email || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data, error: erroAgendamento } = await supabase
    .from('agendamentos')
    .insert({
      id: agendamento.id,
      barbeiro_id: agendamento.barbeiroId,
      servico_id: agendamento.servicoId,
      cliente_id: agendamento.cliente.id,
      inicio: agendamento.inicio,
      fim: agendamento.fim,
      status: agendamento.status,
      observacao: agendamento.observacao || null,
      token_cliente: agendamento.tokenCliente,
    })
    .select()
    .single();

  if (erroAgendamento) {
    throw new Error(erroAgendamento.message);
  }

  return {
    ...agendamento,
    id: data.id,
  };
}

export async function listarAgendamentosDemo(): Promise<Agendamento[]> {
  return lerAgendamentosLocais();
}

export async function atualizarStatusLocal(id: string, status: Agendamento['status']): Promise<void> {
  const agendamentos = lerAgendamentosLocais();
  const atualizados = agendamentos.map((agendamento) =>
    agendamento.id === id
      ? { ...agendamento, status, atualizadoEm: new Date().toISOString() }
      : agendamento,
  );

  salvarAgendamentosLocais(atualizados);
}
