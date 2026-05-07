import { describe, expect, it } from 'vitest';
import { converterReaisParaCentavos, formatarDinheiro } from './dinheiro';

describe('utils/dinheiro', () => {
  it('formata centavos em reais', () => {
    expect(formatarDinheiro(4500)).toContain('45,00');
  });

  it('converte texto em centavos', () => {
    expect(converterReaisParaCentavos('R$ 45,90')).toBe(4590);
  });

  it('retorna zero para valor invalido', () => {
    expect(converterReaisParaCentavos('abc')).toBe(0);
  });
});
