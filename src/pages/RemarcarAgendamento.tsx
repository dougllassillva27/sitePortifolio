import { FormEvent, useState } from 'react';
import { gerarHorariosDemo, obterDataHojeCampo } from '../utils/datas';

export function RemarcarAgendamento() {
  const [token, setToken] = useState('');
  const [data, setData] = useState(obterDataHojeCampo());
  const [horario, setHorario] = useState('');
  const [mensagem, setMensagem] = useState('');

  function remarcar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!token.trim() || !horario) {
      setMensagem('Informe token e novo horário.');
      return;
    }

    setMensagem('Solicitação de remarcação registrada para validação.');
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black">Remarcar agendamento</h1>
      <p className="mt-3 text-zinc-400">Escolha um novo horário usando o token recebido.</p>

      <form onSubmit={remarcar} className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <label className="grid gap-2">
          <span className="font-semibold">Token</span>
          <input value={token} onChange={(evento) => setToken(evento.target.value)} className="campo" />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold">Nova data</span>
          <input type="date" value={data} onChange={(evento) => setData(evento.target.value)} className="campo" />
        </label>

        <fieldset className="grid gap-3">
          <legend className="font-semibold">Novo horário</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {gerarHorariosDemo(data).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setHorario(item)}
                className={[
                  'rounded-2xl border px-4 py-3 text-sm font-bold transition',
                  horario === item
                    ? 'border-amber-300 bg-amber-300 text-zinc-950'
                    : 'border-white/10 bg-white/[0.04] text-white hover:bg-white/10',
                ].join(' ')}
              >
                {new Date(item).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </button>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="rounded-full bg-amber-300 px-6 py-3 font-bold text-zinc-950">
          Solicitar remarcação
        </button>

        {mensagem && <p className="rounded-2xl bg-white/10 p-4">{mensagem}</p>}
      </form>
    </section>
  );
}
