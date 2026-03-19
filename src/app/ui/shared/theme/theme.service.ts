import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'btg-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly themeSignal = signal<ThemeMode>(this.getInitialTheme());
  readonly currentTheme = this.themeSignal.asReadonly();

  constructor() {
    effect(() => {
      const nextTheme = this.themeSignal();
      this.document.documentElement.setAttribute('data-theme', nextTheme);
      this.document.documentElement.style.colorScheme = nextTheme;

      if (this.isBrowserEnvironment()) {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      }
    });
  }

  toggleTheme(): void {
    this.themeSignal.update((current: ThemeMode) => (current === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: ThemeMode): void {
    this.themeSignal.set(theme);
  }

  private getInitialTheme(): ThemeMode {
    if (!this.isBrowserEnvironment()) {
      return 'light';
    }

    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    if (typeof window.matchMedia !== 'function') {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private isBrowserEnvironment(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      typeof window !== 'undefined' &&
      typeof localStorage !== 'undefined'
    );
  }
}
