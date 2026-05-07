from pydantic import BaseModel, Field


class ClienteEntrada(BaseModel):
    nome: str = Field(min_length=2)
    telefone: str = Field(min_length=8)
    email: str | None = None


class CriarAgendamentoEntrada(BaseModel):
    barbeiro_id: str
    servico_id: str
    inicio: str
    cliente: ClienteEntrada
    observacao: str | None = None


class CancelarAgendamentoEntrada(BaseModel):
    token_cliente: str
    motivo: str | None = None


class RemarcarAgendamentoEntrada(BaseModel):
    token_cliente: str
    novo_inicio: str


class AlterarStatusEntrada(BaseModel):
    status: str
