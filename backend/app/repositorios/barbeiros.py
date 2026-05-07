from app.conexao import obter_conexao


def listar_barbeiros() -> list[dict]:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                select id::text, nome, apelido, foto_url, descricao, ativo, google_calendar_id
                from barbeiros
                where ativo = true
                order by nome
                '''
            )
            return list(cursor.fetchall())
