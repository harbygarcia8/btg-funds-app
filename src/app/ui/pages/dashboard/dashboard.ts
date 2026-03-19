import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BalanceSummary } from '../../shared/components/balance-summary/balance-summary';
import { FundCard } from '../../shared/components/fund-card/fund-card';
import { ListFundsUseCase } from '../../../application/use-cases/list-funds.use-case';
import { GetBalanceUseCase } from '../../../application/use-cases/get-balance.use-case';
import { toSignal } from '@angular/core/rxjs-interop';
import { Fund } from '../../../domain/models/fund.model';
import { SubscriptionForm } from '../../components/subscription-form/subscription-form';
import { BehaviorSubject, startWith, switchMap } from 'rxjs';
import { CancelFundUseCase } from '../../../application/use-cases/cancel-fund.use-case';
import { GetTransactionHistoryUseCase } from '../../../application/use-cases/get-transaction-history.use-case';
import { TransactionHistory } from '../../components/transaction-history/transaction-history';
import { SUSCRIPTION_CANCELLED_MESSAGE } from '../../../application/constants/messages-rules';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BalanceSummary, FundCard, SubscriptionForm, TransactionHistory],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly listFundsUseCase = inject(ListFundsUseCase);
  private readonly getBalanceUseCase = inject(GetBalanceUseCase);
  private readonly getHistoryUseCase = inject(GetTransactionHistoryUseCase);
  private readonly cancelFundUseCase = inject(CancelFundUseCase);

  private readonly refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Signals para el estado de la UI
  funds = toSignal(
    this.refreshTrigger$.pipe(
      switchMap(() => this.listFundsUseCase.executeListFunds()),
      startWith([]),
    ),
    { initialValue: [] },
  );
  balance = toSignal(
    this.refreshTrigger$.pipe(
      switchMap(() => this.getBalanceUseCase.execute()),
      startWith(0),
    ),
    { initialValue: 0 },
  );

  selectedFund = signal<Fund | null>(null);
  openSubscriptionModal(fund: Fund) {
    this.selectedFund.set(fund);
  }

  protected refreshData() {
    this.refreshTrigger$.next();
  }

  history = toSignal(
    this.refreshTrigger$.pipe(
      switchMap(() => this.getHistoryUseCase.executeTransactionHistory()),
      startWith([]),
    ),
    { initialValue: [] },
  );

  onCancel(fundId: string) {
    this.cancelFundUseCase.executeCancelFund(fundId).subscribe({
      next: () => {
        alert(SUSCRIPTION_CANCELLED_MESSAGE);
        this.refreshData(); // Esto actualiza Saldo, Lista e Historial automáticamente
      },
      error: (err) => alert(err.message),
    });
  }
}
