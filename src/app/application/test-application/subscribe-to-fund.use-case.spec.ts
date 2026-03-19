import { TestBed } from '@angular/core/testing';
import { vi, Mock, describe, it, expect, beforeEach } from 'vitest';
import { SubscribeToFundUseCase } from '../use-cases/subscribe-to-fund.use-case';
import { FUND_REPOSITORY_TOKEN } from '../ports/fund-repository.token';
import { INSUFFICIENT_FUNDS_MESSAGE } from '../constants/messages-rules';
import { firstValueFrom, of } from 'rxjs';
import { FundRepositoryPort } from '../ports/fund-repository.port';

describe('SubscribeToFundUseCase', () => {
  let useCase: SubscribeToFundUseCase;
  let mockFundRepository: Record<keyof FundRepositoryPort, Mock>;

  beforeEach(() => {
    mockFundRepository = {
      getUserBalance: vi.fn(),
      subscribeToFund: vi.fn(),
      getAvailableFunds: vi.fn(),
      cancelFund: vi.fn(),
      getTransactionHistory: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        SubscribeToFundUseCase,
        { provide: FUND_REPOSITORY_TOKEN, useValue: mockFundRepository },
      ],
    });

    useCase = TestBed.inject(SubscribeToFundUseCase);
  });

  it('debería lanzar error si el saldo es insuficiente', async () => {
    mockFundRepository.getUserBalance.mockReturnValue(of(100));
    try {
      await firstValueFrom(useCase.executeSubscribeToFund('1', 500, 'email'));
      expect(true).toBe(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toBe(INSUFFICIENT_FUNDS_MESSAGE);
      } else {
        throw err;
      }
    }
  });

  it('debería llamar al repositorio si el saldo es suficiente', async () => {
    mockFundRepository.getUserBalance.mockReturnValue(of(1000));
    mockFundRepository.subscribeToFund.mockReturnValue(of({ id: 'trx1' }));
    await firstValueFrom(useCase.executeSubscribeToFund('1', 500, 'email'));

    expect(mockFundRepository.subscribeToFund).toHaveBeenCalledWith('1', 500, 'email');
  });
});
