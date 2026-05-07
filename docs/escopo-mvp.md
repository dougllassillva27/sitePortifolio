# BarberFlow — Escopo MVP

## Objetivo

Criar um sistema de agendamentos para barbearia usado como projeto de portfólio.

O projeto deve demonstrar:
- landing page profissional;
- fluxo público de agendamento;
- painel administrativo;
- banco de dados;
- autenticação;
- regras de disponibilidade;
- integração com Google Calendar;
- notificações internas;
- WhatsApp manual por link pré-preenchido;
- backup documentado.

## Posicionamento

BarberFlow é um sistema de agendamentos para barbearias, não uma landing page simples.

## Escopo incluso

- 2 barbeiros.
- Cliente escolhe o barbeiro.
- Cliente escolhe serviço, data e horário.
- Cada serviço possui duração própria.
- Agendamento nasce como pendente.
- Admin aceita, cancela, edita, conclui e cria encaixe.
- Cliente pode cancelar usando token.
- Cliente pode remarcar usando token.
- Serviços possuem preço.
- Admin único.
- Feriados e bloqueios manuais.
- Backup.
- Google Calendar na conta de teste do desenvolvedor.
- WhatsApp manual por link.
- Netlify para frontend.
- Supabase para banco, auth, realtime e edge functions.

## Fora do MVP

- Pagamento online.
- WhatsApp automático real.
- WhatsApp Cloud API.
- Múltiplas barbearias.
- Múltiplas unidades.
- App mobile.
- Exportação CSV/PDF.
- Dashboard financeiro.
- Comissão de barbeiros.
- Mensalidade recorrente.
- Validação forte de telefone.
- LGPD formal completa.

## Campos públicos do cliente

- Nome: obrigatório.
- Telefone: obrigatório.
- E-mail: opcional.
- Observação: opcional.

O e-mail só é necessário caso o cliente queira receber convite formal do Google Calendar.

## Status de agendamento

- pendente
- confirmado
- cancelado_pelo_cliente
- cancelado_pelo_admin
- remarcacao_solicitada
- remarcado
- concluido
- nao_compareceu

## Critério de pronto do MVP

- Cliente consegue criar agendamento pendente.
- Admin consegue aceitar agendamento.
- Admin consegue cancelar agendamento.
- Cliente consegue cancelar com token.
- Cliente consegue solicitar remarcação com token.
- Admin consegue criar encaixe.
- Dia bloqueado impede agenda.
- Serviço bloqueia a duração correta.
- Evento é criado no Google Calendar ao aceitar.
- Link do WhatsApp é gerado com mensagem pronta.
- Build passa.
- Testes mínimos passam.
