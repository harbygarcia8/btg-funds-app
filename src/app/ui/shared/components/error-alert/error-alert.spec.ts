import { render, screen, fireEvent } from '@testing-library/angular';
import { describe, it, expect, vi } from 'vitest';
import { ErrorAlert } from './error-alert';

describe('ErrorAlert', () => {
  it('debería mostrar el mensaje cuando se proporciona', async () => {
    const message = 'Ha ocurrido un error inesperado';
    await render(ErrorAlert, {
      componentInputs: { message },
    });

    expect(screen.getByText(message)).toBeTruthy();
  });

  it('no debería mostrar nada si el mensaje es null', async () => {
    await render(ErrorAlert, {
      componentInputs: { message: null },
    });

    // En lugar de innerHTML, buscamos que no exista el elemento con clase alert
    const alert = document.querySelector('.alert-danger');
    expect(alert).toBeNull();
  });

  it('debería emitir el evento dismiss al hacer clic en el botón de cerrar', async () => {
    const dismissSpy = vi.fn();
    await render(ErrorAlert, {
      componentInputs: { message: 'Error' },
      on: { dismiss: dismissSpy },
    });

    const button = screen.getByRole('button', { name: /Cerrar mensaje de error/i });
    fireEvent.click(button);

    expect(dismissSpy).toHaveBeenCalled();
  });
});
