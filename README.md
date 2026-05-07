# BarberFlow

Sistema de agendamentos para barbearias usado como projeto de portfólio.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Supabase
- Netlify
- Google Calendar API

## Instalação

```bash
npm install
```

## Rodar local

```bash
npm run dev
```

## Testes

```bash
npm run test
```

## Build

```bash
npm run build
```

O build executa o versionador de assets automaticamente.

## Variáveis

Crie um arquivo `.env` baseado em `.env.example`.

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Escopo MVP

- 2 barbeiros.
- Cliente escolhe barbeiro.
- Serviços com preço e duração.
- Agendamento pendente.
- Admin aceita/cancela/conclui.
- Cliente cancela/remarca por token.
- WhatsApp manual.
- Google Calendar ao aceitar.
- Backup documentado.

## Deploy

Frontend:
- Netlify

Banco/funções:
- Supabase
