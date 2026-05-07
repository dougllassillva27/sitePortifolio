from urllib.parse import quote

from app.util.telefone import normalizar_telefone_brasil


def criar_link_whatsapp(telefone: str, mensagem: str) -> str:
    telefone_normalizado = normalizar_telefone_brasil(telefone)
    return f"https://wa.me/{telefone_normalizado}?text={quote(mensagem)}"
