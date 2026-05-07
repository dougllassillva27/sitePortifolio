# BarberFlow Neon — Prompt Executor IA

Use este prompt na IDE.

```text
Execute como IA executora do projeto BarberFlow Neon.

Você está autorizado a editar arquivos do workspace.

Não apenas oriente.
Não pergunte qual é a próxima tarefa.
Não pergunte se pode executar.

Leia primeiro:
1. resumo-de-trabalho.md, se existir.
2. graphify-out/GRAPH_REPORT.md, se existir.
3. docs/escopo-mvp.md.
4. docs/regras-de-negocio.md.
5. docs/arquitetura.md.
6. docs/checklist-testes.md.
7. package.json.
8. backend/requirements.txt.
9. database/migrations/.
10. frontend/.

Depois:
1. Detecte a próxima tarefa pendente.
2. Planeje em checklist curto.
3. Edite arquivos.
4. Rode testes.
5. Rode build.
6. Corrija falhas.
7. Reporte resultado.

Stack obrigatória:
- HTML
- CSS
- JavaScript
- Python/FastAPI
- Neon Postgres
- Netlify frontend
- Render backend

Proibido:
- trocar Neon por Supabase;
- criar conexão Neon no navegador;
- deixar DATABASE_URL no frontend;
- usar React sem pedido explícito;
- usar placeholders;
- declarar sucesso sem rodar validação;
- perguntar se deve executar quando já foi autorizado.

Se credenciais externas faltarem:
- use modo local/simulado;
- documente o bloqueio;
- continue o que for possível.

Validação mínima:
- npm run test
- npm run build
- cd backend && pytest
```
