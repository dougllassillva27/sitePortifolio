import { Link } from 'react-router-dom';
import { SecaoHero } from '../components/landing/SecaoHero';
import { barbeirosDemo } from '../services/barbeiros';
import { servicosDemo } from '../services/servicos';
import { formatarDinheiro } from '../utils/dinheiro';

export function PaginaInicial() {
  return (
    <>
      <SecaoHero />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Serviços</p>
          <h2 className="mt-2 text-3xl font-black">Escolha o serviço e veja a duração</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {servicosDemo.map((servico) => (
            <article key={servico.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-xl font-bold">{servico.nome}</h3>
              <p className="mt-2 min-h-16 text-sm text-zinc-400">{servico.descricao}</p>
              <p className="mt-4 text-2xl font-black text-amber-300">{formatarDinheiro(servico.precoCentavos)}</p>
              <p className="text-sm text-zinc-400">{servico.duracaoMinutos} minutos</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Barbeiros</p>
          <h2 className="mt-2 text-3xl font-black">Cliente escolhe quem vai atender</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {barbeirosDemo.map((barbeiro) => (
            <article key={barbeiro.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <img src={barbeiro.fotoUrl} alt={`Foto de ${barbeiro.nome}`} className="h-16 w-16 rounded-2xl bg-amber-300 p-2" />
              <h3 className="mt-5 text-2xl font-black">{barbeiro.nome}</h3>
              <p className="mt-2 text-zinc-400">{barbeiro.descricao}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-8 text-center">
          <h2 className="text-3xl font-black">Pronto para marcar?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
            Agendamento entra como pendente. O estabelecimento confirma pelo painel admin.
          </p>
          <Link
            to="/agendar"
            className="mt-6 inline-flex rounded-full bg-amber-300 px-6 py-3 font-bold text-zinc-950"
          >
            Começar agendamento
          </Link>
        </div>
      </section>
    </>
  );
}
