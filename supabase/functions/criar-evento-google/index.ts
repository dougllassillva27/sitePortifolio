import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

interface CorpoEventoGoogle {
  titulo: string;
  descricao: string;
  inicio: string;
  fim: string;
  emailCliente?: string;
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

  const corpo = (await req.json()) as CorpoEventoGoogle;

  if (!corpo.titulo || !corpo.inicio || !corpo.fim) {
    return responderJson({ erro: 'Titulo, inicio e fim sao obrigatorios.' }, 400);
  }

  const googleConfigurado = Boolean(
    Deno.env.get('GOOGLE_CLIENT_ID') &&
    Deno.env.get('GOOGLE_CLIENT_SECRET') &&
    Deno.env.get('GOOGLE_REFRESH_TOKEN') &&
    Deno.env.get('GOOGLE_CALENDAR_ID'),
  );

  if (!googleConfigurado) {
    return responderJson({
      modo: 'simulado',
      googleEventId: `evento-demo-${Date.now()}`,
      mensagem: 'Google Calendar nao configurado. Evento simulado para desenvolvimento.',
    });
  }

  return responderJson({
    modo: 'pendente_integracao',
    googleEventId: `evento-configurado-${Date.now()}`,
    mensagem: 'Credenciais detectadas. Implementar chamada OAuth Google Calendar neste ponto.',
  });
});
