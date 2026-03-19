import { render, screen } from '@testing-library/angular';
import { describe, it, expect } from 'vitest';
import { AppLoader } from './app-loader';

describe('AppLoader', () => {
  it('debería mostrar el loader y el mensaje por defecto cuando visible es true', async () => {
    await render(AppLoader, {
      componentInputs: { visible: true },
    });

    expect(screen.getByText('Procesando...')).toBeTruthy();
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('debería mostrar un mensaje personalizado', async () => {
    const customMessage = 'Cargando datos...';
    await render(AppLoader, {
      componentInputs: { visible: true, message: customMessage },
    });

    expect(screen.getByText(customMessage)).toBeTruthy();
  });

  it('no debería mostrar nada si visible es false', async () => {
    await render(AppLoader, {
      componentInputs: { visible: false }
    });

    const overlay = document.querySelector('.loader-overlay');
    expect(overlay).toBeNull();
  });
});
