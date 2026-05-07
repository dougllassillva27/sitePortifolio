import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

interface CorpoRemarcacao {
  tokenCliente: string;
  novoInicio: string;
  novoFim: string;
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

  const corpo = (await req.json()) as CorpoRemarcacao;

  if (!corpo.tokenCliente || !corpo.novoInicio || !corpo.novoFim) {
    return responderJson({ erro: 'tokenCliente, novoInicio e novoFim sao obrigatorios.' }, 400);
  }

  return responderJson({
    tokenCliente: corpo.tokenCliente,
    status: 'remarcacao_solicitada',
    novoInicio: corpo.novoInicio,
    novoFim: corpo.novoFim,
  });
});
