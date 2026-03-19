import { Component, input, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { SubscribeToFundUseCase } from '../../../application/use-cases/subscribe-to-fund.use-case';
import { Fund, NotificationType } from '../../../domain/models/fund.model';
import { SUSCRIPTION_SUCCESS_MESSAGE } from '../../../application/constants/messages-rules';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subscription-form.html',
  styleUrl: './subscription-form.scss',
})
export class SubscriptionForm {
  fund = input.required<Fund>();
  close = output<void>();
  success = output<void>();

  private readonly fb = inject(FormBuilder);
  private readonly subscribeUseCase = inject(SubscribeToFundUseCase);

  subscriptionForm = this.fb.group({
    amount: [0, [Validators.required]],
    notificationType: ['email' as NotificationType, Validators.required],
  });

  ngOnInit(): void {
    // Configuramos el monto mínimo dinámicamente según el fondo
    this.subscriptionForm
      .get('amount')
      ?.setValidators([Validators.required, Validators.min(this.fund().minAmount)]);
    this.subscriptionForm.get('amount')?.setValue(this.fund().minAmount);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.subscriptionForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.subscriptionForm.valid) {
      const { amount, notificationType } = this.subscriptionForm.value;

      this.subscribeUseCase
        .executeSubscribeToFund(this.fund().id, amount!, notificationType!)
        .subscribe({
          next: () => {
            alert(SUSCRIPTION_SUCCESS_MESSAGE);
            this.success.emit();
            this.close.emit();
          },
          error: (err) => alert(err.message), // Aquí se mostraría el error de "Saldo insuficiente"
        });
    }
  }
}
