export function formatarDinheiro(valorCentavos) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorCentavos / 100);
}

export function formatarDataHora(valorIso) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(valorIso));
}

export function formatarHora(valorIso) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(valorIso));
}

export function hojeCampoData() {
  return new Date().toISOString().slice(0, 10);
}
