export interface NotificacaoPainel {
  id: string;
  titulo: string;
  mensagem: string;
  criadaEm: string;
  lida: boolean;
}

const canalInterno = new EventTarget();

export function publicarNotificacao(titulo: string, mensagem: string): void {
  const notificacao: NotificacaoPainel = {
    id: `${Date.now()}`,
    titulo,
    mensagem,
    criadaEm: new Date().toISOString(),
    lida: false,
  };

  canalInterno.dispatchEvent(
    new CustomEvent<NotificacaoPainel>('barberflow:notificacao', {
      detail: notificacao,
    }),
  );
}

export function ouvirNotificacoes(callback: (notificacao: NotificacaoPainel) => void): () => void {
  const manipulador = (evento: Event) => {
    callback((evento as CustomEvent<NotificacaoPainel>).detail);
  };

  canalInterno.addEventListener('barberflow:notificacao', manipulador);

  return () => {
    canalInterno.removeEventListener('barberflow:notificacao', manipulador);
  };
}
