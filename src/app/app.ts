import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './ui/shared/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('btg-funds-app');

  constructor() {
    // Fuerza la inicializacion del ThemeService al arrancar la aplicacion.
    inject(ThemeService);
  }
}
