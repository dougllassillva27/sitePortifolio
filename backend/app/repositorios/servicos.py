from app.conexao import obter_conexao


def listar_servicos() -> list[dict]:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                select id::text, nome, descricao, preco_centavos, duracao_minutos, ativo
                from servicos
                where ativo = true
                order by preco_centavos
                '''
            )
            return list(cursor.fetchall())


def obter_servico(servico_id: str) -> dict | None:
    with obter_conexao() as conexao:
        with conexao.cursor() as cursor:
            cursor.execute(
                '''
                select id::text, nome, descricao, preco_centavos, duracao_minutos, ativo
                from servicos
                where id = %s
                ''',
                (servico_id,),
            )
            return cursor.fetchone()
