import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

interface CorpoDisponibilidade {
  barbeiroId: string;
  servicoId: string;
  data: string;
  duracaoMinutos: number;
}

function responderJson(corpo: unknown, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'authorization, x-client-info, apikey, content-type',
    },
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return responderJson({});
  }

  if (req.method !== 'POST') {
    return responderJson({ erro: 'Metodo nao permitido.' }, 405);
  }

  const corpo = (await req.json()) as CorpoDisponibilidade;

  if (!corpo.barbeiroId || !corpo.servicoId || !corpo.data || !corpo.duracaoMinutos) {
    return responderJson({ erro: 'Dados obrigatorios ausentes.' }, 400);
  }

  const inicio = new Date(`${corpo.data}T09:00:00`);
  const horarios: string[] = [];

  for (let indice = 0; indice < 18; indice += 1) {
    horarios.push(inicio.toISOString());
    inicio.setMinutes(inicio.getMinutes() + 30);
  }

  return responderJson({
    barbeiroId: corpo.barbeiroId,
    servicoId: corpo.servicoId,
    duracaoMinutos: corpo.duracaoMinutos,
    horarios,
  });
});
