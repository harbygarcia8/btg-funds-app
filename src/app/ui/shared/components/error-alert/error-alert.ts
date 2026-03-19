import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  templateUrl: './error-alert.html',
  styleUrl: './error-alert.scss',
})
export class ErrorAlert {
  message = input<string | null>(null);
  dismiss = output<void>();
}
