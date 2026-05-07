from contextlib import contextmanager
from typing import Iterator

from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

from app.configuracoes import obter_configuracoes

_pool: ConnectionPool | None = None


def obter_pool() -> ConnectionPool:
    global _pool

    if _pool is not None:
        return _pool

    configuracoes = obter_configuracoes()

    if not configuracoes.database_url:
        raise RuntimeError("DATABASE_URL não configurada. Configure o Neon no arquivo .env do backend.")

    _pool = ConnectionPool(
        conninfo=configuracoes.database_url,
        min_size=1,
        max_size=5,
        kwargs={"row_factory": dict_row},
        open=True,
    )

    return _pool


@contextmanager
def obter_conexao() -> Iterator:
    pool = obter_pool()

    with pool.connection() as conexao:
        yield conexao
