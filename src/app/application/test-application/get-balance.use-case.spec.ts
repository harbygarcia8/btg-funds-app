import { TestBed } from '@angular/core/testing';
import { GetBalanceUseCase } from '../use-cases/get-balance.use-case';
import { FUND_REPOSITORY_TOKEN } from '../ports/fund-repository.token';
import { of, firstValueFrom } from 'rxjs';
import { vi, Mock, describe, it, expect, beforeEach } from 'vitest';
import { FundRepositoryPort } from '../ports/fund-repository.port';

describe('GetBalanceUseCase', () => {
  let useCase: GetBalanceUseCase;
  let mockFundRepository: Record<keyof FundRepositoryPort, Mock>;

  beforeEach(() => {
    mockFundRepository = {
      getUserBalance: vi.fn(),
      getAvailableFunds: vi.fn(),
      subscribeToFund: vi.fn(),
      cancelFund: vi.fn(),
      getTransactionHistory: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GetBalanceUseCase,
        { provide: FUND_REPOSITORY_TOKEN, useValue: mockFundRepository },
      ],
    });

    useCase = TestBed.inject(GetBalanceUseCase);
  });

  it('debería retornar el saldo del usuario desde el repositorio', async () => {
    const expectedBalance = 500000;
    mockFundRepository.getUserBalance.mockReturnValue(of(expectedBalance));

    const result = await firstValueFrom(useCase.execute());

    expect(result).toBe(expectedBalance);
    expect(mockFundRepository.getUserBalance).toHaveBeenCalled();
  });
});
