import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLoader } from './ui/shared/components/app-loader/app-loader';
import { ErrorAlert } from './ui/shared/components/error-alert/error-alert';
import { SuccessAlert } from './ui/shared/components/success-alert/success-alert';
import { UiFeedbackService } from './ui/shared/components/feedback/ui-feedback.service';
import { ThemeService } from './ui/shared/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuccessAlert, ErrorAlert, AppLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('btg-funds-app');
  protected readonly uiFeedback = inject(UiFeedbackService);

  constructor() {
    // Fuerza la inicializacion del ThemeService al arrancar la aplicacion.
    inject(ThemeService);
  }
}
