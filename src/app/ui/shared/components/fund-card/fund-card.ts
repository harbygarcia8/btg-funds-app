import { Component, input, output } from '@angular/core';
import { Fund } from '../../../../domain/models/fund.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-fund-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './fund-card.html',
  styleUrl: './fund-card.scss',
})
export class FundCard {
  fund = input.required<Fund>();
  subscribe = output<Fund>();

  getCategoryDescription(category: Fund['category']): string {
    return category === 'FPV' ? 'Fondo de pension voluntaria' : 'Fondo de inversion colectiva';
  }

  getCategoryIcon(category: Fund['category']): string {
    return category === 'FPV' ? '📈' : '🏦';
  }
}
