# BarberFlow — Regras de Negócio

## Agendamento público

1. Cliente escolhe barbeiro.
2. Cliente escolhe serviço.
3. Cliente escolhe data.
4. Sistema lista horários disponíveis.
5. Cliente informa nome, telefone, e-mail opcional e observação opcional.
6. Sistema cria agendamento com status pendente.
7. Sistema gera token_cliente para ações futuras do cliente.
8. Sistema mostra confirmação visual.
9. Sistema gera link manual de WhatsApp.

## Disponibilidade

Um horário só está disponível quando:

- está dentro do expediente;
- não está em feriado;
- não está em bloqueio manual;
- não conflita com agendamento confirmado;
- não conflita com agendamento pendente ainda válido;
- respeita a duração do serviço escolhido.

## Duração dos serviços

Cada serviço possui duracao_minutos.

Exemplo:
- Corte: 30 minutos.
- Barba: 20 minutos.
- Corte + barba: 50 minutos.
- Sobrancelha: 15 minutos.

Não existe intervalo extra entre serviços no MVP.

## Aceite pelo admin

Ao aceitar um agendamento:

1. Revalidar conflito no banco.
2. Revalidar bloqueio/feriado.
3. Criar evento no Google Calendar.
4. Salvar google_event_id.
5. Alterar status para confirmado.
6. Gerar link WhatsApp manual de confirmação.

Se o Google Calendar falhar, o sistema não deve confirmar silenciosamente.

## Cancelamento pelo cliente

1. Cliente acessa página com token.
2. Sistema valida token.
3. Sistema verifica se o agendamento ainda pode ser cancelado.
4. Sistema muda status para cancelado_pelo_cliente.
5. Sistema registra motivo, se informado.

## Remarcação pelo cliente

1. Cliente acessa página com token.
2. Sistema valida token.
3. Cliente escolhe nova data e horário.
4. Sistema revalida disponibilidade.
5. Sistema muda status para remarcacao_solicitada ou remarcado.
6. Admin revisa quando necessário.

## Encaixe admin

O encaixe é criado manualmente pelo admin.

Regras:
- pode ser criado mesmo se não veio do fluxo público;
- precisa informar cliente, barbeiro, serviço, data e horário;
- deve respeitar conflitos, salvo override futuro fora do MVP.

## Bloqueios

Tipos de bloqueio:
- feriado;
- folga;
- bloqueio_manual;
- manutencao;
- outro.

Bloqueios impedem novos agendamentos no período.

## WhatsApp manual

O MVP não envia mensagens automaticamente.

O sistema apenas gera links no formato:

https://wa.me/55TELEFONE?text=MENSAGEM_CODIFICADA

## Google Calendar

Evento no Google Calendar só é criado quando o admin aceita o agendamento.

Se o cliente informou e-mail:
- adicionar como attendee.

Se o cliente não informou e-mail:
- criar evento apenas na agenda da barbearia/teste.

## Segurança

- Cliente não possui login.
- Cliente usa token_cliente.
- Admin usa autenticação Supabase.
- Dados administrativos não podem ser expostos publicamente.
- RLS deve ficar ativa.
