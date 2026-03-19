import { render, screen } from '@testing-library/angular';
import { describe, it, expect } from 'vitest';
import { TransactionHistory } from './transaction-history';
import { Transaction } from '../../../domain/models/fund.model';

describe('TransactionHistory', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      fundId: 'fund-1',
      fundName: 'Fondo 1',
      amount: 100000,
      type: 'subscription',
      notificationType: 'email',
      date: new Date(),
    },
    {
      id: '2',
      fundId: 'fund-1',
      fundName: 'Fondo 1',
      amount: 100000,
      type: 'cancelation',
      date: new Date(),
    },
  ];
  it('debería mostrar el botón como "Cancelado" y deshabilitado si ya existe una cancelación', async () => {
    await render(TransactionHistory, {
      componentInputs: { transactions: mockTransactions },
    });

    const cancelButton = screen.getByRole('button', { name: /Cancelado/i }) as HTMLButtonElement;
    expect(cancelButton.disabled).toBe(true);
  });
});
