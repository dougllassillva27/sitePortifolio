import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

interface CorpoCancelamento {
  tokenCliente: string;
  motivo?: string;
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

  const corpo = (await req.json()) as CorpoCancelamento;

  if (!corpo.tokenCliente) {
    return responderJson({ erro: 'tokenCliente obrigatorio.' }, 400);
  }

  return responderJson({
    tokenCliente: corpo.tokenCliente,
    status: 'cancelado_pelo_cliente',
    motivo: corpo.motivo ?? null,
  });
});
