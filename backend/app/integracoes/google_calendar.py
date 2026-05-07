from app.configuracoes import obter_configuracoes


def criar_evento_google(
    titulo: str,
    descricao: str,
    inicio_iso: str,
    fim_iso: str,
    email_cliente: str | None = None,
) -> dict:
    configuracoes = obter_configuracoes()

    if not configuracoes.google_configurado:
        return {
            "modo": "simulado",
            "google_event_id": f"evento-simulado-{abs(hash((titulo, inicio_iso, fim_iso))) % 999999999}",
            "mensagem": "Google Calendar não configurado. Evento simulado.",
        }

    try:
        from google.oauth2.credentials import Credentials
        from googleapiclient.discovery import build

        credenciais = Credentials(
            token=None,
            refresh_token=configuracoes.google_refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=configuracoes.google_client_id,
            client_secret=configuracoes.google_client_secret,
            scopes=["https://www.googleapis.com/auth/calendar"],
        )

        servico = build("calendar", "v3", credentials=credenciais)

        evento = {
            "summary": titulo,
            "description": descricao,
            "start": {"dateTime": inicio_iso, "timeZone": "America/Sao_Paulo"},
            "end": {"dateTime": fim_iso, "timeZone": "America/Sao_Paulo"},
        }

        if email_cliente:
            evento["attendees"] = [{"email": email_cliente}]

        criado = servico.events().insert(
            calendarId=configuracoes.google_calendar_id,
            body=evento,
            sendUpdates="all" if email_cliente else "none",
        ).execute()

        return {
            "modo": "real",
            "google_event_id": criado["id"],
            "mensagem": "Evento criado no Google Calendar.",
        }
    except Exception as erro:
        return {
            "modo": "erro",
            "google_event_id": None,
            "mensagem": f"Falha ao criar evento Google: {erro}",
        }
