# BarberFlow — Checklist de Testes

## Comandos obrigatórios

```bash
npm run test
npm run build
```

## Testes manuais públicos

- [ ] Página inicial abre.
- [ ] Botão de agendamento funciona.
- [ ] Cliente escolhe barbeiro.
- [ ] Cliente escolhe serviço.
- [ ] Cliente escolhe data.
- [ ] Cliente escolhe horário.
- [ ] Nome obrigatório é validado.
- [ ] Telefone obrigatório é validado.
- [ ] E-mail é opcional.
- [ ] Agendamento é criado como pendente.
- [ ] Link WhatsApp é gerado.

## Testes manuais admin

- [ ] Login admin abre.
- [ ] Painel admin abre.
- [ ] Lista de agendamentos aparece.
- [ ] Admin aceita agendamento.
- [ ] Admin cancela agendamento.
- [ ] Admin conclui agendamento.
- [ ] Admin cria encaixe.
- [ ] Admin visualiza status.

## Testes de regra

- [ ] Serviço de 30 minutos bloqueia 30 minutos.
- [ ] Serviço de 50 minutos bloqueia 50 minutos.
- [ ] Horário ocupado não aparece como livre.
- [ ] Dia bloqueado não permite agendamento.
- [ ] Token inválido não cancela.
- [ ] Token válido cancela apenas o agendamento correto.
- [ ] Remarcação respeita disponibilidade.

## Testes Google Calendar

- [ ] Evento é criado ao aceitar.
- [ ] google_event_id é salvo.
- [ ] Cliente com e-mail entra como convidado.
- [ ] Cliente sem e-mail não bloqueia criação.
- [ ] Falha no Google não confirma silenciosamente.

## Testes UI/A11Y

- [ ] Layout sem scroll horizontal em 375px.
- [ ] Botões possuem foco visível.
- [ ] Inputs possuem label.
- [ ] Contraste confortável.
- [ ] Navegação por teclado funcional.
