# BarberFlow Neon — Regras de Negócio

## Agendamento público

1. Cliente escolhe barbeiro.
2. Cliente escolhe serviço.
3. Cliente escolhe data.
4. Sistema calcula horários disponíveis.
5. Cliente informa nome, telefone, e-mail opcional e observação opcional.
6. Sistema cria cliente.
7. Sistema cria agendamento com status pendente.
8. Sistema gera token_cliente.
9. Sistema retorna links de cancelamento, remarcação e WhatsApp manual.

## Disponibilidade

Um horário está disponível quando:

- está dentro do expediente padrão;
- não está em bloqueio;
- não cruza com agendamento pendente;
- não cruza com agendamento confirmado;
- respeita a duração do serviço.

## Expediente MVP

- Segunda a sábado.
- 09:00 até 18:00.
- Domingo fechado.

## Duração

Cada serviço usa `duracao_minutos`.

Exemplo:

- Corte: 30 minutos.
- Barba: 20 minutos.
- Corte + Barba: 50 minutos.
- Sobrancelha: 15 minutos.

## Aceite admin

Ao confirmar:

1. API revalida disponibilidade.
2. API cria evento Google Calendar se credenciais existirem.
3. Se Google não estiver configurado, API usa modo simulado.
4. API salva `google_event_id`.
5. API muda status para confirmado.
6. API retorna mensagem WhatsApp manual.

## Cancelamento cliente

1. Cliente envia token.
2. API valida token.
3. API muda status para cancelado_pelo_cliente.
4. API registra motivo opcional.

## Remarcação cliente

1. Cliente envia token.
2. Cliente escolhe nova data e horário.
3. API revalida disponibilidade.
4. API atualiza início/fim.
5. API muda status para remarcado.

## Admin

Admin usa `x-admin-token`.

O token fica no backend em variável:

```text
ADMIN_TOKEN=
```

No MVP, o admin digita o token no frontend. O token não fica hardcoded.

## WhatsApp

Não existe envio automático no MVP.

O sistema gera:

```text
https://wa.me/55TELEFONE?text=MENSAGEM
```

## Backup

Endpoint admin retorna dump lógico das tabelas principais em JSON.
