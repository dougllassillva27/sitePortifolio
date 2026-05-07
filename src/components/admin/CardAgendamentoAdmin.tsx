import type { Agendamento } from '../../types/dominio';
import { formatarDataHora } from '../../utils/datas';

interface CardAgendamentoAdminProps {
  agendamento: Agendamento;
  aoAceitar: (id: string) => void;
  aoCancelar: (id: string) => void;
  aoConcluir: (id: string) => void;
}

export function CardAgendamentoAdmin({
  agendamento,
  aoAceitar,
  aoCancelar,
  aoConcluir,
}: CardAgendamentoAdminProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm text-zinc-400">{formatarDataHora(agendamento.inicio)}</p>
          <h3 className="mt-1 text-xl font-bold">{agendamento.cliente.nome}</h3>
          <p className="text-zinc-300">{agendamento.cliente.telefone}</p>
          <p className="mt-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm">
            {agendamento.status}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => aoAceitar(agendamento.id)}
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-zinc-950"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => aoCancelar(agendamento.id)}
            className="rounded-full bg-red-400 px-4 py-2 text-sm font-bold text-zinc-950"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => aoConcluir(agendamento.id)}
            className="rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-zinc-950"
          >
            Concluir
          </button>
        </div>
      </div>
    </article>
  );
}
