import { api } from "./api.js";
import { formatarDataHora, formatarDinheiro, formatarHora, hojeCampoData } from "./formatadores.js";
import { criarLinkWhatsApp } from "./whatsapp.js";

const estado = {
  barbeiros: [],
  servicos: [],
  horarioSelecionado: "",
};

const elementos = {
  listaServicos: document.querySelector("#lista-servicos"),
  listaBarbeiros: document.querySelector("#lista-barbeiros"),
  campoBarbeiro: document.querySelector("#campo-barbeiro"),
  campoServico: document.querySelector("#campo-servico"),
  campoData: document.querySelector("#campo-data"),
  listaHorarios: document.querySelector("#lista-horarios"),
  formAgendamento: document.querySelector("#form-agendamento"),
  mensagemAgendamento: document.querySelector("#mensagem-agendamento"),
  resumoBarbeiro: document.querySelector("#resumo-barbeiro"),
  resumoServico: document.querySelector("#resumo-servico"),
  resumoDuracao: document.querySelector("#resumo-duracao"),
  resumoHorario: document.querySelector("#resumo-horario"),
  formCancelar: document.querySelector("#form-cancelar"),
  mensagemCancelar: document.querySelector("#mensagem-cancelar"),
  formRemarcar: document.querySelector("#form-remarcar"),
  mensagemRemarcar: document.querySelector("#mensagem-remarcar"),
  campoAdminToken: document.querySelector("#campo-admin-token"),
  botaoSalvarToken: document.querySelector("#botao-salvar-token"),
  botaoCarregarAdmin: document.querySelector("#botao-carregar-admin"),
  botaoBackup: document.querySelector("#botao-backup"),
  mensagemAdmin: document.querySelector("#mensagem-admin"),
  listaAdmin: document.querySelector("#lista-admin"),
};

function definirMensagem(elemento, mensagem, erro = false) {
  elemento.textContent = mensagem;
  elemento.classList.toggle("erro", erro);
}

function obterServicoSelecionado() {
  return estado.servicos.find((servico) => servico.id === elementos.campoServico.value);
}

function obterBarbeiroSelecionado() {
  return estado.barbeiros.find((barbeiro) => barbeiro.id === elementos.campoBarbeiro.value);
}

function atualizarResumo() {
  const barbeiro = obterBarbeiroSelecionado();
  const servico = obterServicoSelecionado();

  elementos.resumoBarbeiro.textContent = barbeiro?.nome || "Selecione";
  elementos.resumoServico.textContent = servico ? `${servico.nome} — ${formatarDinheiro(servico.preco_centavos)}` : "Selecione";
  elementos.resumoDuracao.textContent = servico ? `${servico.duracao_minutos} minutos` : "Selecione";
  elementos.resumoHorario.textContent = estado.horarioSelecionado ? formatarDataHora(estado.horarioSelecionado) : "Selecione";
}

function renderizarServicos() {
  elementos.listaServicos.innerHTML = estado.servicos
    .map(
      (servico) => `
        <article class="cartao card-item">
          <h3>${servico.nome}</h3>
          <p>${servico.descricao}</p>
          <div class="preco">${formatarDinheiro(servico.preco_centavos)}</div>
          <p>${servico.duracao_minutos} minutos</p>
        </article>
      `,
    )
    .join("");

  elementos.campoServico.innerHTML = estado.servicos
    .map((servico) => `<option value="${servico.id}">${servico.nome} — ${servico.duracao_minutos} min</option>`)
    .join("");
}

function renderizarBarbeiros() {
  elementos.listaBarbeiros.innerHTML = estado.barbeiros
    .map(
      (barbeiro) => `
        <article class="cartao card-item">
          <h3>${barbeiro.nome}</h3>
          <p><strong>${barbeiro.apelido}</strong></p>
          <p>${barbeiro.descricao}</p>
        </article>
      `,
    )
    .join("");

  elementos.campoBarbeiro.innerHTML = estado.barbeiros
    .map((barbeiro) => `<option value="${barbeiro.id}">${barbeiro.nome}</option>`)
    .join("");
}

function renderizarHorarios(horarios) {
  estado.horarioSelecionado = "";

  if (!horarios.length) {
    elementos.listaHorarios.innerHTML = "<p class='mensagem erro'>Nenhum horário disponível para esta data.</p>";
    atualizarResumo();
    return;
  }

  elementos.listaHorarios.innerHTML = horarios
    .map(
      (horario) => `
        <button class="horario" type="button" data-horario="${horario}" aria-pressed="false">
          ${formatarHora(horario)}
        </button>
      `,
    )
    .join("");

  elementos.listaHorarios.querySelectorAll(".horario").forEach((botao) => {
    botao.addEventListener("click", () => {
      estado.horarioSelecionado = botao.dataset.horario;
      elementos.listaHorarios.querySelectorAll(".horario").forEach((item) => item.setAttribute("aria-pressed", "false"));
      botao.setAttribute("aria-pressed", "true");
      atualizarResumo();
    });
  });

  atualizarResumo();
}

async function carregarHorarios() {
  const barbeiroId = elementos.campoBarbeiro.value;
  const servicoId = elementos.campoServico.value;
  const data = elementos.campoData.value;

  if (!barbeiroId || !servicoId || !data) {
    return;
  }

  elementos.listaHorarios.innerHTML = "<p class='mensagem'>Carregando horários...</p>";

  try {
    const resposta = await api.verificarDisponibilidade({ barbeiroId, servicoId, data });
    renderizarHorarios(resposta.horarios || []);
  } catch (erro) {
    elementos.listaHorarios.innerHTML = `<p class="mensagem erro">${erro.message}</p>`;
  }
}

async function carregarDadosIniciais() {
  elementos.campoData.value = hojeCampoData();

  try {
    const [barbeiros, servicos] = await Promise.all([api.listarBarbeiros(), api.listarServicos()]);
    estado.barbeiros = barbeiros;
    estado.servicos = servicos;
    renderizarBarbeiros();
    renderizarServicos();
    atualizarResumo();
    await carregarHorarios();
  } catch (erro) {
    definirMensagem(elementos.mensagemAgendamento, `Erro ao carregar dados: ${erro.message}`, true);
  }
}

async function enviarAgendamento(evento) {
  evento.preventDefault();
  definirMensagem(elementos.mensagemAgendamento, "");

  const servico = obterServicoSelecionado();
  const barbeiro = obterBarbeiroSelecionado();

  if (!servico || !barbeiro || !estado.horarioSelecionado) {
    definirMensagem(elementos.mensagemAgendamento, "Selecione barbeiro, serviço e horário.", true);
    return;
  }

  const nome = document.querySelector("#campo-nome").value.trim();
  const telefone = document.querySelector("#campo-telefone").value.trim();
  const email = document.querySelector("#campo-email").value.trim();
  const observacao = document.querySelector("#campo-observacao").value.trim();

  if (!nome || !telefone) {
    definirMensagem(elementos.mensagemAgendamento, "Nome e telefone são obrigatórios.", true);
    return;
  }

  try {
    const resposta = await api.criarAgendamento({
      barbeiro_id: barbeiro.id,
      servico_id: servico.id,
      inicio: estado.horarioSelecionado,
      cliente: {
        nome,
        telefone,
        email: email || null,
      },
      observacao: observacao || null,
    });

    const mensagemWhatsApp = [
      `Olá, ${nome}! Seu agendamento foi recebido como pendente.`,
      `Serviço: ${servico.nome}`,
      `Barbeiro: ${barbeiro.nome}`,
      `Data: ${formatarDataHora(resposta.inicio)}`,
      `Token: ${resposta.token_cliente}`,
    ].join("\n");

    const linkWhatsApp = criarLinkWhatsApp(telefone, mensagemWhatsApp);

    definirMensagem(
      elementos.mensagemAgendamento,
      `Agendamento criado como pendente.\nToken: ${resposta.token_cliente}\nLink WhatsApp: ${linkWhatsApp}`,
    );

    await carregarHorarios();
  } catch (erro) {
    definirMensagem(elementos.mensagemAgendamento, erro.message, true);
  }
}

async function cancelarAgendamento(evento) {
  evento.preventDefault();

  const token = document.querySelector("#campo-token-cancelar").value.trim();
  const motivo = document.querySelector("#campo-motivo-cancelar").value.trim();

  try {
    const resposta = await api.cancelarAgendamento({
      token_cliente: token,
      motivo: motivo || null,
    });

    definirMensagem(elementos.mensagemCancelar, `Agendamento cancelado: ${resposta.status}`);
  } catch (erro) {
    definirMensagem(elementos.mensagemCancelar, erro.message, true);
  }
}

async function remarcarAgendamento(evento) {
  evento.preventDefault();

  const token = document.querySelector("#campo-token-remarcar").value.trim();
  const data = document.querySelector("#campo-data-remarcar").value;
  const hora = document.querySelector("#campo-hora-remarcar").value;

  try {
    const resposta = await api.remarcarAgendamento({
      token_cliente: token,
      novo_inicio: `${data}T${hora}:00`,
    });

    definirMensagem(elementos.mensagemRemarcar, `Agendamento remarcado: ${formatarDataHora(resposta.inicio)}`);
  } catch (erro) {
    definirMensagem(elementos.mensagemRemarcar, erro.message, true);
  }
}

function obterTokenAdmin() {
  return sessionStorage.getItem("barberflow_admin_token") || "";
}

function salvarTokenAdmin() {
  const token = elementos.campoAdminToken.value.trim();
  sessionStorage.setItem("barberflow_admin_token", token);
  definirMensagem(elementos.mensagemAdmin, "Token salvo nesta aba.");
}

async function carregarAdmin() {
  const token = obterTokenAdmin();

  if (!token) {
    definirMensagem(elementos.mensagemAdmin, "Informe e salve o token admin.", true);
    return;
  }

  try {
    const agendamentos = await api.listarAgendamentosAdmin(token);
    renderizarAdmin(agendamentos);
    definirMensagem(elementos.mensagemAdmin, `${agendamentos.length} agendamento(s) carregado(s).`);
  } catch (erro) {
    definirMensagem(elementos.mensagemAdmin, erro.message, true);
  }
}

function renderizarAdmin(agendamentos) {
  if (!agendamentos.length) {
    elementos.listaAdmin.innerHTML = "<p class='cartao admin-card'>Nenhum agendamento encontrado.</p>";
    return;
  }

  elementos.listaAdmin.innerHTML = agendamentos
    .map(
      (agendamento) => `
        <article class="cartao admin-card">
          <div class="admin-card__topo">
            <div>
              <span class="status">${agendamento.status}</span>
              <h3>${agendamento.cliente_nome}</h3>
              <p class="admin-card__meta">
                ${formatarDataHora(agendamento.inicio)}<br />
                ${agendamento.servico_nome} com ${agendamento.barbeiro_nome}<br />
                ${agendamento.cliente_telefone}
              </p>
            </div>
            <div class="acoes">
              <button class="botao botao--primario" data-status="confirmado" data-id="${agendamento.id}">Confirmar</button>
              <button class="botao botao--secundario" data-status="cancelado_pelo_admin" data-id="${agendamento.id}">Cancelar</button>
              <button class="botao botao--secundario" data-status="concluido" data-id="${agendamento.id}">Concluir</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  elementos.listaAdmin.querySelectorAll("[data-status]").forEach((botao) => {
    botao.addEventListener("click", async () => {
      await alterarStatus(botao.dataset.id, botao.dataset.status);
    });
  });
}

async function alterarStatus(id, status) {
  const token = obterTokenAdmin();

  try {
    const resposta = await api.alterarStatusAdmin(token, id, status);
    definirMensagem(elementos.mensagemAdmin, `Status alterado para ${resposta.status}.`);
    await carregarAdmin();
  } catch (erro) {
    definirMensagem(elementos.mensagemAdmin, erro.message, true);
  }
}

async function gerarBackup() {
  const token = obterTokenAdmin();

  try {
    const backup = await api.gerarBackup(token);
    const texto = JSON.stringify(backup, null, 2);
    const blob = new Blob([texto], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barberflow-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    definirMensagem(elementos.mensagemAdmin, "Backup gerado.");
  } catch (erro) {
    definirMensagem(elementos.mensagemAdmin, erro.message, true);
  }
}

elementos.formAgendamento.addEventListener("submit", enviarAgendamento);
elementos.campoBarbeiro.addEventListener("change", () => {
  atualizarResumo();
  carregarHorarios();
});
elementos.campoServico.addEventListener("change", () => {
  atualizarResumo();
  carregarHorarios();
});
elementos.campoData.addEventListener("change", carregarHorarios);
elementos.formCancelar.addEventListener("submit", cancelarAgendamento);
elementos.formRemarcar.addEventListener("submit", remarcarAgendamento);
elementos.botaoSalvarToken.addEventListener("click", salvarTokenAdmin);
elementos.botaoCarregarAdmin.addEventListener("click", carregarAdmin);
elementos.botaoBackup.addEventListener("click", gerarBackup);

carregarDadosIniciais();
