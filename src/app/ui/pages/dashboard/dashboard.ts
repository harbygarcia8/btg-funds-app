import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, finalize, startWith, switchMap } from 'rxjs';
import { SUSCRIPTION_CANCELLED_MESSAGE } from '../../../application/constants/messages-rules';
import { GetBalanceUseCase } from '../../../application/use-cases/get-balance.use-case';
import { CancelFundUseCase } from '../../../application/use-cases/cancel-fund.use-case';
import { GetTransactionHistoryUseCase } from '../../../application/use-cases/get-transaction-history.use-case';
import { ListFundsUseCase } from '../../../application/use-cases/list-funds.use-case';
import { Fund } from '../../../domain/models/fund.model';
import { SubscriptionForm } from '../../components/subscription-form/subscription-form';
import { UiFeedbackService } from '../../shared/components/feedback/ui-feedback.service';
import { FundCard } from '../../shared/components/fund-card/fund-card';
import { ThemeService } from '../../shared/theme/theme.service';

interface ActiveInvestmentRow {
  fundId: string;
  fundName: string;
  amount: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FundCard, SubscriptionForm, DecimalPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly listFundsUseCase = inject(ListFundsUseCase);
  private readonly getBalanceUseCase = inject(GetBalanceUseCase);
  private readonly getHistoryUseCase = inject(GetTransactionHistoryUseCase);
  private readonly cancelFundUseCase = inject(CancelFundUseCase);
  private readonly themeService = inject(ThemeService);
  private readonly uiFeedback = inject(UiFeedbackService);

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
  currentTheme = this.themeService.currentTheme;

  openSubscriptionModal(fund: Fund) {
    this.selectedFund.set(fund);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
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

  readonly activeInvestments = computed<ActiveInvestmentRow[]>(() => {
    const subscriptionByFund = new Map<string, { fundName: string; amount: number }>();
    const cancelledFundIds = new Set<string>();

    for (const transaction of this.history()) {
      if (transaction.type === 'subscription') {
        subscriptionByFund.set(transaction.fundId, {
          fundName: transaction.fundName,
          amount: transaction.amount,
        });
      }

      if (transaction.type === 'cancelation') {
        cancelledFundIds.add(transaction.fundId);
      }
    }

    return Array.from(subscriptionByFund.entries())
      .filter(([fundId]) => !cancelledFundIds.has(fundId))
      .map(([fundId, data]) => ({
        fundId,
        fundName: data.fundName,
        amount: data.amount,
      }));
  });

  readonly weeklyPerformance = computed(() =>
    Math.min(2.9, 0.6 + this.activeInvestments().length * 0.45),
  );

  readonly riskPercentage = computed(() => Math.min(85, 45 + this.activeInvestments().length * 10));

  readonly riskLabel = computed(() => {
    const percentage = this.riskPercentage();
    if (percentage >= 70) {
      return 'Riesgo alto';
    }

    if (percentage >= 55) {
      return 'Riesgo moderado';
    }

    return 'Riesgo bajo';
  });

  onCancel(fundId: string) {
    this.uiFeedback.startLoading();
    this.cancelFundUseCase
      .executeCancelFund(fundId)
      .pipe(finalize(() => this.uiFeedback.stopLoading()))
      .subscribe({
        next: () => {
          this.uiFeedback.showSuccess(SUSCRIPTION_CANCELLED_MESSAGE);
          this.refreshData(); // Esto actualiza Saldo, Lista e Historial automáticamente
        },
        error: (err: unknown) => this.uiFeedback.showError(this.getErrorMessage(err)),
      });
  }

  subscribeFromQuickActions() {
    const firstFund = this.funds()[0];
    if (firstFund) {
      this.openSubscriptionModal(firstFund);
    }
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Ocurrio un error al procesar la solicitud.';
  }
}
