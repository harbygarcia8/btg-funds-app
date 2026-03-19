import { render, screen, fireEvent } from '@testing-library/angular';
import { describe, it, expect, vi } from 'vitest';
import { SuccessAlert } from './success-alert';

describe('SuccessAlert', () => {
  it('debería mostrar el mensaje cuando se proporciona', async () => {
    const message = 'Operación realizada con éxito';
    await render(SuccessAlert, {
      componentInputs: { message },
    });

    expect(screen.getByText(message)).toBeTruthy();
  });

  it('no debería mostrar nada si el mensaje es null', async () => {
    await render(SuccessAlert, {
      componentInputs: { message: null },
    });

    const alert = document.querySelector('.alert-success');
    expect(alert).toBeNull();
  });

  it('debería emitir el evento dismiss al hacer clic en el botón de cerrar', async () => {
    const dismissSpy = vi.fn();
    await render(SuccessAlert, {
      componentInputs: { message: 'Éxito' },
      on: { dismiss: dismissSpy },
    });

    const button = screen.getByRole('button', { name: /Cerrar mensaje de exito/i });
    fireEvent.click(button);

    expect(dismissSpy).toHaveBeenCalled();
  });
});
