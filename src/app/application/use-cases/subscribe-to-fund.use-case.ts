import {inject, Injectable} from '@angular/core';
import {FUND_REPOSITORY_TOKEN} from '../ports/fund-repository.token';
import {NotificationType, Transaction} from '../../domain/models/fund.model';
import {first, Observable, switchMap, throwError} from 'rxjs';
import {INSUFFICIENT_FUNDS_MESSAGE} from '../constants/messages-rules';

@Injectable({
  providedIn: 'root',
})
export class SubscribeToFundUseCase {
  private readonly fundRepository = inject(FUND_REPOSITORY_TOKEN)

  executeSubscribeToFund(fundId: string, amount: number, notificationType: NotificationType): Observable<Transaction> {
    return this.fundRepository.getUserBalance().pipe(
      first(),
      switchMap(currentBalance => {
        if (amount > currentBalance) {
          return throwError(() => new Error(INSUFFICIENT_FUNDS_MESSAGE));
        }
        return this.fundRepository.subscribeToFund(fundId, amount, notificationType);
      })
    );
  }
}
