export function formatarDinheiro(valorCentavos: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valorCentavos / 100);
}

export function converterReaisParaCentavos(valor: string): number {
  const valorNormalizado = valor
    .replace(/\s/g, '')
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.');

  const numero = Number(valorNormalizado);

  if (!Number.isFinite(numero)) {
    return 0;
  }

  return Math.round(numero * 100);
}
