import { TestBed } from '@angular/core/testing';
import { ListFundsUseCase } from '../use-cases/list-funds.use-case';
import { FUND_REPOSITORY_TOKEN } from '../ports/fund-repository.token';
import { of, firstValueFrom } from 'rxjs';
import { vi, Mock, describe, it, expect, beforeEach } from 'vitest';
import { AVAILABLE_FUNDS_DATA } from '../../domain/constants/business-rules';
import { FundRepositoryPort } from '../ports/fund-repository.port';

describe('ListFundsUseCase', () => {
  let useCase: ListFundsUseCase;
  let mockFundRepository: Record<keyof FundRepositoryPort, Mock>;

  beforeEach(() => {
    mockFundRepository = {
      getAvailableFunds: vi.fn(),
      subscribeToFund: vi.fn(),
      cancelFund: vi.fn(),
      getTransactionHistory: vi.fn(),
      getUserBalance: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ListFundsUseCase,
        { provide: FUND_REPOSITORY_TOKEN, useValue: mockFundRepository },
      ],
    });

    useCase = TestBed.inject(ListFundsUseCase);
  });

  it('debería retornar la lista de fondos desde el repositorio', async () => {
    mockFundRepository.getAvailableFunds.mockReturnValue(of(AVAILABLE_FUNDS_DATA));

    const result = await firstValueFrom(useCase.executeListFunds());

    expect(result).toEqual(AVAILABLE_FUNDS_DATA);
    expect(mockFundRepository.getAvailableFunds).toHaveBeenCalled();
  });
});
