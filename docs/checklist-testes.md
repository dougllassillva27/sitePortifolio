# BarberFlow Neon — Checklist de Testes

## Comandos obrigatórios

Raiz:

```bash
npm run test
npm run build
```

Backend:

```bash
cd backend
pytest
python scripts/aplicar_migracoes.py
```

## Testes manuais

### Frontend

- [ ] Página inicial abre.
- [ ] Serviços aparecem.
- [ ] Barbeiros aparecem.
- [ ] Formulário valida nome.
- [ ] Formulário valida telefone.
- [ ] Formulário carrega horários.
- [ ] Agendamento é enviado.
- [ ] Link WhatsApp é gerado.

### Backend

- [ ] `/saude` responde.
- [ ] `/api/barbeiros` responde.
- [ ] `/api/servicos` responde.
- [ ] `/api/disponibilidade` responde.
- [ ] `POST /api/agendamentos` cria pendente.
- [ ] Admin lista agendamentos com token.
- [ ] Admin confirma agendamento.
- [ ] Cliente cancela com token.
- [ ] Cliente remarca com token.
- [ ] Backup exige admin token.

### Banco

- [ ] Tabelas criadas.
- [ ] Dados iniciais inseridos.
- [ ] Agendamento referencia cliente, serviço e barbeiro.
- [ ] Bloqueio impede disponibilidade.
- [ ] Status inválido é recusado.

### Google Calendar

- [ ] Sem credenciais: modo simulado funciona.
- [ ] Com credenciais: evento real é criado.
- [ ] E-mail opcional do cliente entra como attendee.
