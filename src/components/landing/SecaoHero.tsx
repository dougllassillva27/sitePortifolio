import { Link } from 'react-router-dom';

export function SecaoHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,199,107,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm text-amber-200">
            Sistema de agendamentos para barbearias
          </p>

          <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white md:text-7xl">
            Agenda organizada. Cliente marcado. Barbeiro no controle.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Portfólio BarberFlow com escolha de barbeiro, serviços com duração,
            status pendente, painel admin, Google Calendar e WhatsApp manual.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/agendar"
              className="rounded-full bg-amber-300 px-6 py-3 text-center font-bold text-zinc-950 transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Agendar horário
            </Link>
            <Link
              to="/admin/login"
              className="rounded-full border border-white/15 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Acessar painel
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="rounded-[1.5rem] bg-zinc-900 p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Agenda de hoje</span>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                ao vivo
              </span>
            </div>

            {['09:00 — Corte', '10:30 — Corte + barba', '14:00 — Barba'].map((item) => (
              <div key={item} className="mb-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-zinc-400">Status pendente aguardando aceite</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
