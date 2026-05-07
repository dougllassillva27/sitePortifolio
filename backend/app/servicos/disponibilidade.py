from datetime import datetime

from app.repositorios import agendamentos as repositorio_agendamentos
from app.repositorios.servicos import obter_servico
from app.util.datas import domingo, dentro_do_expediente, gerar_horarios_dia, interpretar_data_hora, somar_minutos


def verificar_periodo_disponivel(
    barbeiro_id: str,
    servico_id: str,
    inicio: datetime,
    ignorar_agendamento_id: str | None = None,
) -> tuple[bool, datetime, str | None]:
    servico = obter_servico(servico_id)

    if not servico:
        return False, inicio, "Serviço não encontrado."

    fim = somar_minutos(inicio, int(servico["duracao_minutos"]))

    if domingo(inicio):
        return False, fim, "Domingo fechado."

    if not dentro_do_expediente(inicio):
        return False, fim, "Horário fora do expediente."

    if not dentro_do_expediente(fim):
        return False, fim, "Serviço termina fora do expediente."

    if repositorio_agendamentos.existe_bloqueio(barbeiro_id, inicio, fim):
        return False, fim, "Horário bloqueado."

    if repositorio_agendamentos.existe_conflito(barbeiro_id, inicio, fim, ignorar_agendamento_id):
        return False, fim, "Horário em conflito."

    return True, fim, None


def listar_horarios_disponiveis(barbeiro_id: str, servico_id: str, data: str) -> list[str]:
    data_base = interpretar_data_hora(f"{data}T09:00:00")
    horarios: list[str] = []

    for horario in gerar_horarios_dia(data_base):
        disponivel, _, _ = verificar_periodo_disponivel(barbeiro_id, servico_id, horario)

        if disponivel:
            horarios.append(horario.isoformat())

    return horarios
