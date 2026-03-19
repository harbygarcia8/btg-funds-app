import { describe, it, expect } from 'vitest';
import { AVAILABLE_FUNDS_DATA, INITIAL_BALANCE } from '../constants/business-rules';

describe('business rules', () => {
  it('deberia tener un saldo inicial de 500000', () => {
    expect(INITIAL_BALANCE).toBe(500000);
  });

  it('deberia contener exactamente 5 fondos iniciales', () => {
    expect(AVAILABLE_FUNDS_DATA.length).toBe(5);
  });

  it('cada fondo debería tener las propiedades requeridas y montos positivos', () => {
    AVAILABLE_FUNDS_DATA.forEach((fund) => {
      expect(fund.id).toBeDefined();
      expect(fund.name).toBeDefined();
      expect(fund.minAmount).toBeGreaterThan(0);
      expect(['FPV', 'FIC']).toContain(fund.category);
    });
  });

  it('debería tener los montos mínimos correctos según el caso de negocio', () => {
    const expectedFunds = [
      { id: '1', minAmount: 75000 },
      { id: '2', minAmount: 125000 },
      { id: '3', minAmount: 50000 },
      { id: '4', minAmount: 250000 },
      { id: '5', minAmount: 100000 },
    ];

    expectedFunds.forEach((expected) => {
      const fund = AVAILABLE_FUNDS_DATA.find((f) => f.id === expected.id);
      expect(fund?.minAmount).toBe(expected.minAmount);
    });
  });
});
