# Palmetto Eliptic — Demo Dashboard

Dashboard de demostración del sistema de administración del **Edificio Palmetto Eliptic** (Bocagrande, Cartagena). Construido como prueba visual para el rediseño UI del PMS existente (PHP 5.6 legacy).

## Stack

- **Vite 6 + React 18 + TypeScript 5.7**
- **Tailwind CSS 3** con tema dual (Caribbean Night / Light `#015480`)
- **shadcn/ui** primitives (Radix UI)
- **Recharts** para gráficas
- **lucide-react** para iconos
- **[transitions.dev](https://transitions.dev)** (skill `jakubantalik/transitions-dev`) — todas las animaciones premium

## Páginas implementadas

| Ruta (estado interno) | Descripción |
|---|---|
| **Dashboard** | KPIs en vivo, ocupación 30 días, demografía, tablero de parqueadero, alertas, manillas, mapa del edificio. |
| **Check-in** | Wizard de 5 pasos (apto → huéspedes → vehículo → estancia/manillas → confirmación). Transición *Page side-by-side*. |
| **Check-out** | Lista de estancias activas, filtros, checklist de salida, confirmación. |
| **Reportes** | Ocupación e ingresos por mes, procedencia internacional, edad de huéspedes, calidad, top aptos del año. Filtros 30d/Mes/YTD/Anual. |

## Transiciones de transitions.dev en uso

| Snippet | Dónde se ve |
|---|---|
| 01 Card resize | Cards que cambian tamaño |
| 02 Number pop-in | Todos los KPIs animados |
| 03 Notification badge | Campana del header + items del sidebar con contador |
| 07 Panel reveal | Panel lateral del Asistente IA |
| 08 Page side-by-side | Wizard de Check-in (paso ↔ paso) |
| 11 Avatar group hover | Tablero de parqueadero — lift con falloff y spring de retorno |

## Tema oscuro / claro

- Toggle con **Ctrl + Shift + L** (atajo global) o botón Sol/Luna en el TopBar.
- Persistencia en `localStorage` con anti-flash script en `index.html`.
- Light mode usa `#015480` como color primario (identidad de marca Palmetto).

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # genera dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

## Build de producción

```bash
npm run build
# dist/ contiene los archivos estáticos listos para nginx
```

---

*Demo build · contenido con datos mock · no usar en producción real sin sustituir `src/data/mock.ts` por una API real.*
