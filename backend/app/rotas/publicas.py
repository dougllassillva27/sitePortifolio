from fastapi import APIRouter, HTTPException, Query

from app.modelos import CancelarAgendamentoEntrada, CriarAgendamentoEntrada, RemarcarAgendamentoEntrada
from app.repositorios import agendamentos as repositorio_agendamentos
from app.repositorios.barbeiros import listar_barbeiros
from app.repositorios.servicos import listar_servicos, obter_servico
from app.servicos.disponibilidade import listar_horarios_disponiveis, verificar_periodo_disponivel
from app.util.datas import interpretar_data_hora
from app.util.telefone import telefone_basico_valido
from app.util.whatsapp import criar_link_whatsapp

roteador = APIRouter(prefix="/api", tags=["publico"])


@roteador.get("/barbeiros")
def rota_listar_barbeiros():
    return listar_barbeiros()


@roteador.get("/servicos")
def rota_listar_servicos():
    return listar_servicos()


@roteador.get("/disponibilidade")
def rota_disponibilidade(
    barbeiro_id: str = Query(...),
    servico_id: str = Query(...),
    data: str = Query(...),
):
    return {
        "barbeiro_id": barbeiro_id,
        "servico_id": servico_id,
        "data": data,
        "horarios": listar_horarios_disponiveis(barbeiro_id, servico_id, data),
    }


@roteador.post("/agendamentos")
def rota_criar_agendamento(entrada: CriarAgendamentoEntrada):
    if not telefone_basico_valido(entrada.cliente.telefone):
        raise HTTPException(status_code=400, detail="Telefone inválido.")

    inicio = interpretar_data_hora(entrada.inicio)
    disponivel, fim, motivo = verificar_periodo_disponivel(entrada.barbeiro_id, entrada.servico_id, inicio)

    if not disponivel:
        raise HTTPException(status_code=409, detail=motivo or "Horário indisponível.")

    cliente = repositorio_agendamentos.criar_cliente(
        entrada.cliente.nome,
        entrada.cliente.telefone,
        entrada.cliente.email,
    )

    agendamento = repositorio_agendamentos.criar_agendamento(
        entrada.barbeiro_id,
        entrada.servico_id,
        cliente["id"],
        inicio,
        fim,
        entrada.observacao,
    )

    servico = obter_servico(entrada.servico_id)
    mensagem = (
        f"Olá, {entrada.cliente.nome}! Seu agendamento foi recebido como pendente.\n"
        f"Serviço: {servico['nome'] if servico else 'Serviço'}\n"
        f"Data: {inicio.strftime('%d/%m/%Y %H:%M')}\n"
        f"Token: {agendamento['token_cliente']}"
    )

    agendamento["whatsapp_link"] = criar_link_whatsapp(entrada.cliente.telefone, mensagem)

    return agendamento


@roteador.post("/agendamentos/cancelar")
def rota_cancelar_agendamento(entrada: CancelarAgendamentoEntrada):
    try:
        return repositorio_agendamentos.cancelar_por_token(entrada.token_cliente, entrada.motivo)
    except ValueError as erro:
        raise HTTPException(status_code=404, detail=str(erro)) from erro


@roteador.post("/agendamentos/remarcar")
def rota_remarcar_agendamento(entrada: RemarcarAgendamentoEntrada):
    agendamento = repositorio_agendamentos.obter_agendamento_por_token(entrada.token_cliente)

    if not agendamento:
        raise HTTPException(status_code=404, detail="Token inválido.")

    novo_inicio = interpretar_data_hora(entrada.novo_inicio)
    disponivel, novo_fim, motivo = verificar_periodo_disponivel(
        agendamento["barbeiro_id"],
        agendamento["servico_id"],
        novo_inicio,
        ignorar_agendamento_id=agendamento["id"],
    )

    if not disponivel:
        raise HTTPException(status_code=409, detail=motivo or "Horário indisponível.")

    return repositorio_agendamentos.remarcar_por_token(entrada.token_cliente, novo_inicio, novo_fim)
