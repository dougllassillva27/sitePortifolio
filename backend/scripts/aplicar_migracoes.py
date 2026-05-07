from pathlib import Path
import sys

from dotenv import load_dotenv
import psycopg

load_dotenv()

ROOT = Path(__file__).resolve().parents[2]
MIGRACOES = ROOT / "database" / "migrations"


def obter_database_url() -> str:
    import os

    database_url = os.getenv("DATABASE_URL", "").strip()

    if not database_url:
        print("DATABASE_URL não configurada no backend/.env ou ambiente.", file=sys.stderr)
        sys.exit(1)

    return database_url


def aplicar() -> None:
    database_url = obter_database_url()
    arquivos = sorted(MIGRACOES.glob("*.sql"))

    if not arquivos:
        print("Nenhuma migration encontrada.")
        return

    with psycopg.connect(database_url) as conexao:
        with conexao.cursor() as cursor:
            for arquivo in arquivos:
                print(f"Aplicando {arquivo.name}...")
                cursor.execute(arquivo.read_text(encoding="utf-8"))
        conexao.commit()

    print("Migrations aplicadas com sucesso.")


if __name__ == "__main__":
    aplicar()
