import { FormEvent, useState } from 'react';

export function CancelarAgendamento() {
  const [token, setToken] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensagem, setMensagem] = useState('');

  function cancelar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!token.trim()) {
      setMensagem('Informe o token do agendamento.');
      return;
    }

    setMensagem('Solicitação de cancelamento registrada para validação.');
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black">Cancelar agendamento</h1>
      <p className="mt-3 text-zinc-400">Use o token recebido no link do agendamento.</p>

      <form onSubmit={cancelar} className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <label className="grid gap-2">
          <span className="font-semibold">Token</span>
          <input value={token} onChange={(evento) => setToken(evento.target.value)} className="campo" />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold">Motivo opcional</span>
          <textarea value={motivo} onChange={(evento) => setMotivo(evento.target.value)} className="campo min-h-28" />
        </label>

        <button type="submit" className="rounded-full bg-red-300 px-6 py-3 font-bold text-zinc-950">
          Cancelar agendamento
        </button>

        {mensagem && <p className="rounded-2xl bg-white/10 p-4">{mensagem}</p>}
      </form>
    </section>
  );
}
