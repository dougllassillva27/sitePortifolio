import type { Servico } from '../types/dominio';

export const servicosDemo: Servico[] = [
  {
    id: 'corte',
    nome: 'Corte',
    descricao: 'Corte masculino com acabamento na navalha.',
    precoCentavos: 4500,
    duracaoMinutos: 30,
    ativo: true,
  },
  {
    id: 'barba',
    nome: 'Barba',
    descricao: 'Barba desenhada com toalha quente e finalização.',
    precoCentavos: 3500,
    duracaoMinutos: 20,
    ativo: true,
  },
  {
    id: 'corte-barba',
    nome: 'Corte + Barba',
    descricao: 'Combo completo para sair pronto.',
    precoCentavos: 7500,
    duracaoMinutos: 50,
    ativo: true,
  },
  {
    id: 'sobrancelha',
    nome: 'Sobrancelha',
    descricao: 'Limpeza e alinhamento rápido.',
    precoCentavos: 2000,
    duracaoMinutos: 15,
    ativo: true,
  },
];

export async function listarServicos(): Promise<Servico[]> {
  return servicosDemo.filter((servico) => servico.ativo);
}
