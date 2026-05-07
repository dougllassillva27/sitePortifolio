create extension if not exists pgcrypto;

do $$ begin
  create type status_agendamento as enum (
    'pendente',
    'confirmado',
    'cancelado_pelo_cliente',
    'cancelado_pelo_admin',
    'remarcacao_solicitada',
    'remarcado',
    'concluido',
    'nao_compareceu'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type tipo_bloqueio_agenda as enum (
    'feriado',
    'folga',
    'bloqueio_manual',
    'manutencao',
    'outro'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists barbeiros (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  apelido text not null,
  foto_url text,
  descricao text not null default '',
  ativo boolean not null default true,
  google_calendar_id text,
  criado_em timestamptz not null default now()
);

create table if not exists servicos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text not null default '',
  preco_centavos integer not null check (preco_centavos >= 0),
  duracao_minutos integer not null check (duracao_minutos > 0),
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  email text,
  criado_em timestamptz not null default now()
);

create table if not exists agendamentos (
  id uuid primary key default gen_random_uuid(),
  barbeiro_id uuid not null references barbeiros(id) on delete restrict,
  servico_id uuid not null references servicos(id) on delete restrict,
  cliente_id uuid not null references clientes(id) on delete restrict,
  inicio timestamptz not null,
  fim timestamptz not null,
  status status_agendamento not null default 'pendente',
  observacao text,
  motivo_cancelamento text,
  google_event_id text,
  token_cliente uuid not null default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint agendamento_periodo_valido check (fim > inicio)
);

create unique index if not exists agendamentos_token_cliente_idx
  on agendamentos(token_cliente);

create index if not exists agendamentos_barbeiro_inicio_fim_idx
  on agendamentos(barbeiro_id, inicio, fim);

create table if not exists bloqueios_agenda (
  id uuid primary key default gen_random_uuid(),
  barbeiro_id uuid not null references barbeiros(id) on delete cascade,
  inicio timestamptz not null,
  fim timestamptz not null,
  motivo text not null,
  tipo tipo_bloqueio_agenda not null default 'bloqueio_manual',
  criado_em timestamptz not null default now(),
  constraint bloqueio_periodo_valido check (fim > inicio)
);

create table if not exists notificacoes (
  id uuid primary key default gen_random_uuid(),
  agendamento_id uuid references agendamentos(id) on delete cascade,
  tipo text not null,
  canal text not null,
  status text not null default 'pendente',
  mensagem text,
  erro text,
  criado_em timestamptz not null default now()
);

create table if not exists backups (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  status text not null default 'pendente',
  arquivo_url text,
  erro text,
  criado_em timestamptz not null default now()
);

insert into barbeiros (nome, apelido, foto_url, descricao, google_calendar_id)
values
  ('Douglas Silva', 'Doug', '/favicon.svg', 'Especialista em cortes clássicos, degradê limpo e acabamento detalhado.', 'primary'),
  ('Marcos Oliveira', 'Marcos', '/favicon.svg', 'Foco em barba, corte social e atendimento rápido.', 'primary')
on conflict do nothing;

insert into servicos (nome, descricao, preco_centavos, duracao_minutos)
values
  ('Corte', 'Corte masculino com acabamento na navalha.', 4500, 30),
  ('Barba', 'Barba desenhada com toalha quente e finalização.', 3500, 20),
  ('Corte + Barba', 'Combo completo para sair pronto.', 7500, 50),
  ('Sobrancelha', 'Limpeza e alinhamento rápido.', 2000, 15)
on conflict do nothing;
