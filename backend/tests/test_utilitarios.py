from app.util.telefone import limpar_telefone, normalizar_telefone_brasil, telefone_basico_valido
from app.util.whatsapp import criar_link_whatsapp


def test_limpar_telefone():
    assert limpar_telefone("(51) 99999-9999") == "51999999999"


def test_normalizar_telefone_brasil():
    assert normalizar_telefone_brasil("51999999999") == "5551999999999"


def test_telefone_basico_valido():
    assert telefone_basico_valido("(51) 99999-9999")


def test_criar_link_whatsapp():
    link = criar_link_whatsapp("(51) 99999-9999", "Olá teste")
    assert link.startswith("https://wa.me/5551999999999")
    assert "Ol%C3%A1" in link
