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
  subscribe = output<Fund>(); // Usamos output() en lugar de @Output
}
