import { render, screen, fireEvent } from '@testing-library/angular';
import { describe, it, expect, vi } from 'vitest';
import { FundCard } from './fund-card';
import { Fund } from '../../../../domain/models/fund.model';
describe('FundCard', () => {
  const mockFund: Fund = { id: '1', name: 'Fondo Test', minAmount: 75000, category: 'FPV' };

  it('debería mostrar el nombre y monto mínimo del fondo', async () => {
    await render(FundCard, {
      componentInputs: { fund: mockFund },
    });

    expect(screen.getByText(/Fondo Test/i)).toBeTruthy();
    expect(screen.getByText(/\$75,000/i)).toBeTruthy();
  });

  it('debería emitir el evento de suscripción al hacer clic en el botón', async () => {
    const subscribeSpy = vi.fn();
    await render(FundCard, {
      componentInputs: { fund: mockFund },
      on: { subscribe: subscribeSpy },
    });

    const button = screen.getByRole('button', { name: /Invertir ahora/i });
    fireEvent.click(button);

    expect(subscribeSpy).toHaveBeenCalledWith(mockFund);
  });
});
