import { render, screen, fireEvent } from '@testing-library/angular';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubscriptionForm } from './subscription-form';
import { SubscribeToFundUseCase } from '../../../application/use-cases/subscribe-to-fund.use-case';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Transaction } from '../../../domain/models/fund.model';

describe('SubscriptionForm', () => {
  const mockFund = { id: '1', name: 'Fondo Test', minAmount: 75000, category: 'FPV' };
  let mockSubscribeUseCase: Partial<SubscribeToFundUseCase>;

  beforeEach(() => {
    mockSubscribeUseCase = {
      executeSubscribeToFund: vi.fn().mockReturnValue(of({ id: 'trx123' } as Transaction)),
    };
  });

  it('debería mostrar error de validación si el monto es menor al mínimo', async () => {
    await render(SubscriptionForm, {
      imports: [ReactiveFormsModule],
      componentInputs: { fund: mockFund },
      providers: [{ provide: SubscribeToFundUseCase, useValue: mockSubscribeUseCase }],
    });
    const input = screen.getByLabelText(/Monto a invertir/i);
    fireEvent.input(input, { target: { value: '10000' } });
    fireEvent.blur(input);

    expect(screen.getByText(/El monto mínimo es \$75,000/i)).toBeTruthy();
  });

  it('debería llamar al caso de uso al enviar un formulario válido', async () => {
    await render(SubscriptionForm, {
      imports: [ReactiveFormsModule],
      componentInputs: { fund: mockFund },
      providers: [{ provide: SubscribeToFundUseCase, useValue: mockSubscribeUseCase }],
    });

    const input = screen.getByLabelText(/Monto a invertir/i);
    fireEvent.input(input, { target: { value: '80000' } });

    const submitBtn = screen.getByRole('button', { name: /Confirmar Suscripción/i });
    fireEvent.click(submitBtn);

    expect(mockSubscribeUseCase.executeSubscribeToFund).toHaveBeenCalledWith('1', 80000, 'email');
  });
});
