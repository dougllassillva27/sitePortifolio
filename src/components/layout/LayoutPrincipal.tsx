import { Link, NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Início' },
  { to: '/agendar', label: 'Agendar' },
  { to: '/admin/login', label: 'Admin' },
];

export function LayoutPrincipal() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3 font-bold tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-300 text-zinc-950">
              BF
            </span>
            <span>BarberFlow</span>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-4 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300',
                    isActive ? 'bg-amber-300 text-zinc-950' : 'text-zinc-300 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
