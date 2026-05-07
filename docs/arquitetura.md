# BarberFlow — Arquitetura

## Stack

Frontend:
- React
- Vite
- TypeScript
- Tailwind CSS

Hospedagem:
- Netlify

Banco, auth e funções:
- Supabase Postgres
- Supabase Auth
- Supabase RLS
- Supabase Realtime
- Supabase Edge Functions

Agenda:
- Google Calendar API

WhatsApp:
- Link manual pré-preenchido no MVP.

## Camadas

### Frontend

Responsável por:
- landing page;
- fluxo público de agendamento;
- cancelamento por token;
- remarcação por token;
- login admin;
- painel admin;
- geração de links WhatsApp;
- consumo das edge functions.

### Supabase Database

Responsável por:
- barbeiros;
- serviços;
- clientes;
- agendamentos;
- bloqueios;
- notificações;
- backups.

### Supabase Auth

Responsável por:
- login do admin único.

### Supabase RLS

Responsável por:
- impedir leitura pública indevida;
- permitir criação pública controlada;
- liberar operação administrativa apenas para usuário autenticado.

### Supabase Edge Functions

Responsáveis por:
- verificar disponibilidade;
- aceitar agendamento;
- criar evento Google;
- cancelar agendamento;
- remarcar agendamento;
- executar backup.

### Google Calendar

Responsável por:
- receber evento quando admin aceita agendamento;
- incluir cliente como convidado quando e-mail existir.

## Deploy

Frontend:
- Netlify
- comando: npm run build
- pasta publicada: dist

Banco/funções:
- Supabase

## Variáveis de ambiente

Frontend:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Edge Functions:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REFRESH_TOKEN
- GOOGLE_CALENDAR_ID
- SUPABASE_SERVICE_ROLE_KEY

## Versionamento de assets

O build deve usar:

vite build && node versionamento/versionador.js

Não adicionar ?v= manualmente no código.

## Backup

Estratégia inicial:
- documentar exportação lógica do Supabase;
- criar função executar-backup como base;
- manter recuperação documentada.

## Riscos

- Google OAuth exige configuração correta.
- Convite Google exige e-mail do cliente.
- WhatsApp automático real exige WhatsApp Business Platform e fica fora do MVP.
- RLS mal configurada pode expor dados.
- Conflito de agenda precisa ser revalidado no aceite.
