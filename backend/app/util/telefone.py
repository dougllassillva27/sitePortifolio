import re


def limpar_telefone(telefone: str) -> str:
    return re.sub(r"\D", "", telefone or "")


def normalizar_telefone_brasil(telefone: str) -> str:
    limpo = limpar_telefone(telefone)

    if limpo.startswith("55"):
        return limpo

    return f"55{limpo}"


def telefone_basico_valido(telefone: str) -> bool:
    limpo = limpar_telefone(telefone)
    return 10 <= len(limpo) <= 13
