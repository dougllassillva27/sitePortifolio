# BarberFlow Neon — Escopo MVP

## Objetivo

Criar um sistema de agendamentos para barbearia usando stack simples:

- HTML
- CSS
- JavaScript
- Python quando necessário
- Neon Postgres como banco
- Netlify para frontend
- Render para API Python

## Decisão técnica

O Neon é PostgreSQL. A conexão com o banco precisa ficar no backend, nunca no navegador.

Fluxo correto:

```text
Cliente -> Frontend HTML/CSS/JS -> API Python/FastAPI -> Neon Postgres
```

## Escopo incluso

- 2 barbeiros.
- Cliente escolhe o barbeiro.
- Cliente escolhe serviço, data e horário.
- Cada serviço possui preço e duração própria.
- Agendamento nasce como pendente.
- Admin aceita, cancela, edita status, conclui e cria encaixe.
- Cliente pode cancelar com token.
- Cliente pode remarcar com token.
- Feriados e bloqueios impedem agendamento.
- Google Calendar no aceite, com modo simulado se credenciais não existirem.
- WhatsApp manual por link pré-preenchido.
- Backup lógico via endpoint admin.
- Admin único com token simples no MVP.

## Fora do MVP

- Supabase.
- React.
- Pagamento online.
- WhatsApp automático real.
- Multiempresa.
- Múltiplas unidades.
- App mobile.
- Login completo com sessão/JWT.
- LGPD formal completa.
- Dashboard financeiro.
- Comissão de barbeiros.

## Campos do cliente

- Nome: obrigatório.
- Telefone: obrigatório.
- E-mail: opcional.
- Observação: opcional.

## Status

- pendente
- confirmado
- cancelado_pelo_cliente
- cancelado_pelo_admin
- remarcacao_solicitada
- remarcado
- concluido
- nao_compareceu

## Critério de pronto

- Frontend abre.
- API responde saúde.
- Schema cria tabelas no Neon.
- Cliente cria agendamento pendente.
- Admin lista agendamentos.
- Admin confirma agendamento.
- Cliente cancela por token.
- Cliente remarca por token.
- Disponibilidade respeita duração, bloqueios e agendamentos.
- Backup lógico retorna dados.
- Testes passam.
- Build passa.
