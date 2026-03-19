import { inject, Injectable } from '@angular/core';
import { FUND_REPOSITORY_TOKEN } from '../ports/fund-repository.token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetBalanceUseCase {
  private readonly fundRepository = inject(FUND_REPOSITORY_TOKEN);

  execute(): Observable<number> {
    return this.fundRepository.getUserBalance();
  }
}
