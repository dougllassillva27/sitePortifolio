from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Configuracoes(BaseSettings):
    database_url: str = ""
    admin_token: str = "troque-este-token"
    origens_cors: str = "http://localhost:4173,http://localhost:8000,http://127.0.0.1:4173"

    google_client_id: str = ""
    google_client_secret: str = ""
    google_refresh_token: str = ""
    google_calendar_id: str = "primary"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def lista_origens_cors(self) -> list[str]:
        return [origem.strip() for origem in self.origens_cors.split(",") if origem.strip()]

    @property
    def google_configurado(self) -> bool:
        return all(
            [
                self.google_client_id,
                self.google_client_secret,
                self.google_refresh_token,
                self.google_calendar_id,
            ]
        )


@lru_cache
def obter_configuracoes() -> Configuracoes:
    return Configuracoes()
