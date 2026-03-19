import { TestBed } from '@angular/core/testing';
import { CancelFundUseCase } from '../use-cases/cancel-fund.use-case';
import { FUND_REPOSITORY_TOKEN } from '../ports/fund-repository.token';
import { of, firstValueFrom } from 'rxjs';
import { vi, Mock, describe, it, expect, beforeEach } from 'vitest';
import { Transaction } from '../../domain/models/fund.model';
import { FundRepositoryPort } from '../ports/fund-repository.port';

describe('CancelFundUseCase', () => {
  let useCase: CancelFundUseCase;
  let mockFundRepository: Record<keyof FundRepositoryPort, Mock>;

  beforeEach(() => {
    mockFundRepository = {
      cancelFund: vi.fn(),
      getAvailableFunds: vi.fn(),
      subscribeToFund: vi.fn(),
      getTransactionHistory: vi.fn(),
      getUserBalance: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CancelFundUseCase,
        { provide: FUND_REPOSITORY_TOKEN, useValue: mockFundRepository },
      ],
    });

    useCase = TestBed.inject(CancelFundUseCase);
  });

  it('debería llamar al repositorio para cancelar un fondo', async () => {
    const fundId = '1';
    const mockCancelTransaction: Transaction = {
      id: 'trx-cancel',
      fundId: fundId,
      fundName: 'Test Fund',
      amount: 10000,
      type: 'cancelation',
      notificationType: 'email',
      date: new Date(),
    };
    mockFundRepository.cancelFund.mockReturnValue(of(mockCancelTransaction));

    const result = await firstValueFrom(useCase.executeCancelFund(fundId));

    expect(result).toEqual(mockCancelTransaction);
    expect(mockFundRepository.cancelFund).toHaveBeenCalledWith(fundId);
  });
});
