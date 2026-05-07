import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

interface CorpoAceite {
  agendamentoId: string;
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

  const corpo = (await req.json()) as CorpoAceite;

  if (!corpo.agendamentoId) {
    return responderJson({ erro: 'agendamentoId obrigatorio.' }, 400);
  }

  return responderJson({
    agendamentoId: corpo.agendamentoId,
    status: 'confirmado',
    mensagem: 'Aceite processado em modo base. Integrar validacao, update e Google Calendar.',
  });
});
