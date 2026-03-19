import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-balance-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './balance-summary.html',
  styleUrl: './balance-summary.scss',
})
export class BalanceSummary {
  balance = input.required<number>(); // Usando input() de signal
}
