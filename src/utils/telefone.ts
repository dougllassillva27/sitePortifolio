export function limparTelefone(telefone: string): string {
  return telefone.replace(/\D/g, '');
}

export function telefoneValidoBasico(telefone: string): boolean {
  const limpo = limparTelefone(telefone);
  return limpo.length >= 10 && limpo.length <= 11;
}

export function normalizarTelefoneBrasil(telefone: string): string {
  const limpo = limparTelefone(telefone);

  if (limpo.startsWith('55')) {
    return limpo;
  }

  return `55${limpo}`;
}
