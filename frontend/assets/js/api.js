const configuracao = window.BARBERFLOW_CONFIG || {};
const API_BASE_URL = configuracao.API_BASE_URL || "http://localhost:8000";

function montarUrl(caminho) {
  return `${API_BASE_URL}${caminho}`;
}

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(montarUrl(caminho), {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...(opcoes.headers || {}),
    },
  });

  let dados = null;

  try {
    dados = await resposta.json();
  } catch {
    dados = null;
  }

  if (!resposta.ok) {
    const mensagem = dados?.detalhe || dados?.detail || dados?.erro || "Erro na requisição.";
    throw new Error(mensagem);
  }

  return dados;
}

export const api = {
  listarBarbeiros() {
    return requisitar("/api/barbeiros");
  },

  listarServicos() {
    return requisitar("/api/servicos");
  },

  verificarDisponibilidade({ barbeiroId, servicoId, data }) {
    const parametros = new URLSearchParams({
      barbeiro_id: barbeiroId,
      servico_id: servicoId,
      data,
    });

    return requisitar(`/api/disponibilidade?${parametros.toString()}`);
  },

  criarAgendamento(dados) {
    return requisitar("/api/agendamentos", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },

  cancelarAgendamento(dados) {
    return requisitar("/api/agendamentos/cancelar", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },

  remarcarAgendamento(dados) {
    return requisitar("/api/agendamentos/remarcar", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },

  listarAgendamentosAdmin(token) {
    return requisitar("/api/admin/agendamentos", {
      headers: {
        "x-admin-token": token,
      },
    });
  },

  alterarStatusAdmin(token, agendamentoId, status) {
    return requisitar(`/api/admin/agendamentos/${agendamentoId}/status`, {
      method: "PATCH",
      headers: {
        "x-admin-token": token,
      },
      body: JSON.stringify({ status }),
    });
  },

  gerarBackup(token) {
    return requisitar("/api/admin/backup", {
      method: "POST",
      headers: {
        "x-admin-token": token,
      },
    });
  },
};
