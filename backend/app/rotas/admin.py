from fastapi import APIRouter, Header, HTTPException

from app.configuracoes import obter_configuracoes
from app.integracoes.google_calendar import criar_evento_google
from app.modelos import AlterarStatusEntrada
from app.repositorios import agendamentos as repositorio_agendamentos

roteador = APIRouter(prefix="/api/admin", tags=["admin"])


def validar_admin(x_admin_token: str | None) -> None:
    configuracoes = obter_configuracoes()

    if not x_admin_token or x_admin_token != configuracoes.admin_token:
        raise HTTPException(status_code=401, detail="Token admin inválido.")


@roteador.get("/agendamentos")
def rota_listar_agendamentos(x_admin_token: str | None = Header(default=None)):
    validar_admin(x_admin_token)
    return repositorio_agendamentos.listar_agendamentos_admin()


@roteador.patch("/agendamentos/{agendamento_id}/status")
def rota_alterar_status(
    agendamento_id: str,
    entrada: AlterarStatusEntrada,
    x_admin_token: str | None = Header(default=None),
):
    validar_admin(x_admin_token)

    google_event_id = None

    if entrada.status == "confirmado":
        agendamentos = repositorio_agendamentos.listar_agendamentos_admin()
        agendamento = next((item for item in agendamentos if item["id"] == agendamento_id), None)

        if not agendamento:
            raise HTTPException(status_code=404, detail="Agendamento não encontrado.")

        resultado_google = criar_evento_google(
            titulo=f"BarberFlow — {agendamento['servico_nome']}",
            descricao=f"Cliente: {agendamento['cliente_nome']}\nTelefone: {agendamento['cliente_telefone']}",
            inicio_iso=agendamento["inicio"].isoformat(),
            fim_iso=agendamento["fim"].isoformat(),
            email_cliente=agendamento["cliente_email"],
        )

        if resultado_google["modo"] == "erro":
            raise HTTPException(status_code=502, detail=resultado_google["mensagem"])

        google_event_id = resultado_google["google_event_id"]

    try:
        return repositorio_agendamentos.atualizar_status(agendamento_id, entrada.status, google_event_id)
    except ValueError as erro:
        raise HTTPException(status_code=404, detail=str(erro)) from erro


@roteador.post("/backup")
def rota_backup(x_admin_token: str | None = Header(default=None)):
    validar_admin(x_admin_token)

    return {
        "tipo": "backup_logico",
        "agendamentos": repositorio_agendamentos.listar_agendamentos_admin(),
    }
