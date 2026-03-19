import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Dashboard } from './dashboard';
import { ListFundsUseCase } from '../../../application/use-cases/list-funds.use-case';
import { GetBalanceUseCase } from '../../../application/use-cases/get-balance.use-case';
import { GetTransactionHistoryUseCase } from '../../../application/use-cases/get-transaction-history.use-case';
import { CancelFundUseCase } from '../../../application/use-cases/cancel-fund.use-case';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  const mockListFundsUseCase = {
    executeListFunds: vi.fn().mockReturnValue(of([])),
  };
  const mockGetBalanceUseCase = {
    execute: vi.fn().mockReturnValue(of(500000)),
  };
  const mockGetHistoryUseCase = {
    executeTransactionHistory: vi.fn().mockReturnValue(of([])),
  };
  const mockCancelFundUseCase = {
    executeCancelFund: vi.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        { provide: ListFundsUseCase, useValue: mockListFundsUseCase },
        { provide: GetBalanceUseCase, useValue: mockGetBalanceUseCase },
        { provide: GetTransactionHistoryUseCase, useValue: mockGetHistoryUseCase },
        { provide: CancelFundUseCase, useValue: mockCancelFundUseCase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('debería crearse correctamente con los casos de uso mockeados', () => {
    expect(component).toBeTruthy();
    expect(mockListFundsUseCase.executeListFunds).toHaveBeenCalled();
    expect(mockGetBalanceUseCase.execute).toHaveBeenCalled();
    expect(mockGetHistoryUseCase.executeTransactionHistory).toHaveBeenCalled();
  });
});
