import {inject, Injectable} from '@angular/core';
import {FUND_REPOSITORY_TOKEN} from '../ports/fund-repository.token';
import {Observable} from 'rxjs';
import {Transaction} from '../../domain/models/fund.model';

@Injectable({
  providedIn: 'root',
})
export class GetTransactionHistoryUseCase {
  private readonly fundRepository = inject(FUND_REPOSITORY_TOKEN);

  executeTransactionHistory(): Observable<Transaction[]> {
    return this.fundRepository.getTransactionHistory()
  }

}
