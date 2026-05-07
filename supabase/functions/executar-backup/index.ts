import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

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

  return responderJson({
    tipo: 'backup_logico',
    status: 'registrado',
    criadoEm: new Date().toISOString(),
    mensagem: 'Funcao base de backup criada. Implementar exportacao real do Supabase na evolucao.',
  });
});
