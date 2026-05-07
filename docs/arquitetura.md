# BarberFlow Neon — Arquitetura

## Stack

Frontend:

- HTML.
- CSS.
- JavaScript puro.

Backend:

- Python.
- FastAPI.
- Psycopg 3.
- Uvicorn.

Banco:

- Neon Postgres.

Hospedagem:

- Netlify para frontend.
- Render para backend Python.

Agenda:

- Google Calendar API no backend.
- Modo simulado quando credenciais não existem.

WhatsApp:

- Link manual pré-preenchido.

## Motivo da arquitetura

Neon é um banco PostgreSQL. A string de conexão é segredo e não pode ficar no frontend.

Por isso:

```text
frontend -> backend Python -> Neon
```

## Variáveis do backend

```text
DATABASE_URL=
ADMIN_TOKEN=
ORIGENS_CORS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=
```

## Variáveis do frontend

O frontend estático usa:

```text
window.BARBERFLOW_CONFIG = {
  API_BASE_URL: "http://localhost:8000"
}
```

Em produção, editar `frontend/config.js` para apontar para a URL do Render.

## Deploy local

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python scripts/aplicar_migracoes.py
uvicorn app.main:app --reload
```

Frontend:

```bash
npm install
npm run dev
```

## Deploy produção

Frontend:

- Netlify.
- Comando: `npm run build`.
- Pasta: `dist`.

Backend:

- Render Web Service.
- Build: `pip install -r backend/requirements.txt`.
- Start: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

Banco:

- Neon.
- Aplicar `database/migrations/001_schema_inicial.sql`.

## Segurança

- `DATABASE_URL` só no backend.
- `ADMIN_TOKEN` só no backend.
- Frontend nunca conecta direto no Neon.
- CORS configurável por `ORIGENS_CORS`.
