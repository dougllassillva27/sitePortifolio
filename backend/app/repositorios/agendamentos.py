from datetime import datetime

from app.conexao import obter_conexao


def criar_cliente(nome: str, telefone: str, email: str | None) -> dict:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                insert into clientes (nome, telefone, email)
                values (%s, %s, %s)
                returning id::text, nome, telefone, email
                ''',
                (nome, telefone, email),
            )
            cliente = cursor.fetchone()
        conexao.commit()
        return cliente


def criar_agendamento(
    barbeiro_id: str,
    servico_id: str,
    cliente_id: str,
    inicio: datetime,
    fim: datetime,
    observacao: str | None,
) -> dict:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                insert into agendamentos (
                  barbeiro_id,
                  servico_id,
                  cliente_id,
                  inicio,
                  fim,
                  status,
                  observacao
                )
                values (%s, %s, %s, %s, %s, 'pendente', %s)
                returning id::text, inicio, fim, status, token_cliente::text, criado_em
                ''',
                (barbeiro_id, servico_id, cliente_id, inicio, fim, observacao),
            )
            agendamento = cursor.fetchone()
        conexao.commit()
        return agendamento


def listar_agendamentos_admin() -> list[dict]:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                select
                  a.id::text,
                  a.inicio,
                  a.fim,
                  a.status,
                  a.observacao,
                  a.google_event_id,
                  a.token_cliente::text,
                  c.nome as cliente_nome,
                  c.telefone as cliente_telefone,
                  c.email as cliente_email,
                  b.nome as barbeiro_nome,
                  s.nome as servico_nome,
                  s.duracao_minutos
                from agendamentos a
                join clientes c on c.id = a.cliente_id
                join barbeiros b on b.id = a.barbeiro_id
                join servicos s on s.id = a.servico_id
                order by a.inicio desc
                limit 100
                '''
            )
            return list(cursor.fetchall())


def obter_agendamento_por_token(token_cliente: str) -> dict | None:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                select
                  a.id::text,
                  a.barbeiro_id::text,
                  a.servico_id::text,
                  a.cliente_id::text,
                  a.inicio,
                  a.fim,
                  a.status,
                  a.token_cliente::text,
                  c.nome as cliente_nome,
                  c.telefone as cliente_telefone,
                  c.email as cliente_email
                from agendamentos a
                join clientes c on c.id = a.cliente_id
                where a.token_cliente = %s
                ''',
                (token_cliente,),
            )
            return cursor.fetchone()


def atualizar_status(agendamento_id: str, status: str, google_event_id: str | None = None) -> dict:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                update agendamentos
                set
                  status = %s,
                  google_event_id = coalesce(%s, google_event_id),
                  atualizado_em = now()
                where id = %s
                returning id::text, status, google_event_id
                ''',
                (status, google_event_id, agendamento_id),
            )
            agendamento = cursor.fetchone()
        conexao.commit()

    if not agendamento:
        raise ValueError("Agendamento não encontrado.")

    return agendamento


def cancelar_por_token(token_cliente: str, motivo: str | None) -> dict:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                update agendamentos
                set
                  status = 'cancelado_pelo_cliente',
                  motivo_cancelamento = %s,
                  atualizado_em = now()
                where token_cliente = %s
                returning id::text, status, token_cliente::text
                ''',
                (motivo, token_cliente),
            )
            agendamento = cursor.fetchone()
        conexao.commit()

    if not agendamento:
        raise ValueError("Token inválido.")

    return agendamento


def remarcar_por_token(token_cliente: str, novo_inicio: datetime, novo_fim: datetime) -> dict:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                update agendamentos
                set
                  inicio = %s,
                  fim = %s,
                  status = 'remarcado',
                  atualizado_em = now()
                where token_cliente = %s
                returning id::text, inicio, fim, status, token_cliente::text
                ''',
                (novo_inicio, novo_fim, token_cliente),
            )
            agendamento = cursor.fetchone()
        conexao.commit()

    if not agendamento:
        raise ValueError("Token inválido.")

    return agendamento


def existe_conflito(barbeiro_id: str, inicio: datetime, fim: datetime, ignorar_agendamento_id: str | None = None) -> bool:
    parametros = [barbeiro_id, inicio, fim]
    filtro_ignorar = ""

    if ignorar_agendamento_id:
        filtro_ignorar = "and id <> %s"
        parametros.append(ignorar_agendamento_id)

    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                f'''
                select exists (
                  select 1
                  from agendamentos
                  where barbeiro_id = %s
                    and status in ('pendente', 'confirmado', 'remarcado')
                    and inicio < %s
                    and fim > %s
                    {filtro_ignorar}
                ) as conflito
                ''',
                tuple(parametros),
            )
            linha = cursor.fetchone()
            return bool(linha["conflito"])


def existe_bloqueio(barbeiro_id: str, inicio: datetime, fim: datetime) -> bool:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                select exists (
                  select 1
                  from bloqueios_agenda
                  where barbeiro_id = %s
                    and inicio < %s
                    and fim > %s
                ) as bloqueio
                ''',
                (barbeiro_id, fim, inicio),
            )
            linha = cursor.fetchone()
            return bool(linha["bloqueio"])
