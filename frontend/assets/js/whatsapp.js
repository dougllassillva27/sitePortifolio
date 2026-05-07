export function limparTelefone(telefone) {
  return String(telefone || "").replace(/\D/g, "");
}

export function normalizarTelefoneBrasil(telefone) {
  const limpo = limparTelefone(telefone);

  if (limpo.startsWith("55")) {
    return limpo;
  }

  return `55${limpo}`;
}

export function criarLinkWhatsApp(telefone, mensagem) {
  const telefoneNormalizado = normalizarTelefoneBrasil(telefone);
  return `https://wa.me/${telefoneNormalizado}?text=${encodeURIComponent(mensagem)}`;
}
