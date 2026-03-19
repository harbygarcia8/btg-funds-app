import {inject, Injectable} from '@angular/core';
import {FUND_REPOSITORY_TOKEN} from '../ports/fund-repository.token';
import {Observable} from 'rxjs';
import {Transaction} from '../../domain/models/fund.model';

@Injectable(
  {providedIn: 'root'}
)
export class CancelFundUseCase {
  private readonly fundRepository = inject(FUND_REPOSITORY_TOKEN)

  executeCancelFund(fundId: string): Observable<Transaction> {
    return this.fundRepository.cancelFund(fundId);
  }

}
