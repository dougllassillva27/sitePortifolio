alter table barbeiros enable row level security;
alter table servicos enable row level security;
alter table clientes enable row level security;
alter table agendamentos enable row level security;
alter table bloqueios_agenda enable row level security;
alter table notificacoes enable row level security;
alter table backups enable row level security;

drop policy if exists "publico le barbeiros ativos" on barbeiros;
create policy "publico le barbeiros ativos"
on barbeiros
for select
using (ativo = true);

drop policy if exists "publico le servicos ativos" on servicos;
create policy "publico le servicos ativos"
on servicos
for select
using (ativo = true);

drop policy if exists "publico cria clientes" on clientes;
create policy "publico cria clientes"
on clientes
for insert
with check (true);

drop policy if exists "publico cria agendamentos pendentes" on agendamentos;
create policy "publico cria agendamentos pendentes"
on agendamentos
for insert
with check (status = 'pendente');

drop policy if exists "admin gerencia barbeiros" on barbeiros;
create policy "admin gerencia barbeiros"
on barbeiros
for all
to authenticated
using (true)
with check (true);

drop policy if exists "admin gerencia servicos" on servicos;
create policy "admin gerencia servicos"
on servicos
for all
to authenticated
using (true)
with check (true);

drop policy if exists "admin gerencia clientes" on clientes;
create policy "admin gerencia clientes"
on clientes
for all
to authenticated
using (true)
with check (true);

drop policy if exists "admin gerencia agendamentos" on agendamentos;
create policy "admin gerencia agendamentos"
on agendamentos
for all
to authenticated
using (true)
with check (true);

drop policy if exists "admin gerencia bloqueios" on bloqueios_agenda;
create policy "admin gerencia bloqueios"
on bloqueios_agenda
for all
to authenticated
using (true)
with check (true);

drop policy if exists "admin gerencia notificacoes" on notificacoes;
create policy "admin gerencia notificacoes"
on notificacoes
for all
to authenticated
using (true)
with check (true);

drop policy if exists "admin gerencia backups" on backups;
create policy "admin gerencia backups"
on backups
for all
to authenticated
using (true)
with check (true);
