import type { Agendamento, Barbeiro, Servico } from '../types/dominio';
import { formatarDataHora } from './datas';
import { normalizarTelefoneBrasil } from './telefone';

interface CriarMensagemConfirmacaoParametros {
  agendamento: Agendamento;
  barbeiro: Barbeiro;
  servico: Servico;
  nomeBarbearia: string;
  linkCliente: string;
}

export function criarMensagemConfirmacao({
  agendamento,
  barbeiro,
  servico,
  nomeBarbearia,
  linkCliente,
}: CriarMensagemConfirmacaoParametros): string {
  return [
    `Olá, ${agendamento.cliente.nome}! Seu agendamento na ${nomeBarbearia} foi confirmado.`,
    '',
    `Serviço: ${servico.nome}`,
    `Barbeiro: ${barbeiro.nome}`,
    `Data e horário: ${formatarDataHora(agendamento.inicio)}`,
    '',
    `Caso precise remarcar ou cancelar, acesse: ${linkCliente}`,
  ].join('\n');
}

export function criarLinkWhatsApp(telefone: string, mensagem: string): string {
  const telefoneNormalizado = normalizarTelefoneBrasil(telefone);
  return `https://wa.me/${telefoneNormalizado}?text=${encodeURIComponent(mensagem)}`;
}
