from datetime import datetime, time, timedelta
from zoneinfo import ZoneInfo

FUSO_PADRAO = ZoneInfo("America/Sao_Paulo")


def interpretar_data_hora(valor: str) -> datetime:
    texto = valor.strip()

    if texto.endswith("Z"):
        texto = texto.replace("Z", "+00:00")

    data = datetime.fromisoformat(texto)

    if data.tzinfo is None:
        data = data.replace(tzinfo=FUSO_PADRAO)

    return data.astimezone(FUSO_PADRAO)


def somar_minutos(data: datetime, minutos: int) -> datetime:
    return data + timedelta(minutes=minutos)


def domingo(data: datetime) -> bool:
    return data.weekday() == 6


def dentro_do_expediente(data: datetime) -> bool:
    hora = data.timetz().replace(tzinfo=None)
    return time(9, 0) <= hora <= time(17, 30)


def gerar_horarios_dia(data_base: datetime, passo_minutos: int = 30) -> list[datetime]:
    inicio = data_base.replace(hour=9, minute=0, second=0, microsecond=0)
    fim = data_base.replace(hour=18, minute=0, second=0, microsecond=0)

    horarios: list[datetime] = []
    cursor = inicio

    while cursor < fim:
        horarios.append(cursor)
        cursor += timedelta(minutes=passo_minutos)

    return horarios
