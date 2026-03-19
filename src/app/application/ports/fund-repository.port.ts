import { Observable } from 'rxjs';
import { Fund, NotificationType, Transaction } from '../../domain/models/fund.model';

export interface FundRepositoryPort {
  getAvailableFunds(): Observable<Fund[]>;
  subscribeToFund(
    fundId: string,
    amount: number,
    notificationType: NotificationType,
  ): Observable<Transaction>;
  cancelFund(fundId: string): Observable<Transaction>;
  getTransactionHistory(): Observable<Transaction[]>;
  getUserBalance(): Observable<number>;
}
