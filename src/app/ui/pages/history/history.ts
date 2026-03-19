import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, finalize, startWith, switchMap } from 'rxjs';
import { SUSCRIPTION_CANCELLED_MESSAGE } from '../../../application/constants/messages-rules';
import { CancelFundUseCase } from '../../../application/use-cases/cancel-fund.use-case';
import { GetTransactionHistoryUseCase } from '../../../application/use-cases/get-transaction-history.use-case';
import { Transaction, TransactionType } from '../../../domain/models/fund.model';
import { TransactionHistory } from '../../components/transaction-history/transaction-history';
import { UiFeedbackService } from '../../shared/components/feedback/ui-feedback.service';

type HistoryFilter = 'all' | TransactionType;

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [TransactionHistory, DecimalPipe, RouterLink],
  templateUrl: './history.html',
  styleUrl: './history.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage {
  private readonly getHistoryUseCase = inject(GetTransactionHistoryUseCase);
  private readonly cancelFundUseCase = inject(CancelFundUseCase);
  private readonly uiFeedback = inject(UiFeedbackService);
  private readonly refreshTrigger$ = new BehaviorSubject<void>(undefined);

  readonly activeFilter = signal<HistoryFilter>('all');

  readonly history = toSignal(
    this.refreshTrigger$.pipe(
      switchMap(() => this.getHistoryUseCase.executeTransactionHistory()),
      startWith([]),
    ),
    { initialValue: [] },
  );

  readonly filteredHistory = computed<Transaction[]>(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.history();
    }

    return this.history().filter((transaction: Transaction) => transaction.type === filter);
  });

  readonly totalMovements = computed(() => this.history().length);
  readonly subscriptionsCount = computed(
    () => this.history().filter((movement: Transaction) => movement.type === 'subscription').length,
  );
  readonly cancelationsCount = computed(
    () => this.history().filter((movement: Transaction) => movement.type === 'cancelation').length,
  );

  readonly totalAmount = computed(() =>
    this.history().reduce((sum: number, movement: Transaction) => sum + movement.amount, 0),
  );

  setFilter(filter: HistoryFilter) {
    this.activeFilter.set(filter);
  }

  onCancel(fundId: string) {
    this.uiFeedback.startLoading();
    this.cancelFundUseCase
      .executeCancelFund(fundId)
      .pipe(finalize(() => this.uiFeedback.stopLoading()))
      .subscribe({
        next: () => {
          this.uiFeedback.showSuccess(SUSCRIPTION_CANCELLED_MESSAGE);
          this.refreshTrigger$.next();
        },
        error: (error: unknown) => this.uiFeedback.showError(this.getErrorMessage(error)),
      });
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Ocurrio un error al procesar la solicitud.';
  }
}
