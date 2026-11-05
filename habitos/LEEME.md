# Hábitos

Tracker de hábitos instalable (PWA). Un solo index.html; los datos viven en el celular (localStorage, clave `habitos-app-v1`).

## Publicar (GitHub Pages)
1. Repositorio nuevo y público (ej. `habitos`).
2. Sube TODO: index.html, manifest.json, sw.js, icons/.
3. Settings → Pages → Branch main, / (root) → Save.
4. Queda en https://garciasevillano1-lang.github.io/habitos/

## Instalar
- Android (Chrome): abre el enlace → "Instalar app" o menú ⋮ → Instalar app.
- iPhone (Safari): Compartir → Agregar a inicio.

## Actualizar sin borrar datos
Sube los archivos nuevos al MISMO repositorio y sube la versión en `CACHE` de sw.js (habitos-v1.1).
