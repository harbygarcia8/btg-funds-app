# Prueba Técnica – Ingeniero de Desarrollo Front-End

## Caso de negocio: Manejo de Fondos (FPV/FIC) para clientes BTG

```
Objetivo: Diseñar e implementar una aplicación web interactiva y responsiva que permita a
un usuario final:
```

## Requisitos funcionales

1. Visualizar la lista de fondos disponibles.
2. Suscribirse a un fondo, si cumple con el monto mínimo.
3. Cancelar su participación en un fondo, y ver el saldo actualizado.
4. Visualizar el historial de transacciones (suscripciones y cancelaciones).
5. Seleccionar método de notificación (email o SMS) al realizar una suscripción.
6. Mostrar mensajes de error apropiados si no hay saldo suficiente.

## Requisitos técnicos

- Usar Flutter (preferido) o Angular.
- Utilizar buenas prácticas de diseño UI/UX.
- Manejo de estado (Provider, Riverpod, Bloc en Flutter o servicios y observables en
  Angular).
- Validaciones de formularios.
- Diseño responsivo y experiencia de usuario clara.
- Consumo de datos desde una API REST simulada (puede usarse mocks locales o json-
  server).
- Manejo adecuado de errores, loading states y feedback visual.
- Código limpio, estructurado y comentado.

## Extras valorados (no obligatorios)

- Pruebas unitarias de componentes (Flutter Test, Angular Testing Library).
- Uso de TypeScript en Angular.
- Navegación y ruteo (Flutter Navigator 2.0 o Angular Router).
- Uso de componentes y widgets reutilizables.

## Consideraciones

- No es necesario implementar lógica de backend, autenticación ni despliegue.
- Se asume un usuario único con saldo inicial de COP $500.000.
- Fondos disponibles:

## Fondos disponibles

| ID  | Nombre                      | Monto mínimo | Categoria |
| --- | --------------------------- | ------------ | --------- |
| 1   | FPV_BTG_PACTUAL_RECAUDADORA | COP $75.000  | FPV       |
| 2   | FPV_BTG_PACTUAL_ECOPETROL   | COP $125.000 | FPV       |
| 3   | DEUDAPRIVADA                | COP $50.000  | FIC       |
| 4   | FDO-ACCIONES                | COP $250.000 | FIC       |
| 5   | FPV_BTG_PACTUAL_DINAMICA    | COP $100.000 | FPV       |

## Entregables

- Código en repositorio público (GitHub, GitLab, etc.).
- Instrucciones claras de ejecución (README.md).
- Capturas o video corto del funcionamiento de la app (opcional, pero valorado).
