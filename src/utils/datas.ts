export function formatarDataHora(dataIso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(dataIso));
}

export function somarMinutos(dataIso: string, minutos: number): string {
  const data = new Date(dataIso);
  data.setMinutes(data.getMinutes() + minutos);
  return data.toISOString();
}

export function gerarHorariosDemo(dataBase: string): string[] {
  const data = new Date(`${dataBase}T09:00:00`);
  const horarios: string[] = [];

  for (let indice = 0; indice < 18; indice += 1) {
    horarios.push(data.toISOString());
    data.setMinutes(data.getMinutes() + 30);
  }

  return horarios;
}

export function obterDataHojeCampo(): string {
  return new Date().toISOString().slice(0, 10);
}
