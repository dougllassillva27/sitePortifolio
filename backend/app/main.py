from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.configuracoes import obter_configuracoes
from app.rotas.admin import roteador as roteador_admin
from app.rotas.publicas import roteador as roteador_publico

configuracoes = obter_configuracoes()

app = FastAPI(
    title="BarberFlow Neon API",
    version="0.1.0",
    description="API Python/FastAPI para BarberFlow usando Neon Postgres.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=configuracoes.lista_origens_cors or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roteador_publico)
app.include_router(roteador_admin)


@app.get("/saude")
def saude():
    return {
        "status": "online",
        "banco": "neon",
        "api": "fastapi",
    }
