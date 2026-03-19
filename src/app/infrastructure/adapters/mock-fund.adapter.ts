import { Injectable } from '@angular/core';
import { FundRepositoryPort } from '../../application/ports/fund-repository.port';
import { delay, Observable, of, throwError } from 'rxjs';
import { Fund, NotificationType, Transaction } from '../../domain/models/fund.model';
import { AVAILABLE_FUNDS_DATA, INITIAL_BALANCE } from '../../domain/constants/business-rules';
import {
  DONT_HAVE_SUSCRIPTION_ACTIVE_FOR_THIS_FUND_MESSAGE,
  FUND_NOT_FOUND_MESSAGE,
  MIN_AMOUNT_ERROR_MESSAGE,
} from '../../application/constants/messages-rules';

@Injectable()
export class MockFundAdapter implements FundRepositoryPort {
  private balance = INITIAL_BALANCE;
  private transactions: Transaction[] = [];
  private myFunds: string[] = [];

  getAvailableFunds(): Observable<Fund[]> {
    return of(AVAILABLE_FUNDS_DATA);
  }

  subscribeToFund(
    fundId: string,
    amount: number,
    notificationType: NotificationType,
  ): Observable<Transaction> {
    const fund = AVAILABLE_FUNDS_DATA.find((fund) => fund.id === fundId);

    if (!fund) return throwError(new Error(FUND_NOT_FOUND_MESSAGE));

    if (amount < fund.minAmount) {
      return throwError(new Error(`${MIN_AMOUNT_ERROR_MESSAGE} ${fund.minAmount}`));
    }

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      fundId: fund.id,
      fundName: fund.name,
      amount: amount,
      type: 'subscription',
      notificationType: notificationType,
      date: new Date(),
    };

    this.balance -= amount;
    this.transactions.push(newTransaction);
    this.myFunds.push(fundId);

    return of(newTransaction).pipe(delay(800));
  }

  cancelFund(fundId: string): Observable<Transaction> {
    const lastSubscription = this.transactions
      .filter((t) => t.fundId === fundId && t.type === 'subscription')
      .pop();

    if (!lastSubscription)
      return throwError(new Error(DONT_HAVE_SUSCRIPTION_ACTIVE_FOR_THIS_FUND_MESSAGE));

    const cancelTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      fundId: fundId,
      fundName: lastSubscription.fundName,
      amount: lastSubscription.amount,
      type: 'cancelation',
      notificationType: lastSubscription.notificationType,
      date: new Date(),
    };

    this.balance += lastSubscription.amount;
    this.transactions.push(cancelTransaction);

    return of(cancelTransaction).pipe(delay(500));
  }
  getTransactionHistory(): Observable<Transaction[]> {
    return of([...this.transactions].reverse()).pipe(delay(300));
  }
  getUserBalance(): Observable<number> {
    return of(this.balance);
  }
}
