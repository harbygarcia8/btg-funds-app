import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiFeedbackService {
  private readonly successMessageSignal = signal<string | null>(null);
  private readonly errorMessageSignal = signal<string | null>(null);
  private readonly loadingCountSignal = signal(0);

  private successTimer: ReturnType<typeof setTimeout> | null = null;
  private errorTimer: ReturnType<typeof setTimeout> | null = null;

  readonly successMessage = this.successMessageSignal.asReadonly();
  readonly errorMessage = this.errorMessageSignal.asReadonly();
  readonly isLoading = computed(() => this.loadingCountSignal() > 0);

  showSuccess(message: string, autoHideMs = 3200): void {
    this.successMessageSignal.set(message);
    this.clearTimer('success');

    this.successTimer = setTimeout(() => {
      this.successMessageSignal.set(null);
      this.successTimer = null;
    }, autoHideMs);
  }

  showError(message: string, autoHideMs = 4500): void {
    this.errorMessageSignal.set(message);
    this.clearTimer('error');

    this.errorTimer = setTimeout(() => {
      this.errorMessageSignal.set(null);
      this.errorTimer = null;
    }, autoHideMs);
  }

  clearSuccess(): void {
    this.successMessageSignal.set(null);
    this.clearTimer('success');
  }

  clearError(): void {
    this.errorMessageSignal.set(null);
    this.clearTimer('error');
  }

  startLoading(): void {
    this.loadingCountSignal.update((value) => value + 1);
  }

  stopLoading(): void {
    this.loadingCountSignal.update((value) => Math.max(0, value - 1));
  }

  private clearTimer(kind: 'success' | 'error'): void {
    if (kind === 'success' && this.successTimer) {
      clearTimeout(this.successTimer);
      this.successTimer = null;
    }

    if (kind === 'error' && this.errorTimer) {
      clearTimeout(this.errorTimer);
      this.errorTimer = null;
    }
  }
}
