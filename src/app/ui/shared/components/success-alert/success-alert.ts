import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  standalone: true,
  templateUrl: './success-alert.html',
  styleUrl: './success-alert.scss',
})
export class SuccessAlert {
  message = input<string | null>(null);
  dismiss = output<void>();
}
