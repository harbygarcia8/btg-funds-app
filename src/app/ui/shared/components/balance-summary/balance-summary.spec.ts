import { render, screen } from '@testing-library/angular';
import { describe, it, expect } from 'vitest';
import { BalanceSummary } from './balance-summary';

describe('BalanceSummary', () => {
  it('debería mostrar el saldo formateado como moneda', async () => {
    await render(BalanceSummary, {
      componentInputs: { balance: 500000 }
    });

    // Verificamos que aparezca el símbolo de moneda y el valor
    expect(screen.getByText(/\$500,000/i)).toBeTruthy();
  });
});
