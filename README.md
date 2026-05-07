# BarberFlow Neon

Sistema de agendamentos para barbearias usando stack simples:

- HTML
- CSS
- JavaScript
- Python/FastAPI
- Neon Postgres
- Netlify
- Render

## Arquitetura

```text
Frontend estático -> API Python -> Neon Postgres
```

A `DATABASE_URL` do Neon fica somente no backend.

## Rodar frontend

```bash
npm install
npm run dev
```

Abre em:

```text
http://localhost:4173
```

## Rodar backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edite `backend/.env`:

```text
DATABASE_URL=sua_url_do_neon
ADMIN_TOKEN=um-token-forte
```

Aplicar banco:

```bash
python scripts/aplicar_migracoes.py
```

Rodar API:

```bash
uvicorn app.main:app --reload
```

API:

```text
http://localhost:8000
```

## Testes

Frontend:

```bash
npm run test
npm run build
```

Backend:

```bash
cd backend
pytest
```

## Deploy

Frontend:

- Netlify.
- Build: `npm run build`.
- Publish: `dist`.

Backend:

- Render.
- Build: `pip install -r requirements.txt`.
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

## Variáveis Render

```text
DATABASE_URL=
ADMIN_TOKEN=
ORIGENS_CORS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=primary
```

## Observação

Google Calendar funciona em modo simulado enquanto as credenciais não forem configuradas.
