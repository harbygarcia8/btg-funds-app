# BTG Funds App - Gestión de Fondos (FPV/FIC)

Aplicación web para gestionar fondos de inversión BTG (FPV/FIC), con suscripción, cancelación, historial de movimientos, validaciones de negocio y feedback visual en tiempo real.

Saldo inicial asumido: **COP $500.000**.

## Video funcional de la aplicación.
https://uconet-my.sharepoint.com/:v:/g/personal/harby_garcia8016_uco_net_co/IQCxf0mSfv6bR77ykQicQauMAb9nZvxVsNCJ0OmeuhunGUs?e=LUNRrt

## Stack tecnológico

- **Framework:** Angular 21 (standalone components, control flow, signals)
- **Lenguaje:** TypeScript (strict mode)
- **Estilos:** SCSS modular + tokens de tema (light/dark)
- **Estado:** Signals + RxJS
- **Testing:** Vitest + Angular Testing Library
- **Calidad:** ESLint + Prettier

## Arquitectura aplicada

Se implementa **Arquitectura Hexagonal (Ports & Adapters)**, separando dominio, casos de uso e infraestructura de la capa visual.

- **Domain:** modelos, reglas y contratos del negocio
- **Application:** casos de uso (suscribir, cancelar, consultar saldo/listados/historial)
- **Infrastructure:** adaptador mock del repositorio de fondos
- **UI:** páginas y componentes atómicos/reutilizables

### Decisiones de diseño relevantes

- Componentes standalone para modularidad y testeo aislado.
- Tematización global con `ThemeService` y tokens SCSS.
- Mensajes de usuario y UI de componentes compartidos:
  - `app-success-alert`
  - `app-error-alert`
  - `app-loader`
- Navegación por páginas:
  - `dashboard`
  - `historial`

## Diseño y UX implementados

- Dashboard con enfoque financiero.
- Catálogo de inversiones
- Tabla de historial responsive:
  - tabla clásica en desktop
  - layout tipo tarjetas por fila en pantallas pequeñas.
- Formulario de suscripción.
- Soporte global de tema claro/oscuro.

## Ejecución local

```bash
git clone https://github.com/harbygarcia8/btg-funds-app.git`
cd btg-funds-app/
npm install
npm start
```

Abrir: [http://localhost:4200](http://localhost:4200)

## Scripts útiles para asegurar la calidad de código estático.

```bash
npm run test
npm run build
npm run lint
npm run type:check
npm run format:check
npm run start
```

## Estrategia de pruebas

Cobertura unitaria en capas de dominio, aplicación y UI:

- Reglas de negocio
- Casos de uso con repositorio mockeado
- Componentes clave (suscripción, historial, dashboard, tarjetas, resumen)

Estado actual: 
* Test Files  15 passed (15)
* Tests  28 passed (28)

## Mejoras propuestas y nuevas implementaciones

Para evolucionar el proyecto a un nivel de escalabilidad mayor,se podría tener en cuanta la implementación de:

### 1) Storybook para UI y documentación viva

Implementar **Storybook** para centralizar la documentación visual y funcional de los componentes reutilizables.

Beneficios esperados:

- Catálogo navegable de componentes (`fund-card`, `transaction-history`, `subscription-form`, alerts, loader, etc.).
- Documentación de variantes de UI (temas, estados `loading`, `disabled`, `error`, vacíos, etc.).
- Contratos de componentes claros (inputs/outputs) para facilitar mantenimiento y onboarding.
- Validación visual aislada sin depender de páginas completas.

### 2) Pruebas de integración y E2E con Playwright

Incorporar una estrategia de pruebas por capas complementando la suite unitaria actual.

**Pruebas de integración (UI + casos de uso + servicios):**

- Validar flujos completos de suscripción y cancelación contra mocks controlados.
- Verificar que el feedback global (`success/error/loader`) se muestre correctamente en cada escenario.
- Probar navegación y estados entre `dashboard` e `historial`.

**Pruebas E2E con Playwright:**

- Recorrer journeys críticos de usuario en navegador real.
- Validar reglas funcionales de negocio de punta a punta.
- Asegurar comportamiento responsive y consistencia visual básica entre breakpoints.
- Ejecutar smoke tests en CI para prevenir regresiones en producción.


---

- Prueba técnica: **Ceiba Software**
- Implementación: **Harby Garcia Grajales**
