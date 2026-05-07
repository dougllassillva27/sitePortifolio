import { FormEvent, useMemo, useState } from 'react';
import { CardResumoAgendamento } from '../components/agendamento/CardResumoAgendamento';
import { criarAgendamento } from '../services/agendamentos';
import { barbeirosDemo } from '../services/barbeiros';
import { servicosDemo } from '../services/servicos';
import type { Agendamento as AgendamentoTipo } from '../types/dominio';
import { gerarHorariosDemo, obterDataHojeCampo, somarMinutos } from '../utils/datas';
import { criarLinkWhatsApp } from '../utils/whatsapp';

export function Agendamento() {
  const [barbeiroId, setBarbeiroId] = useState(barbeirosDemo[0]?.id ?? '');
  const [servicoId, setServicoId] = useState(servicosDemo[0]?.id ?? '');
  const [data, setData] = useState(obterDataHojeCampo());
  const [horario, setHorario] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [observacao, setObservacao] = useState('');
  const [agendamentoCriado, setAgendamentoCriado] = useState<AgendamentoTipo | null>(null);
  const [erro, setErro] = useState('');

  const barbeiroSelecionado = useMemo(
    () => barbeirosDemo.find((barbeiro) => barbeiro.id === barbeiroId),
    [barbeiroId],
  );

  const servicoSelecionado = useMemo(
    () => servicosDemo.find((servico) => servico.id === servicoId),
    [servicoId],
  );

  const horarios = useMemo(() => gerarHorariosDemo(data), [data]);

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro('');

    if (!barbeiroSelecionado || !servicoSelecionado || !horario || !nome.trim() || !telefone.trim()) {
      setErro('Preencha barbeiro, serviço, horário, nome e telefone.');
      return;
    }

    const novoAgendamento = await criarAgendamento({
      barbeiroId,
      servicoId,
      inicio: horario,
      fim: somarMinutos(horario, servicoSelecionado.duracaoMinutos),
      observacao,
      cliente: {
        nome: nome.trim(),
        telefone: telefone.trim(),
        email: email.trim() || undefined,
      },
    });

    setAgendamentoCriado(novoAgendamento);
  }

  const linkWhatsApp = agendamentoCriado
    ? criarLinkWhatsApp(
        agendamentoCriado.cliente.telefone,
        `Olá, ${agendamentoCriado.cliente.nome}! Seu agendamento foi recebido como pendente. Aguarde a confirmação da barbearia.`,
      )
    : '';

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px]">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Agendamento</p>
        <h1 className="mt-2 text-4xl font-black">Marque seu horário</h1>
        <p className="mt-3 text-zinc-400">O pedido entra como pendente até confirmação do estabelecimento.</p>

        {agendamentoCriado ? (
          <div className="mt-8 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6">
            <h2 className="text-2xl font-black text-emerald-200">Agendamento recebido</h2>
            <p className="mt-3 text-zinc-200">
              Status atual: <strong>{agendamentoCriado.status}</strong>
            </p>
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-emerald-300 px-6 py-3 font-bold text-zinc-950"
            >
              Abrir WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={enviarFormulario} className="mt-8 grid gap-5">
            {erro && <p className="rounded-2xl bg-red-400/10 p-4 text-red-200">{erro}</p>}

            <label className="grid gap-2">
              <span className="font-semibold">Barbeiro</span>
              <select value={barbeiroId} onChange={(evento) => setBarbeiroId(evento.target.value)} className="campo">
                {barbeirosDemo.map((barbeiro) => (
                  <option key={barbeiro.id} value={barbeiro.id}>
                    {barbeiro.nome}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">Serviço</span>
              <select value={servicoId} onChange={(evento) => setServicoId(evento.target.value)} className="campo">
                {servicosDemo.map((servico) => (
                  <option key={servico.id} value={servico.id}>
                    {servico.nome} — {servico.duracaoMinutos} min
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">Data</span>
              <input type="date" value={data} onChange={(evento) => setData(evento.target.value)} className="campo" />
            </label>

            <fieldset className="grid gap-3">
              <legend className="font-semibold">Horário</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {horarios.map((item) => (
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

            <label className="grid gap-2">
              <span className="font-semibold">Nome</span>
              <input value={nome} onChange={(evento) => setNome(evento.target.value)} className="campo" />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">Telefone</span>
              <input value={telefone} onChange={(evento) => setTelefone(evento.target.value)} className="campo" />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">E-mail opcional para convite do Google Calendar</span>
              <input type="email" value={email} onChange={(evento) => setEmail(evento.target.value)} className="campo" />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold">Observação</span>
              <textarea value={observacao} onChange={(evento) => setObservacao(evento.target.value)} className="campo min-h-28" />
            </label>

            <button type="submit" className="rounded-full bg-amber-300 px-6 py-3 font-bold text-zinc-950">
              Solicitar agendamento
            </button>
          </form>
        )}
      </div>

      <CardResumoAgendamento barbeiro={barbeiroSelecionado} servico={servicoSelecionado} horario={horario} />
    </section>
  );
}
