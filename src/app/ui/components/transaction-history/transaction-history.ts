import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction } from '../../../domain/models/fund.model';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.scss',
})
export class TransactionHistory {
  transactions = input.required<Transaction[]>();
  cancel = output<string>();

  isAlreadyCancelled(fundId: string): boolean {
    return this.transactions().some((t) => t.fundId === fundId && t.type === 'cancelation');
  }
}
