import type { Barbeiro } from '../types/dominio';

export const barbeirosDemo: Barbeiro[] = [
  {
    id: 'barbeiro-douglas',
    nome: 'Douglas Silva',
    apelido: 'Doug',
    fotoUrl: '/favicon.svg',
    descricao: 'Especialista em cortes clássicos, degradê limpo e acabamento detalhado.',
    ativo: true,
    googleCalendarId: 'primary',
  },
  {
    id: 'barbeiro-marcos',
    nome: 'Marcos Oliveira',
    apelido: 'Marcos',
    fotoUrl: '/favicon.svg',
    descricao: 'Foco em barba, corte social e atendimento rápido para rotina corrida.',
    ativo: true,
    googleCalendarId: 'primary',
  },
];

export async function listarBarbeiros(): Promise<Barbeiro[]> {
  return barbeirosDemo.filter((barbeiro) => barbeiro.ativo);
}
