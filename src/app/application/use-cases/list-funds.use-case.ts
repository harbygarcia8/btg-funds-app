import {inject, Injectable} from '@angular/core';
import {FUND_REPOSITORY_TOKEN} from '../ports/fund-repository.token';
import {Observable} from 'rxjs';
import {Fund} from '../../domain/models/fund.model';

@Injectable({
  providedIn: 'root',
})
export class ListFundsUseCase {
  private readonly fundRepository = inject(FUND_REPOSITORY_TOKEN)

  executeListFunds():Observable<Fund[]> {
    return this.fundRepository.getAvailableFunds();
  }
}
