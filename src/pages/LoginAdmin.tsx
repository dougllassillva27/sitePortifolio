import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, supabaseConfigurado } from '../services/supabase';

export function LoginAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function entrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro('');

    if (!supabaseConfigurado) {
      navigate('/admin');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
      return;
    }

    navigate('/admin');
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-4xl font-black">Admin</h1>
      <p className="mt-3 text-zinc-400">Acesso único do estabelecimento.</p>

      <form onSubmit={entrar} className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        {erro && <p className="rounded-2xl bg-red-400/10 p-4 text-red-200">{erro}</p>}

        <label className="grid gap-2">
          <span className="font-semibold">E-mail</span>
          <input type="email" value={email} onChange={(evento) => setEmail(evento.target.value)} className="campo" />
        </label>

        <label className="grid gap-2">
          <span className="font-semibold">Senha</span>
          <input type="password" value={senha} onChange={(evento) => setSenha(evento.target.value)} className="campo" />
        </label>

        <button type="submit" className="rounded-full bg-amber-300 px-6 py-3 font-bold text-zinc-950">
          Entrar
        </button>
      </form>
    </section>
  );
}
