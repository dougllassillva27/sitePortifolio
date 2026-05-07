import { useEffect, useState } from 'react';
import { CardAgendamentoAdmin } from '../components/admin/CardAgendamentoAdmin';
import { atualizarStatusLocal, listarAgendamentosDemo } from '../services/agendamentos';
import type { Agendamento } from '../types/dominio';

export function PainelAdmin() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  async function carregar() {
    const dados = await listarAgendamentosDemo();
    setAgendamentos(dados);
  }

  async function alterarStatus(id: string, status: Agendamento['status']) {
    await atualizarStatusLocal(id, status);
    await carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Painel</p>
          <h1 className="mt-2 text-4xl font-black">Agendamentos</h1>
          <p className="mt-3 text-zinc-400">Dados locais no modo demo. Configure Supabase para produção.</p>
        </div>

        <button type="button" onClick={carregar} className="rounded-full border border-white/10 px-5 py-3 font-bold">
          Atualizar
        </button>
      </div>

      <div className="mt-8 grid gap-4">
        {agendamentos.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-zinc-300">
            Nenhum agendamento local ainda. Crie um agendamento público para testar.
          </div>
        )}

        {agendamentos.map((agendamento) => (
          <CardAgendamentoAdmin
            key={agendamento.id}
            agendamento={agendamento}
            aoAceitar={(id) => alterarStatus(id, 'confirmado')}
            aoCancelar={(id) => alterarStatus(id, 'cancelado_pelo_admin')}
            aoConcluir={(id) => alterarStatus(id, 'concluido')}
          />
        ))}
      </div>
    </section>
  );
}
