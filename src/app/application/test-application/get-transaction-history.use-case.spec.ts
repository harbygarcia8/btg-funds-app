import { TestBed } from '@angular/core/testing';
import { GetTransactionHistoryUseCase } from '../use-cases/get-transaction-history.use-case';
import { FUND_REPOSITORY_TOKEN } from '../ports/fund-repository.token';
import { of, firstValueFrom } from 'rxjs';
import { vi, Mock, describe, it, expect, beforeEach } from 'vitest';
import { Transaction } from '../../domain/models/fund.model';
import { FundRepositoryPort } from '../ports/fund-repository.port';

describe('GetTransactionHistoryUseCase', () => {
  let useCase: GetTransactionHistoryUseCase;
  let mockFundRepository: Record<keyof FundRepositoryPort, Mock>;

  beforeEach(() => {
    mockFundRepository = {
      getTransactionHistory: vi.fn(),
      getAvailableFunds: vi.fn(),
      subscribeToFund: vi.fn(),
      cancelFund: vi.fn(),
      getUserBalance: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GetTransactionHistoryUseCase,
        { provide: FUND_REPOSITORY_TOKEN, useValue: mockFundRepository },
      ],
    });

    useCase = TestBed.inject(GetTransactionHistoryUseCase);
  });

  it('debería retornar el historial de transacciones desde el repositorio', async () => {
    const mockHistory: Transaction[] = [
      {
        id: '1',
        fundId: '1',
        fundName: 'Test Fund',
        amount: 10000,
        type: 'subscription',
        notificationType: 'email',
        date: new Date(),
      },
    ];
    mockFundRepository.getTransactionHistory.mockReturnValue(of(mockHistory));

    const result = await firstValueFrom(useCase.executeTransactionHistory());

    expect(result).toEqual(mockHistory);
    expect(mockFundRepository.getTransactionHistory).toHaveBeenCalled();
  });
});
