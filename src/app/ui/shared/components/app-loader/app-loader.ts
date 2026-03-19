import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './app-loader.html',
  styleUrl: './app-loader.scss',
})
export class AppLoader {
  visible = input(false);
  message = input('Procesando...');
}
