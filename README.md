# BTG Funds App - Gestión de Fondos (FPV/FIC)

Esta aplicación permite a los clientes de BTG Pactual gestionar sus fondos de inversión (FPV y FIC), permitiendo suscripciones, cancelaciones y seguimiento de movimientos con un saldo inicial de COP $500.000.

## 🚀 Stack Tecnológico

- **Framework:** Angular v21 (Signals, Standalone Components, Control Flow)
- **Lenguaje:** TypeScript (Strict Mode)
- **Estado:** Angular Signals & RxJS
- **Estilos:** SCSS (Arquitectura modular)
- **Pruebas:** Vitest & Angular Testing Library
- **Herramientas:** ESLint & Prettier

## 🏗️ Arquitectura y Patrones de Diseño

El proyecto implementa una **Arquitectura Hexagonal (Puertos y Adaptadores)** para garantizar el desacoplamiento entre la lógica de negocio y el framework.

### Capas del Proyecto:

1.  **Domain (Núcleo):** Contiene los modelos de datos (`models`), constantes de negocio (`constants`) y las interfaces que definen el contrato del sistema. Es puramente TypeScript y no depende de Angular.
2.  **Application (Casos de Uso):** Orquestan la lógica de negocio. Aquí se encuentran los `Use Cases` que interactúan con los **Puertos** (Interfaces de Repositorio).
3.  **Infrastructure (Adaptadores):** Implementaciones concretas de los puertos. Se utiliza un `MockFundAdapter` para simular la persistencia y la API REST, inyectado mediante un `InjectionToken`.
4.  **UI (Componentes/Páginas):** La capa de presentación que utiliza Angular Signals para una reactividad eficiente y componentes standalone para una estructura modular.

### Patrones Utilizados:
- **Dependency Inversion:** Los casos de uso dependen de interfaces (ports), no de implementaciones concretas.
- **Strategy Pattern:** El sistema de notificaciones permite elegir entre Email y SMS.
- **Observable/Observer:** Uso de RxJS para flujos de datos asíncronos.
- **Signals Pattern:** Gestión de estado granular y eficiente en la UI.

## 🧪 Estrategia de Testing

Se implementó una pirámide de pruebas unitarias cubriendo todas las capas:

- **Domain Tests:** Validación de constantes y reglas de negocio base.
- **Application Tests:** Pruebas de los Casos de Uso mockeando el Repositorio para asegurar la lógica de orquestación.
- **UI Tests:** Pruebas de componentes con **Angular Testing Library**, enfocadas en la interacción del usuario y accesibilidad (AXE).

Para ejecutar las pruebas:
```bash
npm test
```

* PRUEBA TÉCNICA HECHA POR: **CEIBA SOFTWARE**
* IMPLEMENTADA POR: **HARBY GARCIA GRAJALES** 
