import type { Barbeiro, Servico } from '../../types/dominio';
import { formatarDinheiro } from '../../utils/dinheiro';

interface CardResumoAgendamentoProps {
  barbeiro?: Barbeiro;
  servico?: Servico;
  horario?: string;
}

export function CardResumoAgendamento({ barbeiro, servico, horario }: CardResumoAgendamentoProps) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-xl font-bold">Resumo</h2>

      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-zinc-400">Barbeiro</dt>
          <dd className="font-semibold">{barbeiro?.nome ?? 'Selecione um barbeiro'}</dd>
        </div>

        <div>
          <dt className="text-zinc-400">Serviço</dt>
          <dd className="font-semibold">
            {servico ? `${servico.nome} — ${formatarDinheiro(servico.precoCentavos)}` : 'Selecione um serviço'}
          </dd>
        </div>

        <div>
          <dt className="text-zinc-400">Duração</dt>
          <dd className="font-semibold">{servico ? `${servico.duracaoMinutos} minutos` : 'Aguardando serviço'}</dd>
        </div>

        <div>
          <dt className="text-zinc-400">Horário</dt>
          <dd className="font-semibold">{horario ? new Date(horario).toLocaleString('pt-BR') : 'Selecione um horário'}</dd>
        </div>
      </dl>
    </aside>
  );
}
